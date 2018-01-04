import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import { A } from '@ember/array';
import { isPresent, isEmpty } from '@ember/utils';
import { observer, get, set } from '@ember/object';
import { run } from '@ember/runloop';
import { assert } from '@ember/debug';
import layout from '../templates/components/g-map-route';
import GMapComponent from './g-map';
import compact from '../utils/compact';
/* global google */

const allowedPolylineOptions = A(['strokeColor', 'strokeWeight', 'strokeOpacity', 'zIndex']);

// const TRAVEL_MODES = {
//   walking: get(window, 'google.maps.TravelMode.WALKING'),
//   bicycling: get(window, 'google.maps.TravelMode.BICYCLING'),
//   transit: get(window, 'google.maps.TravelMode.TRANSIT'),
//   driving: get(window, 'google.maps.TravelMode.DRIVING')
// };

const GMapRouteComponent = Component.extend({
  layout,
  classNames: ['g-map-marker'],
  positionalParams: ['mapContext'],

  map: alias('gMap.map'),

  init() {
    this._super(...arguments);
    this.set('waypoints', A());
    const mapContext = get(this, 'mapContext');
    assert('Must be inside {{#g-map}} component with context set', mapContext instanceof GMapComponent);
  },

  didInsertElement() {
    this._super(...arguments);
    this.initDirectionsService();
  },

  willDestroyElement() {
    const renderer = get(this, 'directionsRenderer');
    if (isPresent(renderer)) {
      renderer.setMap(null);
    }
    if (isPresent(get(this, 'gMap.map'))) {
      set(this, 'gMap.map', null)
    }
  },

  mapWasSet: observer('map', function() {
    run.once(this, 'initDirectionsService');
  }),

  initDirectionsService() {
    const map = get(this, 'gMap.map');
    let service = get(this, 'directionsService');
    let renderer = get(this, 'directionsRenderer');

    if (isPresent(map)
      && isEmpty(service)
      && isEmpty(renderer)
      && (typeof FastBoot === 'undefined')) {
      const rendererOptions = {
        map,
        suppressMarkers: false,
        preserveViewport: true
      };
      renderer = new google.maps.DirectionsRenderer(rendererOptions);
      service = new google.maps.DirectionsService();

      this.set('directionsRenderer', renderer);
      this.set('directionsService', service);

      this.updateRoute();
      this.updatePolylineOptions();
    }
  },

  onLocationsChanged: observer('originLat', 'originLng', 'destinationLat', 'destinationLng', 'gMap.travelMode', function() {
    run.once(this, 'updateRoute');
  }),

  updateRoute() {
    const service = get(this, 'directionsService');
    const renderer = get(this, 'directionsRenderer');
    const originLat = get(this, 'originLat');
    const originLng = get(this, 'originLng');
    const destinationLat = get(this, 'destinationLat');
    const destinationLng = get(this, 'destinationLng');
    const waypoints = get(this, 'waypoints').mapBy('waypoint');

    if (isPresent(service) && isPresent(renderer)
      && isPresent(originLat) && isPresent(originLng)
      && isPresent(destinationLat) && isPresent(destinationLng)
      && (typeof FastBoot === 'undefined')) {
      const origin = new google.maps.LatLng(get(this, 'originLat'), get(this, 'originLng'));
      const destination = new google.maps.LatLng(get(this, 'destinationLat'), get(this, 'destinationLng'));
      // const travelMode = this.retrieveTravelMode(get(this, 'travelMode'));
      const travelMode = get(this, 'gMap.travelMode');
      const request = {
        origin,
        destination,
        travelMode,
        waypoints
      };

      service.route(request, (response, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          renderer.setDirections(response);
          set(this, 'gMap.turnByTurn', response.routes[0].legs[0]);
          const panel = document.createElement('div')
          renderer.setPanel(panel);
          set(this, 'gMap.directionsPanel', panel);
          get(this, 'gMap').registerFeature(renderer);
        }
      });
    }
  },

  polylineOptionsChanged: observer(...allowedPolylineOptions, function() {
    run.once(this, 'updatePolylineOptions');
  }),

  updatePolylineOptions() {
    const renderer = get(this, 'directionsRenderer');
    const polylineOptions = compact(this.getProperties(allowedPolylineOptions));

    if (isPresent(renderer) && isPresent(Object.keys(polylineOptions))) {
      renderer.setOptions({ polylineOptions });

      const directions = renderer.getDirections();
      if (isPresent(directions)) {
        renderer.setDirections(directions);
      }
    }
  },

  // retrieveTravelMode(mode) {
  //   return TRAVEL_MODES.hasOwnProperty(mode) ? TRAVEL_MODES[mode] : TRAVEL_MODES.driving;
  // },

  registerWaypoint(waypoint) {
    get(this, 'waypoints').addObject(waypoint);
  },

  unregisterWaypoint(waypoint) {
    get(this, 'waypoints').removeObject(waypoint);
  },

  waypointsChanged: observer('waypoints.@each.location', function() {
    run.once(this, 'updateRoute');
  })
});

GMapRouteComponent.reopenClass({
  positionalParams: ['mapContext']
});

export default GMapRouteComponent;
