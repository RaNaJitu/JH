function handleExpiredJwt(res) {
    const { authorization } = res.headers
    if (authorization) {
        sessionStorage.setItem('userjwt', authorization)
    }

}
export default handleExpiredJwt