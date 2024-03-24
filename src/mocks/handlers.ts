// eslint-disable-next-line import/no-extraneous-dependencies
import { HttpResponse, http } from 'msw';
import customers from './dummy-data/customers.json';
import customer from './dummy-data/customer.json';
import invoiceTypes from './dummy-data/invoice-types.json';

const baseURL = (import.meta.env.VITE_AXIOS_BASE_URL_IN_DEV_MODE as string) ?? 'http://localhost:3000';

export default [
  http.get(`${baseURL}/customers`, () => HttpResponse.json(customers, { status: 200 })),
  http.post(`${baseURL}/customers`, () => HttpResponse.json(customer, { status: 201 })),
  http.get(`${baseURL}/customers/:id/checkingOverlap`, () => HttpResponse.json(customers, { status: 200 })),
  http.put(`${baseURL}/customers/:id`, () => HttpResponse.json(customer, { status: 200 })),
  http.get(`${baseURL}/invoice-types`, () => HttpResponse.json(invoiceTypes, { status: 200 })),
];
