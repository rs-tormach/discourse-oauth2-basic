import Component from "@ember/component";
import { action } from "@ember/object";
import { resendActivationEmail } from "discourse/lib/user-activation";
import { wavingHandURL } from "discourse/lib/waving-hand-url";
import discourseComputed from "discourse-common/utils/decorators";

export default class ResendConfirmLoginModal extends Component
{
  email = null;
  username = null;
  renderOk = false;

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
    console.log('ResendConfirmLoginModal init entry'); //eslint-disable-line no-console
    super.init(...arguments);
    const e = this.getQueryVariable('e');
    if (e) { this.set('email', window.atob(e)); }
    const u = this.getQueryVariable('u');
    if (u) { this.set('username', window.atob(u)); }
    if (this.get('email') && this.get('username')) {
      this.set('renderOk', true);
      /*if (history.replaceState) {
        const cleanup = window.location.protocol + "//" + window.location.host + window.location.pathname;
        history.replaceState({path:cleanup},'',cleanup);
        alert('REPLACED!'); //eslint-disable-line no-alert
      }*/
    }
    console.log('ResendConfirmLoginModal completed with' + this.get('renderOk')); //eslint-disable-line no-console
  }

  didRender() {
    console.log('ResendConfirmLoginModal didRender entry'); //eslint-disable-line no-console
    super.didRender(...arguments);
    if (this.get('renderOk')) {
      console.log('hide existing login-modal'); //eslint-disable-line no-console
      const modalBodyLeft = document.querySelector('.login-modal-body .login-left-side');
      modalBodyLeft.className += ' hidden';
      const modalBodyRight = document.querySelector('.login-modal-body .login-right-side');
      modalBodyRight.className += ' hidden';
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
