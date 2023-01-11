import axios from 'axios';

export const getMissingStaticAPI = async (startDate, endDate) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_DOMAINENDPOINT}/api/missing-item/getStatic?start=${startDate}&end=${endDate}`)
        return (res.data)
    } catch (error) {
        return error
    }
}

export const getLosingStaticAPI = async (startDate, endDate) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_DOMAINENDPOINT}/api/losing-item/getStatic?start=${startDate}&end=${endDate}`)
        return (res.data)
    } catch (error) {
        return error
    }
}