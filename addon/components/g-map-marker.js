import GMapBase from 'ember-g-map/components/g-map-base';
import { get, set } from '@ember/object';
// import {` assert } from '@ember/debug';
import { isPresent } from '@ember/utils';
import { ParentMixin, ChildMixin } from 'ember-composability-tools';
import { inject as service } from '@ember/service';
import layout from '../templates/components/g-map-overlayable';
/* global google */

export default GMapBase.extend(ParentMixin, ChildMixin, {
  layout,
  geoLocation: service(),
  createFeature() {
    if (this.get('isFastBoot')) {
      return;
    }

    return new google.maps.Marker();
  },

  didcreateFeature() {

  },

  addToContainer() {
    if (this.get('isFastBoot')) {
      return;
    }
    if(isPresent(this.feature)) {
      this.setPosition();
      // this.setZIndex();
      this.setIcon();
      // this.setDraggable();
      this.setLabel();
      this.setTitle();
      this.setAnimation();
      // this.setOnClick();
      // this.setOnDrag();
      let map = get(this, 'parentComponent').feature;
      set(this, 'map', map);
      let bounds = get(this, 'parentComponent').bounds;
      get(this, 'feature').setMap(map);
      bounds.extend(get(this, 'feature.position'));
      map.fitBounds(bounds);
    }
  },

  willDestroy() {
    if (this.get('isFastBoot')) {
      return;
    }

    google.maps.event.clearInstanceListeners(get(this, 'feature'));
  },

  setPosition() {
    const marker = this.feature;
    const latLng = get(this, 'position')
    const lat = get(this, 'lat');
    const lng = get(this, 'lng');

    const markerPosition = isPresent(latLng) ? latLng : new google.maps.LatLng(lat, lng);

    if (isPresent(marker)
      && isPresent(markerPosition)) {
      marker.setPosition(markerPosition);
    }
  },

  setIcon() {
    const icon = this.get('icon');

    if (isPresent(icon)) {
      this.feature.setIcon(icon);
    }
  },

  // setZIndex() {
  //   const marker = this.get('marker');
  //   const zIndex = this.get('zIndex');
  //   if (isPresent(marker) && isPresent(zIndex)) {
  //     marker.setZIndex(zIndex);
  //   }
  // },

  // draggableChanged: observer('draggable', function() {
  //   run.once(this, 'setDraggable');
  // }),

  // setDraggable() {
  //   const marker = this.get('marker');
  //   const draggable = this.get('draggable');
  //   if (isPresent(marker) && isPresent(draggable)) {
  //     marker.setDraggable(draggable);
  //   }
  // },

  // setOnClick() {
  //   const marker = this.get('marker');
  //   if (isPresent(marker)) {
  //     marker.addListener('click', () => this.sendOnClick());
  //   }
  // },

  // setOnDrag() {
  //   const marker = this.get('marker');
  //   marker.addListener('dragend', (event) => {
  //     const lat = event.latLng.lat();
  //     const lng = event.latLng.lng();
  //     if (isPresent(lat) && isPresent(lng) && isPresent(marker)) {
  //       const position = new google.maps.LatLng(lat, lng);
  //       marker.setPosition(position);
  //       this.sendOnDrag(lat, lng);
  //     }
  //   });
  // },

  setLabel() {
    const label = this.get('label');

    if (isPresent(label)) {
      this.feature.setLabel(label);
    }
  },

  setTitle() {
    const title = this.get('title');

    if (isPresent(title)) {
      this.feature.setTitle(title);
    }
  },

  setAnimation() {
    const animation = this.get('animation');
    if(isPresent(animation)) {
      if (animation.toUpperCase() == 'DROP') {
        this.feature.setAnimation(google.maps.Animation.DROP);
      } else if (animation.toUpperCase() == 'BOUNCE') {
        this.feature.setAnimation(google.maps.Animation.BOUNCE);
      } else {
        // Assert something
      }
    }
  }
});
