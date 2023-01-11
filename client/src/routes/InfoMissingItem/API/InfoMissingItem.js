import axios from "axios"

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