import Component from '@ember/component';
import { assert } from '@ember/debug';
import { computed, get, set } from '@ember/object';
import { getOwner } from '@ember/application';
import { inject as service } from '@ember/service';
import { ChildMixin } from 'ember-composability-tools';
import layout from '../templates/components/g-map-base';
/* global google */

export default Component.extend(ChildMixin, {
  layout,
  tagName: '',
  fastboot: service(),
  isFastBoot: computed.reads('fastboot.isFastBoot'),
  map: null,

  createLayer() {
    assert('BaseLayer\'s `createLayer` should be overriden.');
  },

  /*
   * Method called by parent when the layer needs to setup
   */
  didInsertParent() {
    // Check for fastBoot
    if (this.get('isFastBoot')) {
      return;
    }

    this._feature = this.createLayer();
    // this._addObservers();
    // this._addEventListeners();
    if (this.get('parentComponent')) {
      this.addToContainer();
    }
    this.didCreateLayer();
  },

  addToContainer() {
    this._feature.setMap(this.get('parentComponent')._feature);
  },

  didCreateLayer() {
    //
  }
});
