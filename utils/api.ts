import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'development' 
  ? process.env.REACT_APP_BASE_URL_DEVELOPMENT 
  : process.env.REACT_APP_BASE_URL_LOCAL;

const axiosInstance = axios.create({
  baseURL,
});

export default axiosInstance;
