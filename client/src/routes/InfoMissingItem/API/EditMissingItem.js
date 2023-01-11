import axios from "axios"

export const getAllCampusAPI = async () => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_DOMAINENDPOINT}/api/campus`)
        return(res.data)
    } catch (error) {
        return error
    }
}

export const getBuildingByCampusIdAPI = async (campusId) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_DOMAINENDPOINT}/api/building/${campusId}`)
        return(res.data)
    } catch (error) {
        return error
    }
}

export const getRoomByBuildingIdAPI = async (buildingId) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_DOMAINENDPOINT}/api/room/${buildingId}`)
        return(res.data)
    } catch (error) {
        return error
    }
}

export const getMissingItemByIdAPI = async (id) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_DOMAINENDPOINT}/api/missing-item/get/${id}`)
        return(res.data)
    } catch (error) {
        return error
    }
}

export const getStudentByNameOrStuIdAPI = async (nameOrStuId) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_DOMAINENDPOINT}/api/users/searchStudents`, nameOrStuId)
        return(res.data)
    } catch (error) {
        return error
    }
}