import discourseComputed from "discourse-common/utils/decorators";
import { resendActivationEmail } from "discourse/lib/user-activation";
import { wavingHandURL } from "discourse/lib/waving-hand-url";

const { computed: { alias }, observer } = Ember

export default Ember.Component.extend({
  routing: Ember.inject.service('-routing'),
  params: alias('routing.router.currentState.routerJsState.fullQueryParams'),

  @discourseComputed
  wavingHandURL: () => wavingHandURL(),

  email: () => {
    return atob(this.params.e);
  },

  didRender() {
    console.log(this);

    $('.login-modal-body .login-left-side').addClass('hidden');
    $('.login-modal-body .login-right-side').addClass('hidden');
    $('#modal-alert').addClass('hidden');
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
