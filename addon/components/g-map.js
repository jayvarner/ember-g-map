import { reads } from '@ember/object/computed';
import { A } from '@ember/array';
import GMapBase from 'ember-g-map/components/g-map-base';
import { computed, get, set } from '@ember/object';
import { inject as service } from '@ember/service';
import { ParentMixin } from 'ember-composability-tools';
import layout from '../templates/components/g-map';
/* global google */

export default GMapBase.extend(ParentMixin, {
  layout,
  tagName: 'div',
  classNames: ['map-map'],
  bounds: null,
  features: A(),
  fastboot: service(),
  isFastBoot: reads('fastboot.isFastBoot'),

  init() {
    this._super(...arguments);
  },

  createFeature() {
    if (this.get('isFastBoot')) {
      return;
    }

    const options = get(this, 'options');
    const map = new google.maps.Map(this.element, options);
    set(this, 'bounds', new google.maps.LatLngBounds());
    if (options === null) {
      map.fitBounds(get(this, 'bounds'));
    }
    return map;
  },

  didcreateFeature() {

  },

  willDestroyParent() {
    if (this.get('isFastBoot')) {
      return;
    }

    set(this, 'feature', new google.maps.Map(this.element, {}));
    google.maps.event.clearInstanceListeners(this.element);
  },

  willDestroy() {
    //
  }
});
