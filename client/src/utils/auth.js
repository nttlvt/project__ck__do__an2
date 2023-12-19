const setUserProfileToLocalStorage = (profile) => {
  localStorage.setItem("profile", JSON.stringify(profile));
};
const getUserProfileFromLocalStorage = () => {
  const result = localStorage.getItem("profile");
  return result ? JSON.parse(result) : null;
};
const setAccessTokenToLocalStorage = (access_token) => {
  localStorage.setItem("access_token", access_token);
};
const clearLocalStorage = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("profile");
};

export {
  setAccessTokenToLocalStorage,
  getUserProfileFromLocalStorage,
  setUserProfileToLocalStorage,
  clearLocalStorage,
};
