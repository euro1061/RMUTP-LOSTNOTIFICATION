import axios from "axios"

export const GetAllLosingItem = async (campus = "", query = "") => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_DOMAINENDPOINT}/api/losing-item/getAllForAdmin?campus=${campus}&query=${query}`)
        return(res.data)
    } catch (error) {
        return error
    }
}

export const getAllCampusAPI = async () => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_DOMAINENDPOINT}/api/campus`)
        return(res.data)
    } catch (error) {
        return error
    }
}