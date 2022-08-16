import Controller from "@ember/controller";
import { resendActivationEmail } from "discourse/lib/user-activation";

export default Controller.extend({
  isVisible: true,
  didRender() {
    console.log(this);
  },
  actions: {
    sendActivationEmail() {
      resendActivationEmail(this.get("accountCreated.username")).then(() => {
        this.transitionToRoute("account-created.resent");
      });
    },
  },
});
