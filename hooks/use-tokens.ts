import Cookies from 'js-cookie'; // Import Cookies library
import React from 'react';

export const useAuthToken = () => {
  const [accessToken, setAccessToken] = React.useState(null);
  const [refreshToken, setRefreshToken] = React.useState(null);

  const retrieveTokens = () => {
    const access = Cookies.get('access_token'); 
    const refresh = Cookies.get('refresh_token'); 
    setAccessToken(access);
    setRefreshToken(refresh);
  };

  // Call retrieveTokens function once when the component mounts
  React.useEffect(() => {
    retrieveTokens();
  }, []);

  // Function to refresh tokens
  const refreshTokens = () => {
    // Implement token refresh logic here if needed
    // For example, make a request to your server to refresh the tokens
  };

  return {
    accessToken,
    refreshToken,
    retrieveTokens,
    refreshTokens,
  };
};
