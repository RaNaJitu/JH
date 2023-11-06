import validSession from "./validSessionHandle";
import errorOnHandle from "./errorHandle";
import axios from "axios";
import configs from "../config/configuration";
import fetchUserData from "./userSavedData";

async function handleOnChangePassword(oldPassword, newPassword, navigate, setOldPasswordError, setNewPasswordError) {
    try {
        const userData = fetchUserData()
        let navigateUrl
        if (userData?.role == 'vendor')
            navigateUrl = '/login'
        else if (userData?.role == 'admin')
            navigateUrl = '/admin/login'
        else
            return alert("Something Went Wrong . Kindly login again")

        if (!validSession())
            return navigate(navigateUrl)

        if (!oldPassword || !newPassword)
            return alert("Kindly fill all the fields")
        setNewPasswordError('')
        let url
        if (userData.role == 'admin')
            url = `admins/${userData.accountId}/change_password`
        else if (userData.role == 'vendor')
            url = `accounts/${userData.accountId}/change_password`
        const res = await axios.post(`${configs.REACT_APP_BACKEND_URL}${url}`, { oldPassword, newPassword }, {
            headers: { Authorization: `Bearer ${userData.jwt}`, Auth: userData.token }
        })
        return res

    } catch (error) {
        if (error.response?.status == 404) {
            setOldPasswordError('Old password is incorrect')
            return
        }

        const errorHandler = errorOnHandle(error?.response?.status, error?.response?.data.msg, navigate)
        if (!errorHandler)
            return
        else
            return alert(errorHandler.msg)

    }




}

export default handleOnChangePassword