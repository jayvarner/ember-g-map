import { debug } from '@ember/debug';
import { isPresent } from '@ember/utils';
import GMapMarkerComponent from 'ember-g-map/components/g-map-marker';
/* global google */

export default  GMapMarkerComponent.extend({

  setPosition() {
    const marker = this.get('marker');

    if (isPresent(marker)
      && isPresent(navigator.geolocation)
      && (typeof FastBoot === 'undefined')) {
      navigator.geolocation.getCurrentPosition((location) => {
        const position = new google.maps.LatLng(
          location.coords.latitude,
          location.coords.longitude
        );
        if (isPresent(position)) {
          marker.setPosition(position);
        }
      }, (error) => {
        debug(`GMapGeolocation ERROR: ${error.message}`);
      });
    } else if (isPresent(navigator.geolocation) === false) {
      debug('GMapGeolocation EROOR: Your browser doesn\'t support geolocation.');
    }
  }
});
