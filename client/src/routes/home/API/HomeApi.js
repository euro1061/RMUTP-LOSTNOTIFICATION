import axios from "axios"

export const GetAllMissingItem = async (campus = "", query = "") => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_DOMAINENDPOINT}/api/missing-item/getAll?campus=${campus}&query=${query}`)
        return(res.data)
    } catch (error) {
        return error
    }
}

export const GetAllLosingItem = async (campus = "", query = "") => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_DOMAINENDPOINT}/api/losing-item/getAll?campus=${campus}&query=${query}`)
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