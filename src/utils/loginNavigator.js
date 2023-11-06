import fetchUserData from "./userSavedData"

function handleNavigateLogin(navigate) {
    const userRole = fetchUserData().role
    sessionStorage.removeItem('userToken')
    if (userRole == 'vendor')
        navigate('/login')
    else if (userRole == 'admin')
        navigate('/admin/login')
}

export default handleNavigateLogin