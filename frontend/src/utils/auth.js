export const getUserFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));

    return {
      username:
        decoded.username ||
        decoded.sub ||
        decoded.user ||
        decoded.email ||
        "User",
      is_admin: decoded.is_admin || false
    };
  } catch (err) {
    console.error("Invalid token", err);
    return null;
  }
};
