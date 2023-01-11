import axios from "axios"

export const GetAllCampusAPI = async () => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_DOMAINENDPOINT}/api/campus`)
        return(res.data)
    } catch (error) {
        return error
    }
}

export const CreateCampusAPI = async (request) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_DOMAINENDPOINT}/api/campus/create`, request)
        return(res.data)
    } catch (error) {
        return error
    }
}

export const UpdateCampusAPI = async (campusId, request) => {
    try {
        const res = await axios.patch(`${process.env.REACT_APP_DOMAINENDPOINT}/api/campus/update/${campusId}`, request)
        return(res.data)
    } catch (error) {
        return error
    }
}

export const DeleteCampusAPI = async (campusId) => {
    try {
        const res = await axios.delete(`${process.env.REACT_APP_DOMAINENDPOINT}/api/campus/delete/${campusId}`)
        return (res.data)
    } catch (error) {
        return error
    }
}

export const GetBuildingByCampusIdAPI = async (campusId) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_DOMAINENDPOINT}/api/building/${campusId}`)
        return (res.data)
    } catch (error) {
        return error
    }
}

export const CreateBuildingAPI = async (request) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_DOMAINENDPOINT}/api/building/create`, request)
        return(res.data)
    } catch (error) {
        return error
    }
}

export const DeleteBuildingAPI = async (buildingId) => {
    try {
        const res = await axios.delete(`${process.env.REACT_APP_DOMAINENDPOINT}/api/building/delete/${buildingId}`)
        return (res.data)
    } catch (error) {
        return error
    }
}

export const UpdateBuildingAPI = async (buildingId, request) => {
    try {
        const res = await axios.patch(`${process.env.REACT_APP_DOMAINENDPOINT}/api/building/update/${buildingId}`, request)
        return(res.data)
    } catch (error) {
        return error
    }
}

export const GetRoomByBuildingIdAPI = async (buildingId) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_DOMAINENDPOINT}/api/room/${buildingId}`)
        return (res.data)
    } catch (error) {
        return error
    }
}

export const CreateRoomAPI = async (request) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_DOMAINENDPOINT}/api/room/create`, request)
        return(res.data)
    } catch (error) {
        return error
    }
}

export const DeleteRoomAPI = async (roomId) => {
    try {
        const res = await axios.delete(`${process.env.REACT_APP_DOMAINENDPOINT}/api/room/delete/${roomId}`)
        return (res.data)
    } catch (error) {
        return error
    }
}

export const UpdateRoomAPI = async (roomId, request) => {
    try {
        const res = await axios.patch(`${process.env.REACT_APP_DOMAINENDPOINT}/api/room/update/${roomId}`, request)
        return(res.data)
    } catch (error) {
        return error
    }
}