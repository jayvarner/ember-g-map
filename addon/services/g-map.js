import Service from '@ember/service';
import { computed, get, set } from '@ember/object';
import { isPresent } from '@ember/utils';
import { debug } from '@ember/debug';
/* global google */

export default Service.extend({
  map: null,
  clientLat: null,
  clientLng: null,
  clientPositionError: null,

  init() {
    this._super(...arguments);
    if (isPresent(navigator.geolocation) && (typeof FastBoot === 'undefined')) {
      navigator.geolocation.getCurrentPosition((location) => {
        set(this, 'clientLat', location.coords.latitude);
        set(this, 'clientLng', location.coords.longitude);
      }, (error) => {
        debug(`GMap Location ERROR: ${error.message}`);
        set(this, 'clientPositionError', error.message);
      });
    } else if (isPresent(navigator.geolocation) === false) {
      debug('GMap Location EROOR: Your browser doesn\'t support geolocation.');
      set(this, 'clientPositionError', 'GMap Location EROOR: Your browser doesn\'t support geolocation.');
    }
  },

  setUpMap(canvas, options) {
    let map = new google.maps.Map(canvas, options)
    set(this, 'map', map);
    map.addListener('bounds_changed', function() {
      console.log('shit changed')
    });
  },

  clientPosition: computed('clientLat', 'clientLng', 'clientPositionError', function() {
    return {
      lat: get(this, 'clientLat'),
      lng: get(this, 'clientLng'),
      error: get(this, 'clientPositionError')
    };
  })
});
