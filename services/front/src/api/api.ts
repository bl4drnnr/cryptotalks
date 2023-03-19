import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export const Api = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ?
    process.env.LOCAL_DATA_API_URL :
    process.env.PRODUCTION_DATA_API_URL,
  auth: {
    username: String(process.env.DATA_API_USERNAME),
    password: String(process.env.DATA_API_PASSWORD)
  },
  withCredentials: true,
});
