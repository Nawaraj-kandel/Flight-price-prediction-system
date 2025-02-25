export const getAuthToken = () => {
  const tokenData = JSON.parse(localStorage.getItem("authToken"));
  return tokenData ? tokenData.accessToken : null;
};

export const getUserInfo = () => {
  const userInfo = localStorage.getItem("userInfo");
  return userInfo ? JSON.parse(userInfo) : null;
};

export const isAuthenticated = () => {
  const authToken = localStorage.getItem("authToken");
  if (!authToken) return false;

  const parsedToken = JSON.parse(authToken);
  return parsedToken.accessTokenExpiresAt > Date.now();
};

export const logout = () => {
  localStorage.removeItem("authToken"); // Clear the token
  localStorage.removeItem("userInfo"); // Clear the user info
  window.location.href = "/login";
};
