// // utils/auth.js

// // Check if the token exists and is valid
// export const isAuthenticated = () => {
//   const token = localStorage.getItem("authToken");
//   if (!token) return false;

//   try {
//     const { exp } = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
//     if (Date.now() >= exp * 1000) {
//       localStorage.removeItem("authToken"); // Remove expired token
//       return false;
//     }
//     return true;
//   } catch (error) {
//     console.error("Invalid token:", error);
//     return false;
//   }
// };

// // Log out user
// export const logout = () => {
//   localStorage.removeItem("authToken");
//   window.location.href = "/login";
// };

export const isAuthenticated = () => {
  const authToken = localStorage.getItem("authToken");
  if (!authToken) return false;
  else return true;
  

  // const parsedToken = JSON.parse(authToken);
  // return parsedToken.expiresAt > Date.now();
};
export const logout = () => {
  localStorage.removeItem("authToken"); // Clear the token
  window.location.href="/login";
};
