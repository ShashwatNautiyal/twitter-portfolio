import axios from "axios";
import { getDomain } from "./domain";

export const axiosInstance = axios.create({
  baseURL: `${getDomain()}/api`,
  headers: {
    Authorization: "Bearer " + process.env.NEXT_PUBLIC_STRAPI_TOKEN,
  },
});
