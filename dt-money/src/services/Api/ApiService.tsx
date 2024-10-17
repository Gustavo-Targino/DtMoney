import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const ApiService = axios.create({
  baseURL: BASE_URL
});

export { ApiService };
