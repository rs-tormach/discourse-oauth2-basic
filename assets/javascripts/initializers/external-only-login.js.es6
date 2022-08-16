import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: 'basic-plugin',
  initialize: function() {
    withPluginApi('1.3.0', (api) => {
      api.onAppEvent('modal:body-shown', (event) => {
        console.log('modal shown');
        console.log(event);
      });
    });
  }
}