import configs from "../../config/configuration"
import errorOnHandle from ".././errorHandle"
import handleExpiredJwt from ".././replaceExpiredJwt"
import fetchUserData from ".././userSavedData"
import validSession from ".././validSessionHandle"
import axios from "axios"

export async function handleonFetchGameData(navigate, setGames) {
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

        const result = await axios.get(`${configs.REACT_APP_BACKEND_URL}admins/${userData.accountId}/games`, {
            headers: { Authorization: `Bearer ${userData.jwt}`, Auth: userData.token }
        })

        if (result) {
            handleExpiredJwt(result)
            setGames(result.data.data);
        }


    } catch (error) {
        const errorHandler = errorOnHandle(error.response?.status, error.response?.data.msg, navigate)
        if (!errorHandler)
            return
        else
            return alert(errorHandler.msg)

    }
}

export async function handleOnSubmitGameData(navigate, allowed_games, vendorId) {
    try {
        const userData = fetchUserData()
        let navigateUrl

        if (userData?.role == 'vendor') {
            navigateUrl = '/login'

        }
        else if (userData?.role == 'admin') {
            navigateUrl = '/admin/login'

        }

        else
            return alert("Something Went Wrong . Kindly login again")

        if (!validSession())
            return navigate(navigateUrl)

        const res = await axios.put(`${configs.REACT_APP_BACKEND_URL}admins/${userData.accountId}/vendor/${vendorId}/games`, { allowed_games }, {
            headers: { Authorization: `Bearer ${userData.jwt}`, Auth: userData.token }
        })

        if (res.status == 200)
            alert("Game List updated successfully")
        handleExpiredJwt(res)

    } catch (error) {
        const errorHandler = errorOnHandle(error.response?.status, error.response?.data.msg, navigate)
        if (!errorHandler)
            return
        else
            return alert(errorHandler.msg)


    }
}