import Component from "@ember/component";
import { action } from "@ember/object";
//import discourseComputed from "discourse-common/utils/decorators";
import { resendActivationEmail } from "discourse/lib/user-activation";
import { wavingHandURL } from "discourse/lib/waving-hand-url";

export default class ResendConfirmLoginModal extends Component.extend()
{
  //@discourseComputed("wavingHandURL")
  wavingHandURL() {
    return wavingHandURL();
  }

  getQueryVariable(variable) {
    const query = window.location.search.substring(1);
    const vars = query.split("&");
    for (let i=0;i<vars.length;i++) {
            let pair = vars[i].split("=");
            if(pair[0] == variable){return pair[1];}
    }
    return(false);
  }

  init() {
    console.log('init entry.');
    const email = this.getQueryVariable('e');
    if (email) { this.set('email', window.atob(email)); }
    const username = this.getQueryVariable('u');
    if (username) { this.set('username', window.atob(username)); }
    if (this.get('email') && this.get('username')) {
      this.set('renderOk', true);
      console.log('renderOk');
      if (history.replaceState) {
        const cleanup = window.location.protocol + "//" + window.location.host + window.location.pathname;
        history.replaceState({path:cleanup},'',cleanup);
        alert('REPLACED!');
      }
    } else { this.set('renderOk', false); }
    this._super();
  }

  didRender() {
    if (this.get('renderOk')) {
      console.log('Hide login-modal')
      $('.login-modal-body .login-left-side').addClass('hidden');
      $('.login-modal-body .login-right-side').addClass('hidden');
      $('#modal-alert').addClass('hidden');
    }
  }

  @action
  sendActivationEmail() {
    $('.resend-activation-button').prop("disabled",true);
    resendActivationEmail(this.get('username')).then(() => {
      $('#not-activated').addClass('hidden');
      $('#sent-activation').removeClass('hidden');
    });
  }
}
