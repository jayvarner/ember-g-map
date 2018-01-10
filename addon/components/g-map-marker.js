import GMapBase from 'ember-g-map/components/g-map-base';
import { get, set } from '@ember/object';
import { ParentMixin, ChildMixin } from 'ember-composability-tools';
import layout from '../templates/components/g-map-overlayable';
/* global google */

export default GMapBase.extend(ParentMixin, ChildMixin, {
  layout,
  createFeature() {
    if (this.get('isFastBoot')) {
      return;
    }

    return new google.maps.Marker({position: get(this, 'position')});
  },

  didcreateFeature() {
    //
  },

  addToContainer() {
    if (this.get('isFastBoot')) {
      return;
    }

    let map = get(this, 'parentComponent').feature;
    set(this, 'map', map)
    let bounds = get(this, 'parentComponent').bounds;
    get(this, 'feature').setMap(map);
    bounds.extend(get(this, 'feature.position'));
    map.fitBounds(bounds);
  }
});
