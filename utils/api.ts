import axios from 'axios';
import Cookies from 'js-cookie';

// Create an instance of axios
const instance  = axios.create({
  // baseURL: "https://fnmalic.pythonanywhere.com/api",
  baseURL: "http://127.0.0.1:8000/api/",

});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get('access'); // Retrieve access token from cookies
    console.log(accessToken)

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
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Fetch a new token from the API endpoint
        const response = await axios.get('http://127.0.0.1:8000/api/jwt/refresh');
        const newToken = response.data.access;

        // Update the access token in cookies
        Cookies.set('access', newToken);

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axios(originalRequest);
      } catch (error) {
        // Handle error while fetching new token
        return Promise.reject(error);
      }
    }

    // If the error is not related to token expiration or invalid token, return the error
    return Promise.reject(error);
  }
);


export default instance;
