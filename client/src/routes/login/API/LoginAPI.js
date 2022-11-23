import axios from "axios";

export const LoginAPI = async (payload) => {
    try {
        let res = await axios
            .post(
                `${process.env.REACT_APP_DOMAINENDPOINT}/api/auth/signin`,
                payload
            )
            .then((res) => {
                return res;
            })
            .catch((error) => {
                return error.response;
            });
        return res;
    } catch (error) {
        return error
    }
};