import { A } from '@ember/array';
import Component from '@ember/component';
import { isPresent, isEmpty } from '@ember/utils';
import { observer, computed, get, set } from '@ember/object';
import { run } from '@ember/runloop';
import layout from '../templates/components/g-map';
/* global google */

export default Component.extend({
  layout,
  classNames: ['g-map'],
  bannedOptions: A(['center', 'zoom']),

  init() {
    this._super(...arguments);
    set(this, 'markers', A());
    set(this, 'polylines', A());
    if (isEmpty(get(this, 'options'))) {
      set(this, 'options', {});
    }
  },

  permittedOptions: computed('options', function() {
    const { options, bannedOptions } = this.getProperties(['options', 'bannedOptions']);
    const permittedOptions = {};
    for (let option in options) {
      if (options.hasOwnProperty(option) && !bannedOptions.includes(option)) {
        permittedOptions[option] = options[option];
      }
    }
    return permittedOptions;
  }),

  didInsertElement() {
    this._super(...arguments);
    if (isEmpty(get(this, 'gMap.map'))
      && (typeof FastBoot === 'undefined')) {
      const canvas = this.$().find('.g-map-canvas').get(0);
      const options = this.get('permittedOptions');
      get(this, 'gMap').setUpMap(canvas, options);
    }
    this.setZoom();
    this.setCenter();
    if (this.get('shouldFit')) {
      this.fitToMarkers();
    }
  },

  permittedOptionsChanged: observer('permittedOptions', function() {
    run.once(this, 'setOptions');
  }),

  setOptions() {
    const map = get(this, 'gMap.map');
    const options = get(this, 'permittedOptions');
    if (isPresent(map)) {
      map.setOptions(options);
    }
  },

  zoomChanged: observer('zoom', function() {
    run.once(this, 'setZoom');
  }),

  setZoom() {
    const map = get(this, 'gMap.map');
    const zoom = get(this, 'gMap.zoom');
    if (isPresent(map)) {
      map.setZoom(zoom);
    }
  },

  coordsChanged: observer('lat', 'lng', function() {
    run.once(this, 'setCenter');
  }),

  setCenter() {
    const map = get(this, 'gMap.map');
    const lat = get(this, 'gMap.lat');
    const lng = get(this, 'gMap.lng');

    if (isPresent(map)
      && isPresent(lat)
      && isPresent(lng)
      && (typeof FastBoot === 'undefined')) {
      const center = new google.maps.LatLng(lat, lng);
      map.setCenter(center);
    }
  },

  registerMarker(marker) {
    get(this, 'markers').addObject(marker);
  },

  unregisterMarker(marker) {
    get(this, 'markers').removeObject(marker);
  },

  registerPolyline(polyline) {
    get(this, 'polylines').addObject(polyline);
  },

  unregisterPolyline(polyline) {
    get(this, 'polylines').removeObject(polyline);
  },

  shouldFit: computed('markersFitMode', function() {
    return A(['init', 'live']).includes(get(this, 'markersFitMode'));
  }),

  markersChanged: observer('markers.@each.lat', 'markers.@each.lng', function() {
    if (get(this, 'markersFitMode') === 'live') {
      run.once(this, 'fitToMarkers');
    }
  }),

  fitToMarkers() {
    const markers = get(this, 'markers').filter((marker) => {
      return isPresent(get(marker, 'lat')) && isPresent(get(marker, 'lng'));
    });

    if (markers.length === 0
        || (typeof FastBoot !== 'undefined')) {
      return;
    }

    const map = get(this, 'gMap.map');
    const bounds = new google.maps.LatLngBounds();

    markers.forEach((marker) => {
      if (isPresent(get(marker, 'viewport'))) {
        bounds.union(get(marker, 'viewport'));
      } else {
        bounds.extend(new google.maps.LatLng(get(marker, 'lat'), get(marker, 'lng')));
      }
    });
    map.fitBounds(bounds);
  },

  groupMarkerClicked(marker, group) {
    let markers = get(this, 'markers').without(marker).filterBy('group', group);
    markers.forEach((marker) => marker.closeInfowindow());
  }
});
