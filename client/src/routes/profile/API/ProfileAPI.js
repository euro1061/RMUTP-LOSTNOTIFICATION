import axios from "axios"

export const getAllPrefix = async () => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_DOMAINENDPOINT}/api/prefix`)
        return (res.data)
    } catch (error) {
        return error
    }
}

export const getAllDepartment = async () => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_DOMAINENDPOINT}/api/department`)
        return (res.data)
    } catch (error) {
        return error
    }
}