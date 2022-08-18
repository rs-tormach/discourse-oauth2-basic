import discourseComputed from "discourse-common/utils/decorators";
import { resendActivationEmail } from "discourse/lib/user-activation";
import { wavingHandURL } from "discourse/lib/waving-hand-url";

export default Ember.Component.extend({

  getQueryVariable: (variable) => {
    console.log('--getQueryVariable(' + variable + ')--');
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
    console.log('--toEmail()--');
    console.log(this);
    return this.get('resend_email');
  },

  toUser: () => {
    console.log('--toUser()--');
    console.log(this);
    return this.get('resend_username');
  },

  init() {
    console.log('--init()--');
    console.log(this);
    if (this.getQueryVariable('e')) {
      this.set('resend_email', atob(this.getQueryVariable('e')));
    }
    if (this.getQueryVariable('u')) {
      this.set('resend_username', atob(this.getQueryVariable('u')));
    }
    if (history.replaceState && this.get('resend_email') && this.get('resend_username')) {
      var cleanup = window.location.protocol + "//" + window.location.host + window.location.pathname;
      history.replaceState({path:cleanup},'',cleanup);
    }
  },

  didRender() {
    console.log('--didRender()--');
    console.log(this);
    console.log(this.get('resend_email'));
    console.log(this.get('resend_username'));

    $('.login-modal-body .login-left-side').addClass('hidden');
    $('.login-modal-body .login-right-side').addClass('hidden');
    $('#modal-alert').addClass('hidden');
  },

  actions: {
    sendActivationEmail() {
      console.log('--sendActivationEmail()--');
      console.log(this.get('resend_email'));
      console.log(this.get('resend_username'));
      resendActivationEmail(this.get('resend_email')).then(() => {
        console.log('resent conf email');
        this.transitionToRoute("account-created.resent");
      });
    },
  },
});
