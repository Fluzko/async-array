import AsyncArrayException from './asyncArrayException';
// eslint-disable-next-line import/no-cycle
import Handler from './handler';

const AsyncArray = (generator, initial = []) => {
  if (typeof generator !== 'function')
    throw new AsyncArrayException('Generator must be a function');
  if (!Array.isArray(initial))
    throw new AsyncArrayException('Initial value must be an array');

  return new Proxy([...initial], new Handler(generator).build());
};

export default AsyncArray;
