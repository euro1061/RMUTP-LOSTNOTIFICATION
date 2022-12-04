import axios from "axios"

export const getAllMissingItemByUserId = async (userId) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_DOMAINENDPOINT}/api/missing-item/user/${userId}`)
        return(res.data)
    } catch (error) {
        return error
    }
}