// I totally stole this from ember-select-light
// https://github.com/q2ebanking/ember-select-light
import Ember from 'ember';

export const isEqual = ([left, right]) => left === right;

export default Ember.Helper.helper(isEqual);
