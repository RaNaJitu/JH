function fetchUserData() {
    const jwt = sessionStorage.getItem('userjwt')
    const token = sessionStorage.getItem('useraccount')
    const role = sessionStorage.getItem('userRole')
    const accountId = sessionStorage.getItem('accountId')
    const userData = { jwt, token, role, accountId }
    return userData
}

export default fetchUserData