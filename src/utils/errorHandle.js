import handleNavigateLogin from "./loginNavigator"

function errorOnHandle(statusCode = 400, msg = 'Something went wrong', navigate) {
    if (statusCode == 400 || statusCode == 404) {
        return { statusCode, msg }
    }
    if (statusCode == 401)
        return handleNavigateLogin(navigate)
}

export default errorOnHandle