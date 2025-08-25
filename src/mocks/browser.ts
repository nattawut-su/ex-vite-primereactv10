import { setupWorker } from 'msw/browser';
import { handlers as userHandlers } from './handlers/users';

export const worker = setupWorker(...userHandlers);
