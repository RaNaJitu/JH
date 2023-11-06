import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import handleOnLogout from "../utils/logoutHandle";
import validSession from "../utils/validSessionHandle";
import fetchUserData from "../utils/userSavedData";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    async function logoutAndNavigate() {
      try {
        const userData = fetchUserData();
        userData.accountId = "admin";
        userData.role = "admin";
        if (!validSession()) {
          return navigateLogin(navigate, userData.role);
        }
        let url;
        if (userData.role == "admin")
          url = `admins/${userData.accountId}/logout`;
        else if (userData.role == "vendor")
          url = `accounts/${userData.accountId}/logout`;
        const response = await handleOnLogout(navigate, url);
        if (response.data.status == 200) {
          sessionStorage.removeItem("userjwt");
          sessionStorage.removeItem("userRole");
          sessionStorage.removeItem("accountId");
          navigateLogin(navigate, userData.role);
        }
      } catch (error) {
        console.error(error);
      }
    }

    logoutAndNavigate();
  }, [navigate]);

  return null;
};

function navigateLogin(navigate, userRole) {
  if (userRole == "vendor") navigate("/login");
  else if (userRole == "admin") navigate("/admin/login");
  else return alert("Something Went Wrong . Kindly login again");
}

export default Logout;
