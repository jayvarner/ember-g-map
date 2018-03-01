import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';
import layout from '../templates/components/get-location';

export default Component.extend({
  layout,
  geoLocation: service(),

  didInsertElement() {
    get(this, 'geoLocation').getLocation();
  }
});
