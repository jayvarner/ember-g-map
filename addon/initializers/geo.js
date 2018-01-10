export function initialize(application) {
  application.inject('controller', 'gMap', 'service:gMap');
  application.inject('component', 'gMap', 'service:gMap');
  application.inject('route', 'gMap', 'service:gMap');
  application.inject('view', 'gMap', 'service:gMap');
}

export default {
  name: 'geo',
  initialize
};
