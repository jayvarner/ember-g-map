import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('g-map-geolocation', 'Integration | Component | g map geolocation', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`
    {{#g-map as |context|}}
      {{g-map-geolocation context}}
    {{/g-map}}
  `);

  assert.ok(this.$());

  // Template block usage:
  this.render(hbs`
    {{#g-map as |context|}}
      {{#g-map-geolocation context}}
        template block text
      {{/g-map-geolocation}}
    {{/g-map}}
  `);

  // Will render infowindow:
  this.render(hbs`
    {{#g-map as |context|}}
      {{#g-map-geolocation context}}
        {{#g-map-infowindow context}}
          <h1>My browser thinks I'm here!</h1>
        {{/g-map-infowindow}}
      {{/g-map-geolocation}}
    {{/g-map}}
  `);

  assert.ok(this.$());
});
