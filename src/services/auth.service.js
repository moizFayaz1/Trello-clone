export const getStoredUser = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
    return null;
  }
};

export const isUserLoggedIn = () => {
  const user = localStorage.getItem("user");
  if (!user) {
    return false;
  }
  return true;
};

export const getCurrentUser = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    return null;
  }
  return user;
};
