import axios from 'axios'

export const getUserCurrentAPI = async () => {
    const { status, data } = await axios.get(`${process.env.REACT_APP_DOMAINENDPOINT}/api/users/me`)
    if (status === 200) {
        return data
    }
}