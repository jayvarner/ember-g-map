import Service from '@ember/service';
import { A } from '@ember/array';
import { computed, get, set } from '@ember/object';
import { isPresent } from '@ember/utils';
import { debug } from '@ember/debug';
import $ from 'jquery';
/* global google */

export default Service.extend({
  map: null,
  clientLat: null,
  clientLng: null,
  clientPositionError: null,
  features: A(),
  turnByTurn: null,
  travelMode: 'DRIVING',
  shouldFit: false,

  clientPosition: computed('clientLat', 'clientLng', 'clientPositionError', function() {
    if (this.get('isFastBoot')) {
      return;
    }
    return {
      lat: get(this, 'clientLat'),
      lng: get(this, 'clientLng'),
      error: get(this, 'clientPositionError')
    };
  }),

  init() {
    this._super(...arguments);
    if (this.get('isFastBoot')) {
      return;
    }
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



  tearDownMap() {
    let map = get(this, 'map');
    get(this, 'features').forEach((feature) => {
      feature.setMap(null);
    });
    google.maps.event.clearInstanceListeners(map);
    // set(this, 'map', new google.maps.Map($().find('.g-map-canvas').get(0)));
    set(this, 'features', A());
    set(this, 'turnByTurn', null);
  },

  registerFeature(feature) {
    // console.log(feature)
    get(this, 'features').addObject(feature);
    if(get(this, 'shouldFit')) {
      this.fitAll(feature);
    }
  },

  setTravelMode(mode) {
    set(this, 'travelMode', mode.toUpperCase());
  }

  // registerMarker(marker) {
  //   console.log(marker)
  //   get(this, 'markers').addObject(marker);
  // },

  // unregisterMarker(marker) {
  //   get(this, 'markers').removeObject(marker);
  // },

  // registerPolyline(polyline) {
  //   get(this, 'polylines').addObject(polyline);
  // },

  // unregisterPolyline(polyline) {
  //   get(this, 'polylines').removeObject(polyline);
  // }
});
