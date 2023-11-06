import axios from "axios";
import configs from "../config/configuration";
import fetchUserData from "./userSavedData";
import errorOnHandle from "./errorHandle";

async function handleOnLogout(navigate, url) {
  const { REACT_APP_BACKEND_URL } = configs;
  const userData = fetchUserData();

  try {
    // const response = await axios.post(
    //     `${REACT_APP_BACKEND_URL}${url}`,
    //     {},
    //     {
    //         headers: { Authorization: `Bearer ${userData.jwt}`, Auth: userData.token }
    //     }
    // );
    const response = "jitu";
    return response;
  } catch (error) {
    const errorHandler = errorOnHandle(
      error.response?.status,
      error.response?.data.msg,
      navigate
    );
    if (!errorHandler) return;
    else return alert(errorHandler.msg);
  }
}

export default handleOnLogout;
