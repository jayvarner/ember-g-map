// I totally stole this from ember-select-light
// https://github.com/q2ebanking/ember-select-light
import { helper } from '@ember/component/helper';

export const isEqual = ([left, right]) => left === right;

export default helper(isEqual);
