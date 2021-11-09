import Frisbee from 'frisbee';
import axios from 'axios';
import {env} from '../config';

const HEADERS = {
  'Content-Type': 'application/json',
};

const api = new Frisbee({
  baseURI: env.endpoint,
  headers: HEADERS,
});

const backendApi = axios.create({
  baseURL: env.baseUrl,
  headers: HEADERS,
});

const authAPI = axios.create({
  baseURL: env.baseUrl + '/api/auth/login',
  headers: HEADERS,
});

export {api, backendApi, authAPI};
