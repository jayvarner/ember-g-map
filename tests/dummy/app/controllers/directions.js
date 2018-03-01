// BEGIN-SNIPPET directions-controller
// /app/controller/directions.js
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  geoLocation: service(),
  travelMode: 'TRANSIT'
});
// END-SNIPPET
