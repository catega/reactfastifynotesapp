export const getToken = (user) => {
    return {
        headers: {
            Authorization: user.token
        }
    }
}