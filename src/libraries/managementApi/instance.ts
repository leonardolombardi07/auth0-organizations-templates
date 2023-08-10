import { getAccessToken } from "@auth0/nextjs-auth0";
import axios from "axios";

const ApiInstance = axios.create({
  baseURL: "https://dev-ciflld2i45pu8eff.us.auth0.com",
  headers: {
    "content-type": "application/json",
  },
});

ApiInstance.interceptors.request.use(
  async (config) => {
    const { accessToken } = await getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default ApiInstance;
