import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';

const instance = axios.create({
  baseURL,
});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get('access'); // Retrieve access token from cookies
    // console.log(accessToken)

    if (accessToken) {
      // If access token exists, add it to the request headers
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);


// Add a response interceptor
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is related to token expiration or invalid token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = Cookies.get('refresh'); // Assuming you store the refresh token in a cookie
        if (!refreshToken) {
          return Promise.reject(error);
        }
        const response = await axios.post(`${baseURL}/jwt/refresh/`, { refresh: refreshToken });
        const newToken = response.data.access;

        Cookies.set('access', newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axios(originalRequest);
      } catch (error) {
        // Handle error while refreshing token
        return Promise.reject(error);
      }
     
    }

    // If the error is not related to token expiration or invalid token, return the error
    return Promise.reject(error);
  }
);


export default instance;
