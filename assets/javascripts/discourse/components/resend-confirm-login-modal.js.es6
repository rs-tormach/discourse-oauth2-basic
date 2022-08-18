import discourseComputed from "discourse-common/utils/decorators";
import { resendActivationEmail } from "discourse/lib/user-activation";
import { wavingHandURL } from "discourse/lib/waving-hand-url";

export default Ember.Component.extend({
  @discourseComputed
  wavingHandURL: () => wavingHandURL(),

  toEmail: 'rsteckman@tormach.com',
  toUser: 'rsteckman',

  didRender(): {
    this.toEmail = 'updated@tormach.com';
    this.toUser = 'updated';
  }

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
