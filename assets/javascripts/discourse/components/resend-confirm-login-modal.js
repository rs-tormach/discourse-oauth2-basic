import Component from "@ember/component";
import discourseComputed from "discourse-common/utils/decorators";
import { resendActivationEmail } from "discourse/lib/user-activation";
import { wavingHandURL } from "discourse/lib/waving-hand-url";

export default Component.extend({
  @discourseComputed
  wavingHandURL: () => wavingHandURL(),

  getQueryVariable: function (variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            if(pair[0] == variable){return pair[1];}
    }
    return(false);
  },

  init() {
    console.log('init entry.');
    var email = this.getQueryVariable('e');
    if (email) { this.set('email', window.atob(email)); }
    var username = this.getQueryVariable('u');
    if (username) { this.set('username', window.atob(username)); }
    if (this.get('email') && this.get('username')) {
      this.set('renderOk', true);
      console.log('renderOk');
      if (history.replaceState) {
        var cleanup = window.location.protocol + "//" + window.location.host + window.location.pathname;
        history.replaceState({path:cleanup},'',cleanup);
      }
    } else { this.set('renderOk', false); }
    this._super();
  },

  didRender() {
    if (this.get('renderOk')) {
      console.log('Hide login-modal')
      $('.login-modal-body .login-left-side').addClass('hidden');
      $('.login-modal-body .login-right-side').addClass('hidden');
      $('#modal-alert').addClass('hidden');
    }
  },

  actions: {
    sendActivationEmail() {
      $('.resend-activation-button').prop("disabled",true);
      resendActivationEmail(this.get('username')).then(() => {
        $('#not-activated').addClass('hidden');
        $('#sent-activation').removeClass('hidden');
      });
    },
  },
});
