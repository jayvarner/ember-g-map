import { A } from '@ember/array';
import GMapBase from 'ember-g-map/components/g-map-base';
import { isPresent, isEmpty } from '@ember/utils';
import { observer, computed, get, set } from '@ember/object';
import { run } from '@ember/runloop';
import { ParentMixin } from 'ember-composability-tools';
import layout from '../templates/components/g-map';
/* global google */

export default GMapBase.extend(ParentMixin, {
  layout,
  tagName: 'div',
  classNames: ['map-map'],
  _bounds: new google.maps.LatLngBounds(),

  // didInsertParent() {
  //   this._super(...arguments);
  //   if (isEmpty(get(this, 'gMap.map'))
  //     && (typeof FastBoot === 'undefined')) {
  //     const canvas = this.$().find('.g-map-canvas').get(0);
  //     const options = this.get('options');
  //     this.setUpMap(canvas, options);
  //   }
  //   this.setZoom();
  //   this.setCenter();
  //   if (get(this, 'shouldFit')) {
  //     // this.fitToMarkers();
  //     set(this, 'gMap.shouldFit', true);
  //   }
  // },

  createLayer() {
    // return new google.maps.Map(this.element, get(this, 'options'));
    const options = get(this, 'options');
    const map = new google.maps.Map(this.element, options);

    // set(this, 'map', map);
    // if(isEmpty('options')) {
    //   map.fitBounds(new google.maps.LatLngBounds({lat: -34, lng: 151}));
    // }
    // console.log('bounds', map)
    return map;
  },

  didCreateLayer() {
    // console.log(this._feature);
  },

  willDestroy() {

  }
});
