// eslint-disable-next-line import/no-cycle
import Handler from './handler';
import AsyncArrayException from './asyncArrayException';
import './types';

/**
 * @param {function} generator - async function that will be called to generate the content of the array
 * @param {Array} initial - initial content of the array (optional)
 * @returns {AsyncArray} AsyncArray
 */
const AsyncArray = (generator, initial = []) => {
  if (typeof generator !== 'function')
    throw new AsyncArrayException('Generator must be a function');
  if (!Array.isArray(initial))
    throw new AsyncArrayException('Initial value must be an array');

  return new Proxy([...initial], new Handler(generator).build());
};

export default AsyncArray;
