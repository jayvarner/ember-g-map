
import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';

describe('Integration | Component | g map', function() {
  setupComponentTest('g-map', {
    integration: true
  });

  it('renders map', function() {

    this.render(hbs`
    {{g-map
      lat=33.75432
      lng=-84.38979
      zoom=12
    }}
    `);

    expect(find('.map-map')).to.be.ok;
    expect('12').to.equal('12')
    // assert.equal(this.get('markers.length', 4));
  });
});
