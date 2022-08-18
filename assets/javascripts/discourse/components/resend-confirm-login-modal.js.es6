import discourseComputed from "discourse-common/utils/decorators";
import { resendActivationEmail } from "discourse/lib/user-activation";
import { wavingHandURL } from "discourse/lib/waving-hand-url";

export default Ember.Component.extend({

  getQueryVariable: function (variable) {
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

  toEmail: '',
  toUser: '',

  init() {
    console.log('--init()--');
    console.log(this);
    if (this.getQueryVariable('e')) {
      this.set('toEmail', atob(this.getQueryVariable('e')));
    }
    if (this.getQueryVariable('u')) {
      this.set('toUser', atob(this.getQueryVariable('u')));
    }
    if (history.replaceState && this.get('toEmail') && this.get('toUser')) {
      var cleanup = window.location.protocol + "//" + window.location.host + window.location.pathname;
      history.replaceState({path:cleanup},'',cleanup);
    }
  },

  didRender() {
    console.log('--didRender()--');
    console.log(this);
    console.log(this.get('toEmail'));
    console.log(this.get('toUser'));

    $('.login-modal-body .login-left-side').addClass('hidden');
    $('.login-modal-body .login-right-side').addClass('hidden');
    $('#modal-alert').addClass('hidden');
  },

  actions: {
    sendActivationEmail() {
      console.log('--sendActivationEmail()--');
      console.log(this.get('toEmail'));
      console.log(this.get('toUser'));
      resendActivationEmail(this.get('toUser')).then(() => {
        console.log('resent conf email');
        this.transitionToRoute("account-created.resent");
      });
    },
  },
});
