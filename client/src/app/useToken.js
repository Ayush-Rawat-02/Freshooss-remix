import { useState } from "react";

const useToken = () => {
  const getToken = () => {
    const tokenOb = JSON.parse(localStorage.getItem("token"));
    return tokenOb ? tokenOb.token : null;
  };
  const [token, setToken] = useState(getToken);

  const saveToken = (recieved_token) => {
    localStorage.setItem("token", JSON.stringify(recieved_token));
    setToken(recieved_token);
  };
  const removeToken = () => {
    localStorage.removeItem("token");
    setToken(null);
  };
  return {
    saveToken,
    token,
    removeToken,
  };
};

export default useToken;
