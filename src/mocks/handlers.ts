// eslint-disable-next-line import/no-extraneous-dependencies
import { HttpResponse, http } from 'msw';
import customers from './dummy-data/customers.json';

const baseURL = (import.meta.env.VITE_AXIOS_BASE_URL_IN_DEV_MODE as string) ?? 'http://localhost:3000';

export default [
  http.get(`${baseURL}/customers`, () => HttpResponse.json(customers, { status: 200 })),
  http.get(`${baseURL}/customers/:id/checkingOverlap`, () => HttpResponse.json(customers, { status: 200 })),
];
