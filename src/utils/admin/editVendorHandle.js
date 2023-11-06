import axios from "axios"
import fetchUserData from "../userSavedData"
import validSession from "../validSessionHandle"
import errorOnHandle from "../errorHandle"
import configs from "../../config/configuration"

export async function handleOnFetchEditVendorData(data, navigate) {
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

        url = `admins/${userData.accountId}/vendor/${data._id}`


        const res = await axios.put(`${configs.REACT_APP_BACKEND_URL}${url}`, data, {
            headers: { Authorization: `Bearer ${userData.jwt}`, Auth: userData.token }
        })
        return res
    } catch (error) {
        const errorHandler = errorOnHandle(error.response?.status, error.response?.data.msg, navigate)
        if (!errorHandler)
            return
        else
            return alert(errorHandler.msg)
    }
}