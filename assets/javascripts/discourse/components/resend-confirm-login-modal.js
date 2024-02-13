import Component from "@ember/component";
import { action } from "@ember/object";
import discourseComputed from "discourse-common/utils/decorators";
import { resendActivationEmail } from "discourse/lib/user-activation";
import { wavingHandURL } from "discourse/lib/waving-hand-url";

export default class ResendConfirmLoginModal extends Component.extend()
{
  @discourseComputed()
  wavingHandURL() {
    return wavingHandURL();
  }

  getQueryVariable(variable) {
    const query = window.location.search.substring(1);
    const vars = query.split("&");
    for (let i=0;i<vars.length;i++) {
            let pair = vars[i].split("=");
            if(pair[0] === variable){return pair[1];}
    }
    return(false);
  }

  init() {
    super.init(...arguments);
    console.log('init entry.'); //eslint-disable-line no-console
    const email = this.getQueryVariable('e');
    if (email) { this.set('email', window.atob(email)); }
    const username = this.getQueryVariable('u');
    if (username) { this.set('username', window.atob(username)); }
    if (this.get('email') && this.get('username')) {
      this.set('renderOk', true);
      console.log('renderOk'); //eslint-disable-line no-console
      if (history.replaceState) {
        const cleanup = window.location.protocol + "//" + window.location.host + window.location.pathname;
        history.replaceState({path:cleanup},'',cleanup);
        alert('REPLACED!'); //eslint-disable-line no-alert
      }
    } else { this.set('renderOk', false); }
  }

  didRender() {
    super.didRender(...arguments);
    if (this.get('renderOk')) {
      console.log('Hide login-modal'); //eslint-disable-line no-console
      const modalBodyLeft = document.querySelector('.login-modal-body .login-left-side');
      modalBodyLeft.className = 'login-left-side hidden';
      const modalBodyRight = document.querySelector('.login-modal-body .login-right-side');
      modalBodyRight.className = 'login-right-side hidden';
      const modalAlert = document.getElementById('modal-alert');
      modalAlert.className += ' hidden';
    }
  }

  @action
  sendActivationEmail() {
    const resendButton = document.querySelector('.resend-activation-button');
    resendButton.disabled = true;
    resendActivationEmail(this.get('username')).then(() => {
      const notActivated = document.getElementById('not-activated');
      notActivated.className += ' hidden';
      const sentActivation = document.getElementById('sent-activation');
      sentActivation.className = sentActivation.replace(' hidden', '');
    });
  }
}
