import { ajax } from 'discourse/lib/ajax';

export default Ember.Component.extend({
  isVisible: true,

  didRender() {
    console.log(this);
  }
});