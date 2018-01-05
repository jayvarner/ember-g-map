import GMapBase from 'ember-g-map/components/g-map-base';
import { get, observer, set } from '@ember/object';
import { alias } from '@ember/object/computed';
import { run } from '@ember/runloop';
import { assert } from '@ember/debug';
import { typeOf, isPresent, isEmpty } from '@ember/utils';
import { ParentMixin } from 'ember-composability-tools';
/* global google */

export default GMapBase.extend(ParentMixin, {
  createLayer() {
    return new google.maps.Marker({position: get(this, 'position')});
  },

  didCreateLayer() {
    // console.log('hello', this._feature);
  },

  addToContainer() {
    const map = get(this, 'parentComponent')._feature;
    const bounds = get(this, 'parentComponent')._bounds;
    this._feature.setMap(map);
    bounds.extend(this._feature.position)
    map.fitBounds(bounds);
  }
});
