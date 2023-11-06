import fetchUserData from "./userSavedData"

function validSession() {
    const userData = fetchUserData()
    let res = true
    if (!userData || userData.jwt == undefined || !userData.jwt || !userData.role || !userData.accountId)
        res = false
    return res

}
export default validSession