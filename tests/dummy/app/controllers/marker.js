// BEGIN-SNIPPET marker-in-controller
// /app/controllers/marker.js
import Controller from '@ember/controller';

export default Controller.extend({
  lat: 33.7904,
  lng: -84.3229,
  label: 'A',
  title: 'This is a title',
  animation: 'DROP',
  icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'

});
// END-SNIPPET
