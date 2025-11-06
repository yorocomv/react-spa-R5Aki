import { http, HttpResponse } from 'msw';

import env from '@/env';

import zipCode from './dummy-data/address-data-by-zip-code.json';
import customer from './dummy-data/customer.json';
import customerTsv from './dummy-data/customers_-_output.json';
import customers from './dummy-data/customers.json';
import invoiceTypes from './dummy-data/invoice-types.json';
import notes from './dummy-data/notes.json';
import productsOptions from './dummy-data/products_-_options.json';

const baseURL = `http://${env.VITE_BEP_HOST}:${env.VITE_BEP_PORT}/api`;

export default [
  http.get(`${baseURL}/customers`, () => HttpResponse.json(customers, { status: 200 })),
  http.post(`${baseURL}/customers`, () => HttpResponse.json(customer, { status: 201 })),
  http.post(`${baseURL}/customers/output`, () => HttpResponse.json(customerTsv, { status: 201 })),
  http.get(`${baseURL}/customers/:id/checkingOverlap`, () => HttpResponse.json(customers, { status: 200 })),
  http.put(`${baseURL}/customers/:id`, () => HttpResponse.json(customer, { status: 200 })),
  http.get(`${baseURL}/invoice-types`, () => HttpResponse.json(invoiceTypes, { status: 200 })),
  http.get(`${baseURL}/notes/:customerId`, () => HttpResponse.json(notes, { status: 200 })),
  http.get(`${baseURL}/address-data-by-zip-code`, () => HttpResponse.json(zipCode, { status: 200 })),
  http.get(`${baseURL}/products/options`, () => HttpResponse.json(productsOptions, { status: 200 })),
];
