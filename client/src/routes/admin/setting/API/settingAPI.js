import axios from 'axios'

export const GetAllSetting = async () => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_DOMAINENDPOINT}/api/other-setting`)
        return(res.data)
    } catch (error) {
        return error
    }
}