import axios from 'axios';
import Cookies from 'js-cookie';

// Create an instance of axios
const instance = axios.create({
  // baseURL: "https://fnmalic.pythonanywhere.com/api",
  baseURL: "localhost:8000/api",

});

// Add a request interceptor
// instance.interceptors.request.use(
//   (config) => {
//     const accessToken = Cookies.get('access'); // Retrieve access token from cookies
//     console.log(accessToken)

//     if (accessToken) {
//       // If access token exists, add it to the request headers
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   (error) => {
//     // Do something with request error
//     return Promise.reject(error);
//   }
// );

export default instance;
