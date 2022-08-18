import discourseComputed from "discourse-common/utils/decorators";
import { resendActivationEmail } from "discourse/lib/user-activation";
import { wavingHandURL } from "discourse/lib/waving-hand-url";

const { computed: { alias }, observer } = Ember

export default Ember.Component.extend({
  routing: Ember.inject.service('-routing'),
  params: alias('routing.router.currentState.routerJsState.fullQueryParams'),

  @discourseComputed
  wavingHandURL: () => wavingHandURL(),

  init() {
    console.log('inside init');
    console.log(this);
    this.set('resendEmail', atob(this.get('params').e));
    this.set('resendUsername', atob(this.get('params').u));
    /*if (history.replaceState) {
      var cleanup = window.location.protocol + "//" + window.location.host + window.location.pathname;
      history.replaceState({path:cleanup},'',cleanup);
    }*/
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
      console.log(this.get('resendUsername'));
      console.log(this.get('resendEmail'));
      resendActivationEmail(this.get('resendUsername')).then(() => {
        console.log('resent conf email');
        this.transitionToRoute("account-created.resent");
      });
    },
  },
});
