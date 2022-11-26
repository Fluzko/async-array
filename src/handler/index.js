// eslint-disable-next-line import/no-cycle
import handlers from './handlers';
import AsyncArrayException from '../asyncArrayException';

export default class Handler {
  constructor(generator) {
    this.generator = generator;
  }

  build() {
    return {
      get: (target, prop) => {
        const handler = handlers.find(({ match }) => match(prop));
        if (handler) return handler.handle(target, prop, this.generator);
        throw new AsyncArrayException(`Property ${prop} is not supported`);
      },
      set: () => {
        throw new AsyncArrayException('Setting values is not supported');
      },
    };
  }
}
