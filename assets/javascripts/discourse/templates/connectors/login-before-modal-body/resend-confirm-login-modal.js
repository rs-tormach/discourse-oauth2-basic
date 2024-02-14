import Component from "@ember/component";
import { action } from "@ember/object";
import { resendActivationEmail } from "discourse/lib/user-activation";
import { wavingHandURL } from "discourse/lib/waving-hand-url";

export default class ResendConfirmLoginModal extends Component
{
  email = null;
  username = null;
  renderOk = false;

  getCookieValue(name) 
  {
    const regex = new RegExp(`(^| )${name}=([^;]+)`);
    const match = document.cookie.match(regex);
    if (match) {
      return match[2];
    }
  }

  get wavingHandURL() {
    return wavingHandURL();
  }

  init() {
    console.log('ResendConfirmLoginModal init entry'); //eslint-disable-line no-console
    super.init(...arguments);
    const e = this.getCookieValue("_oa2e");
    this.set('email', window.atob(e));
    console.log('Found ' + e + ' which is ' + this.get('email')); //eslint-disable-line no-console
    const u = this.getCookieValue("_oa2u");
    this.set('username', window.atob(u));
    console.log('Found ' + u + ' which is ' + this.get('username')); //eslint-disable-line no-console
  }

  didRender() {
    console.log('ResendConfirmLoginModal didRender entry'); //eslint-disable-line no-console
    super.didRender(...arguments);
    const modalBodyLeft = document.querySelectorAll('.login-modal-body .login-left-side')[1];
    modalBodyLeft.className += ' hidden';
    const modalBodyRight = document.querySelector('.login-modal-body .login-right-side');
    modalBodyRight.className += ' hidden';
    const modalAlert = document.getElementById('modal-alert');
    modalAlert.className += ' hidden';
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
