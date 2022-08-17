import discourseComputed from "discourse-common/utils/decorators";
import { resendActivationEmail } from "discourse/lib/user-activation";
import { wavingHandURL } from "discourse/lib/waving-hand-url";

export default Ember.Component.extend({
  @discourseComputed
  wavingHandURL: () => wavingHandURL(),
  didRender() {
    console.log(this);
    $('.login-modal-body .login-left-side').addClass('hidden');
    $('.login-modal-body .login-right-side').addClass('hidden');
  },
  actions: {
    sendActivationEmail() {
      console.log('action called');
      console.log(this.get("accountCreated.username"));
      resendActivationEmail(this.get("accountCreated.username")).then(() => {
        this.transitionToRoute("account-created.resent");
      });
    },
  },
});
