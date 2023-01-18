export const handleResponse = (itemRes) => {

  if (itemRes.status === 401) {
    localStorage.removeItem("token");
    window.location = "/login";
  }
};
