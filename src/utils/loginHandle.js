import axios from "axios";
import configs from "../config/configuration";
import errorOnHandle from "./errorHandle";
function handleOnLogin(formFields, navigate) {
  const { email, password } = formFields;
  let isLoginAllowed = true;

  if (!email) {
    alert("Email is required");
    isLoginAllowed = false;
  }

  if (!password) {
    alert("Password is required");
    isLoginAllowed = false;
  }

  // if (isLoginAllowed) {
  //   axios.post(`${configs.REACT_APP_BACKEND_URL}accounts/login`, { email, password }).then((res) => {

  //     handleLoginSucceess(res, navigate)
  //   }).catch((error) => {
  //     const errorHandler = errorOnHandle(error?.response?.status, error?.response?.data.msg, navigate)
  //     if (!errorHandler)
  //       return
  //     else
  //       return alert(errorHandler.msg)
  //   })

  // }
}
function handleLoginSucceess(res, navigate) {
  const { authorization, auth } = res.headers;
  const { accountId } = res.data;
  sessionStorage.setItem("userjwt", authorization);
  sessionStorage.setItem("useraccount", auth);
  sessionStorage.setItem("userRole", "vendor");
  sessionStorage.setItem("accountId", accountId);
  navigate("/userList");
}

export default handleOnLogin;
