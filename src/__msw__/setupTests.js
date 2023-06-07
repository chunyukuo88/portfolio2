import '@testing-library/jest-dom';
import { server } from './server';

/**
 * Apply this to each test. Do not import it--paste in these three functions directly.
 * */
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

