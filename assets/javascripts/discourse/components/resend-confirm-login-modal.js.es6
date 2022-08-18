import discourseComputed from "discourse-common/utils/decorators";
import { resendActivationEmail } from "discourse/lib/user-activation";
import { wavingHandURL } from "discourse/lib/waving-hand-url";

export default Ember.Component.extend({

  getQueryVariable: (variable) => {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            if(pair[0] == variable){return pair[1];}
    }
    return(false);
  },

  @discourseComputed
  wavingHandURL: () => wavingHandURL(),

  toEmail: () => {
    return this.get('resend.email');
  },

  toUser: () => {
    return this.get('resend.username');
  },

  init() {
    console.log('inside init');
    console.log(this);
    this.set('resend.email', atob(this.getQueryVariable('e')));
    this.set('resend.username', atob(this.getQueryVariable('u')));
    if (history.replaceState) {
      var cleanup = window.location.protocol + "//" + window.location.host + window.location.pathname;
      history.replaceState({path:cleanup},'',cleanup);
    }
  },

  didRender() {
    console.log('inside didrender');
    console.log(this);
    console.log(this.get('resend.email'));
    console.log(this.get('resend.username'));

    $('.login-modal-body .login-left-side').addClass('hidden');
    $('.login-modal-body .login-right-side').addClass('hidden');
    $('#modal-alert').addClass('hidden');
  },

  actions: {
    sendActivationEmail() {
      console.log('action called');
      console.log(this.get('resend.email'));
      console.log(this.get('resend.username'));
      resendActivationEmail(this.get('resend.email')).then(() => {
        console.log('resent conf email');
        this.transitionToRoute("account-created.resent");
      });
    },
  },
});
