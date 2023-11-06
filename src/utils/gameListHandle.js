import configs from "../config/configuration"
import errorOnHandle from "./errorHandle"
import handleExpiredJwt from "./replaceExpiredJwt"
import fetchUserData from "./userSavedData"
import validSession from "./validSessionHandle"
import axios from "axios"

export async function handleonFetchGameData(navigate, setGameData, setGames) {
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

        const result = await axios.get(`${configs.REACT_APP_BACKEND_URL}accounts/${userData.accountId}/games`, {
            headers: { Authorization: `Bearer ${userData.jwt}`, Auth: userData.token }
        })

        if (result) {
            handleExpiredJwt(result)
            setGameData(result.data.data);
            const initialGames = result.data.data.allowed_games.map((game) => ({
                name: game,
                status: result.data.data.restricted_games.includes(game) ? 'not_allowed' : 'allowed',
            }));
            setGames(initialGames);
        }


    } catch (error) {
        const errorHandler = errorOnHandle(error.response?.status, error.response?.data.msg, navigate)
        if (!errorHandler)
            return
        else
            return alert(errorHandler.msg)

    }
}

export async function handleOnSubmitGameData(navigate, gameData) {
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

        const res = await axios.put(`${configs.REACT_APP_BACKEND_URL}accounts/${userData.accountId}/games`, gameData, {
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