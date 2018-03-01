import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('g-map-directions-panel', 'Integration | Component | g map directions panel', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{g-map-directions-panel}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#g-map-directions-panel}}
      template block text
    {{/g-map-directions-panel}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
