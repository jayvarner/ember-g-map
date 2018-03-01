import GMapBase from 'ember-g-map/components/g-map-base';
import { get, set } from '@ember/object';
/* global google */

export default GMapBase.extend({
  createFeature() {
    if (this.get('isFastBoot')) {
      return;
    }

    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer;
    let origin = get(this, 'origin');
    let destination = get(this, 'destination');
    let travelMode = get(this, 'travelMode') || 'WALKING';
    let map = get(this, 'parentComponent').feature;
    set(this, 'feature', directionsDisplay);
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('directions-panel'));

    directionsService.route({
      origin,
      destination,
      travelMode
    }, (response, status) => {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        //
      }
    });

    return get(this, 'feature');

  },

  didUpdateAttrs() {
    this.feature.setMap(null);
    this.feature.setPanel(null);
    this.createFeature();
    return get(this, 'travelMode');
  },

  updateRoute() {
    // console.log(get(this, 'travelMode'));
  }
});
