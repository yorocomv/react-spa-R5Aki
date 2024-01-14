// eslint-disable-next-line import/no-extraneous-dependencies
import { setupWorker } from 'msw/browser';
import handlers from './handlers';

export default setupWorker(...handlers);
