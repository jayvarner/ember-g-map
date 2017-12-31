import { get, set } from '@ember/object';
import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import { A } from '@ember/array';
import { observer } from '@ember/object';
import { run } from '@ember/runloop';
import { assert } from '@ember/debug';
import { typeOf, isPresent, isEmpty } from '@ember/utils';
import { inject as service } from '@ember/service';
import layout from '../templates/components/g-map-infowindow';
import GMapComponent from './g-map';
import GMapMarkerComponent from './g-map-marker';
import compact from '../utils/compact';

const allowedOptions = A(['disableAutoPan', 'maxWidth', 'pixelOffset']);

const OPEN_CLOSE_EVENTS = A(
  ['click', 'dblclick', 'rightclick', 'mouseover', 'mouseout']
);

const GMapInfowindowComponent = Component.extend({
  layout,
  classNames: ['g-map-marker'],
  gMap: service(),

  map: alias('gMap.map'),
  marker: alias('mapContext.marker'),

  init() {
    this._super(...arguments);

    const mapContext = get(this, 'mapContext');
    const hasMap = mapContext instanceof GMapComponent;
    const hasMarker = mapContext instanceof GMapMarkerComponent;
    assert('Must be inside {{#g-map}} or {{#g-map-marker}} components with context set',
      hasMarker || hasMap);

    if (hasMarker) {
      set(this, 'hasMarker', true);
    }
  },

  didInsertElement() {
    this._super(...arguments);
    if (isEmpty(get(this, 'infowindow'))) {
      const infowindow = this.buildInfowindow();
      set(this, 'infowindow', infowindow);
    }
    this.setPosition();
    this.setMap();
    this.setMarker();
    this.setOptions();
  },

  willDestroyElement() {
    this.close();

    if (get(this, 'hasMarker')) {
      get(this, 'mapContext').unregisterInfowindow();
    }
  },

  optionsChanged: observer(...allowedOptions, function() {
    run.once(this, 'setOptions');
  }),

  setOptions() {
    const infowindow = get(this, 'infowindow');
    const options = compact(this.getProperties(allowedOptions));

    if (isPresent(infowindow) && isPresent(Object.keys(options))) {
      infowindow.setOptions(options);
    }
  },

  buildInfowindow() {
    if (google) {
      const infowindow = new google.maps.InfoWindow({
        content: get(this, 'element')
      });

      if (isPresent(get(this, 'attrs.onOpen'))) {
        infowindow.addListener('domready', () => this.handleOpenClickEvent());
      }

      if (isPresent(get(this, 'attrs.onClose'))) {
        infowindow.addListener('closeclick', () => this.handleCloseClickEvent());
      }
      return infowindow;
    }
  },

  handleOpenClickEvent() {
    const { onOpen } = this.attrs;
    if (typeOf(onOpen) === 'function') {
      onOpen();
    } else {
      this.sendAction('onOpen', this);
    }
  },

  handleCloseClickEvent() {
    const { onClose } = this.attrs;
    if (typeOf(onClose) === 'function') {
      onClose();
    } else {
      this.sendAction('onClose');
    }
  },

  open() {
    const infowindow = get(this, 'infowindow');
    const map = get(this, 'map');
    const marker = get(this, 'marker');

    set(this, 'isOpen', true);
    if (isPresent(map) && isPresent(marker)) {
      infowindow.open(map, marker);
    } else if (isPresent(map)) {
      infowindow.open(map);
    }
  },

  close() {
    const infowindow = get(this, 'infowindow');
    if (isPresent(infowindow)) {
      set(this, 'isOpen', false);
      infowindow.close();
    }
  },

  mapWasSet: observer('map', function() {
    run.once(this, 'setMap');
  }),

  setMap() {
    if (get(this, 'hasMarker') === false) {
      this.open();
    }
  },

  markerWasSet: observer('marker', function() {
    run.once(this, 'setMarker');
  }),

  setMarker() {
    const map = get(this, 'map');
    const marker = get(this, 'marker');
    const context = get(this, 'mapContext');
    const infowindow = get(this, 'infowindow');

    if (isPresent(infowindow) && isPresent(map) && isPresent(marker)) {
      const openEvent = this.retrieveOpenEvent();
      const closeEvent = this.retrieveCloseEvent();
      context.registerInfowindow(this, openEvent, closeEvent);
    }
  },

  coordsChanged: observer('lat', 'lng', function() {
    run.once(this, 'setPosition');
  }),

  setPosition() {
    const infowindow = get(this, 'infowindow');
    const lat = get(this, 'lat');
    const lng = get(this, 'lng');

    if (isPresent(infowindow)
      && isPresent(lat)
      && isPresent(lng)
      && (typeof FastBoot === 'undefined')) {
      const position = new google.maps.LatLng(lat, lng);
      infowindow.setPosition(position);
    }
  },

  retrieveOpenEvent() {
    const openEvent = get(this, 'openOn');
    return OPEN_CLOSE_EVENTS.includes(openEvent) ? openEvent : 'click';
  },

  retrieveCloseEvent() {
    const closeEvent = get(this, 'closeOn');
    return OPEN_CLOSE_EVENTS.includes(closeEvent) ? closeEvent : null;
  }
});

GMapInfowindowComponent.reopenClass({
  positionalParams: ['mapContext']
});

export default GMapInfowindowComponent;
