import axios from "axios";
import configs from "../config/configuration";
import errorOnHandle from "./errorHandle";
import fetchUserData from "./userSavedData";
import validSession from "./validSessionHandle";
import handleExpiredJwt from "./replaceExpiredJwt";

export async function handleOnFetchProfileData(navigate, setData) {
    try {
        const userData = fetchUserData();

        let navigateUrl
        if (userData?.role == 'vendor')
            navigateUrl = '/login'
        else if (userData?.role == 'admin')
            navigateUrl = '/admin/login'
        else
            return alert("Something Went Wrong . Kindly login again")

        if (!validSession())
            return navigate(navigateUrl)

        const res = await axios.get(`${configs.REACT_APP_BACKEND_URL}accounts/${userData.accountId}/profile`, {
            headers: { Authorization: `Bearer ${userData.jwt}`, Auth: userData.token }
        })
        if (res) {
            handleExpiredJwt(res)
            setData(res.data.data);
        }
    } catch (error) {
        const errorHandler = errorOnHandle(error.response?.status, error.response?.data.msg, navigate)
        if (!errorHandler)
            return
        else
            return alert(errorHandler.msg)

    }

}

export async function handleOnSubmitProfileChange(navigate, updatedData, setIsSaving) {
    try {
        const userData = fetchUserData();

        let navigateUrl
        if (userData?.role == 'vendor')
            navigateUrl = '/login'
        else if (userData?.role == 'admin')
            navigateUrl = '/admin/login'
        else
            return alert("Something Went Wrong . Kindly login again")

        if (!validSession())
            return navigate(navigateUrl)

        const res = await axios.put(`${configs.REACT_APP_BACKEND_URL}accounts/${userData.accountId}/profile`, updatedData, {
            headers: { Authorization: `Bearer ${userData.jwt}`, Auth: userData.token }
        })

        if (res.status == 200)
            alert("Profile updated successfully")
        setIsSaving(false);
        handleExpiredJwt(res)

    } catch (error) {
        setIsSaving(false);
        const errorHandler = errorOnHandle(error.response?.status, error.response?.data.msg, navigate)
        if (!errorHandler)
            return
        else
            return alert(errorHandler.msg)


    }

}