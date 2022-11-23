import axios from "axios";

export const httpClient = axios.create({
  baseURL: `${process.env.REACT_APP_DOMAINENDPOINT}/api/`, //YOUR_API_URL HERE
});