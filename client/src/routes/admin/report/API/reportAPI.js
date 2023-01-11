import axios from 'axios'

export const GetReportAPI = async (startDate, endDate, campusId) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_DOMAINENDPOINT}/api/missing-item/getReport?start=${startDate}&end=${endDate}&campus=${campusId}`)
        return(res.data)
    } catch (error) {
        return error
    }
}

export const GetReportLosingAPI = async (startDate, endDate, campusId) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_DOMAINENDPOINT}/api/losing-item/getReport?start=${startDate}&end=${endDate}&campus=${campusId}`)
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