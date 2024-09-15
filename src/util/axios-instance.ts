import axios from 'axios';
import env from '@/env';

const baseURL = `http://${env.VITE_BEP_HOST}:${env.VITE_BEP_PORT}/api`;

export default axios.create({
  baseURL,
});
