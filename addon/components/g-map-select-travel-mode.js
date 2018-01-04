import Ember from 'ember';
import { get } from '@ember/object';
import layout from '../templates/components/g-map-select-travel-mode';
import { A } from '@ember/array';

export default Ember.Component.extend({
  layout,
  defaultModes: A([
    'DRIVING',
    'BICYCLING',
    'TRANSIT',
    'WALKING'
  ]),

  change(event) {
    get(this, 'gMap').setTravelMode(event.target.value);
  }
});
