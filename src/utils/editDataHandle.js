import axios from "axios"
import configs from "../config/configuration"
import fetchUserData from "./userSavedData"
import errorOnHandle from "./errorHandle"
import validSession from "./validSessionHandle"
import handleExpiredJwt from "./replaceExpiredJwt"


export async function handleOnFetchEditData(data, navigate, role) {
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

        let url

        url = `users/${userData.accountId}/user/${data._id}`


        const res = await axios.put(`${configs.REACT_APP_BACKEND_URL}${url}`, data, {
            headers: { Authorization: `Bearer ${userData.jwt}`, Auth: userData.token }
        })
        handleExpiredJwt(res)
        return res
    } catch (error) {
        const errorHandler = errorOnHandle(error.response?.status, error.response?.data.msg, navigate)
        if (!errorHandler)
            return
        else
            return alert(errorHandler.msg)
    }
}

export function handleOnEditData(res, data) {
    const updatedUserData = res.data.data;

    const index = data.findIndex((item) => item._id == updatedUserData._id);
    var newData
    if (index !== -1) {
        newData = [...data];
        newData[index] = updatedUserData;
    }
    return newData

}

export async function handleonDeleteData(data, isLoading, navigate, oldData, setData) {
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

        isLoading(true)

        let url
        if (userData.role == 'vendor')
            url = `users/${userData.accountId}/user/${data._id}`
        else
            url = `users/${userData.accountId}/user/${data._id}/hard`


        const res = await axios.delete(`${configs.REACT_APP_BACKEND_URL}${url}`, {
            headers: { Authorization: `Bearer ${userData.jwt}`, Auth: userData.token }
        })

        const updatedData = oldData.filter(item => item._id !== res.data.data._id);
        setData(updatedData);
        isLoading(false)
        handleExpiredJwt(res)

    } catch (error) {

        isLoading(false)
        const errorHandler = errorOnHandle(error.response?.status, error.response?.data.msg, navigate)
        if (!errorHandler)
            return
        else
            return alert(errorHandler.msg)

    }


}
export async function handleonVendorDeleteData(data, isLoading, navigate, oldData, setData) {
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

        isLoading(true)

        let url = `admins/${userData.accountId}/vendor/${data._id}/hard`


        const res = await axios.delete(`${configs.REACT_APP_BACKEND_URL}${url}`, {
            headers: { Authorization: `Bearer ${userData.jwt}`, Auth: userData.token }
        })

        const updatedData = oldData.filter(item => item._id !== res.data.data._id);
        setData(updatedData);
        isLoading(false)
        handleExpiredJwt(res)

    } catch (error) {

        isLoading(false)
        const errorHandler = errorOnHandle(error.response?.status, error.response?.data.msg, navigate)
        if (!errorHandler)
            return
        else
            return alert(errorHandler.msg)

    }


}