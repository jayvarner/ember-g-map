import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('g-map-marker', 'Integration | Component | g map marker', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`
  {{#g-map as |features|}}
  {{features.marker position=(
    hash
      lat=33.75432
      lng=-84.38979
  )}}

  {{features.marker position=(
    hash
      lat=33.688383
      lng=-84.455888
  )}}
{{/g-map}}
  `);

  assert.ok(this.$());

  // // Template block usage:
  // this.render(hbs`
  //   {{#g-map as |features|}}
  //     {{#features.marker position=(
  //       hash
  //         lat=33.75432
  //         lng=-84.38979
  //     )}}
  //       template block text
  //     {{/g-map-marker}}
  //   {{/g-map}}
  // `);

  // assert.ok(this.$());
});
