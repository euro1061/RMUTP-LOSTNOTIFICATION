import axios from "axios"

export const GetAllMissingItem = async () => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_DOMAINENDPOINT}/api/missing-item`)
        return(res.data)
    } catch (error) {
        return error
    }
}