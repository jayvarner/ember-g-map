import Component from '@ember/component';
import { get, observer, set } from '@ember/object';
import { alias } from '@ember/object/computed';
import { run } from '@ember/runloop';
import { assert } from '@ember/debug';
import { typeOf, isPresent, isEmpty } from '@ember/utils';
import layout from '../templates/components/g-map-marker';
import GMapComponent from './g-map';

const GMapMarkerComponent = Component.extend({
  layout,
  classNames: ['g-map-marker'],

  map: alias('gMap.map'),

  init() {
    this._super(...arguments);
    this.infowindow = null;
    if (isEmpty(get(this, 'group'))) {
      set(this, 'group', null);
    }

    const mapContext = get(this, 'mapContext');
    assert('Must be inside {{#g-map}} component with context set', mapContext instanceof GMapComponent);

    mapContext.registerMarker(this);
  },

  didInsertElement() {
    this._super(...arguments);
    if (isEmpty(get(this, 'marker'))
      && (typeof FastBoot === 'undefined')) {
      const marker = new google.maps.Marker();
      set(this, 'marker', marker);
    }
    // set(this, 'map', get(this, 'gMap.map'));
    this.setPosition();
    this.setZIndex();
    this.setIcon();
    this.setDraggable();
    this.setLabel();
    this.setTitle();
    this.setMap();
    this.setOnClick();
    this.setOnDrag();
  },

  willDestroyElement() {
    this.unsetMarkerFromMap();
    get(this, 'gMap.map').unregisterMarker(this);
  },

  registerInfowindow(infowindow, openEvent, closeEvent) {
    set(this, 'infowindow', infowindow);
    this.attachOpenCloseEvents(infowindow, openEvent, closeEvent);
  },

  unregisterInfowindow() {
    set(this, 'infowindow', null);
  },

  attachOpenCloseEvents(infowindow, openEvent, closeEvent) {
    const marker = get(this, 'marker');
    if (openEvent === closeEvent) {
      this.attachTogglingInfowindowEvent(marker, infowindow, openEvent);
    } else {
      this.attachOpenInfowindowEvent(marker, infowindow, openEvent);
      this.attachCloseInfowindowEvent(marker, infowindow, closeEvent);
    }
  },

  attachOpenInfowindowEvent(marker, infowindow, event) {
    if (isPresent(event)) {
      marker.addListener(event, () => infowindow.open());
    }
  },

  attachCloseInfowindowEvent(marker, infowindow, event) {
    if (isPresent(event)) {
      marker.addListener(event, () => infowindow.close());
    }
  },

  attachTogglingInfowindowEvent(marker, infowindow, event) {
    if (isPresent(event)) {
      marker.addListener(event, () => {
        if (infowindow.get('isOpen')) {
          infowindow.close();
        } else {
          infowindow.open();
        }
      });
    }
  },

  unsetMarkerFromMap() {
    const marker = get(this, 'marker');
    if (isPresent(marker)) {
      marker.setMap(null);
    }
  },

  mapWasSet: observer('map', function() {
    run.once(this, 'setMap');
  }),

  setMap() {
    const map = get(this, 'gMap.map');
    const marker = get(this, 'marker');

    if (isPresent(marker) && isPresent(map)) {
      marker.setMap(map);
    }
  },

  coordsChanged: observer('lat', 'lng', function() {
    run.once(this, 'setPosition');
  }),

  setPosition() {
    const marker = get(this, 'marker');
    const lat = get(this, 'lat');
    const lng = get(this, 'lng');

    if (isPresent(marker)
      && isPresent(lat)
      && isPresent(lng)
      && (typeof FastBoot === 'undefined')) {
      const position = new google.maps.LatLng(lat, lng);
      if (isPresent(position)) {
        marker.setPosition(position);
      }
    }
  },

  iconChanged: observer('icon', function() {
    run.once(this, 'setIcon');
  }),

  setIcon() {
    const marker = get(this, 'marker');
    const icon = get(this, 'icon');

    if (isPresent(marker) && isPresent(icon)) {
      marker.setIcon(icon);
    }
  },

  zIndexChanged: observer('zIndex', function() {
    run.once(this, 'setZIndex');
  }),

  setZIndex() {
    const marker = get(this, 'marker');
    const zIndex = get(this, 'zIndex');
    if (isPresent(marker) && isPresent(zIndex)) {
      marker.setZIndex(zIndex);
    }
  },

  draggableChanged: observer('draggable', function() {
    run.once(this, 'setDraggable');
  }),

  setDraggable() {
    const marker = get(this, 'marker');
    const draggable = get(this, 'draggable');
    if (isPresent(marker) && isPresent(draggable)) {
      marker.setDraggable(draggable);
    }
  },

  setOnClick() {
    const marker = get(this, 'marker');
    if (isPresent(marker)) {
      marker.addListener('click', () => this.sendOnClick());
    }
  },

  setOnDrag() {
    const marker = get(this, 'marker');
    marker.addListener('dragend', (event) => {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      if (isPresent(lat) && isPresent(lng) && isPresent(marker)) {
        const position = new google.maps.LatLng(lat, lng);
        marker.setPosition(position);
        this.sendOnDrag(lat, lng);
      }
    });
  },

  labelChanged: observer('label', function() {
    run.once(this, 'setLabel');
  }),

  setLabel() {
    const marker = get(this, 'marker');
    const label = get(this, 'label');

    if (isPresent(marker) && isPresent(label)) {
      marker.setLabel(label);
    }
  },

  titleChanged: observer('title', function() {
    run.once(this, 'setTitle');
  }),

  setTitle() {
    const marker = get(this, 'marker');
    const title = get(this, 'title');

    if (isPresent(marker) && isPresent(title)) {
      marker.setTitle(title);
    }
  },

  sendOnClick() {
    const { onClick } = this.attrs;
    const mapContext = get(this, 'gMap.map');
    const group = get(this, 'group');
    if (typeOf(onClick) === 'function') {
      onClick();
    } else {
      this.sendAction('onClick');
    }

    if (isPresent(group)) {
      mapContext.groupMarkerClicked(this, group);
    }
  },

  sendOnDrag(lat, lng) {
    const { onDrag } = this.attrs;

    if (typeOf(onDrag) === 'function') {
      onDrag(lat, lng);
    } else {
      this.sendAction('onDrag', lat, lng);
    }
  },

  closeInfowindow() {
    const infowindow = get(this, 'infowindow');
    if (isPresent(infowindow)) {
      infowindow.close();
    }
  }
});

GMapMarkerComponent.reopenClass({
  positionalParams: ['mapContext']
});

export default GMapMarkerComponent;
