import axios from 'axios';
import env from '../env';

// let baseURL: string;
// switch (import.meta.env.MODE) {
//   case 'development':
//   case 'msw4dev':
//     baseURL = (import.meta.env.VITE_AXIOS_BASE_URL_IN_DEV_MODE as string) ?? 'http://localhost:3000';
//     break;
//   case 'production':
//     baseURL = (import.meta.env.VITE_AXIOS_BASE_URL_IN_PROD_MODE as string) ?? 'http://192.168.1.1:3000';
//     break;
//   default:
//     baseURL = 'http://localhost:80';
// }

const baseURL = `http://${env.VITE_BEP_HOST}:${env.VITE_BEP_PORT}`;
console.log(env.SSR);

export default axios.create({
  baseURL,
});
