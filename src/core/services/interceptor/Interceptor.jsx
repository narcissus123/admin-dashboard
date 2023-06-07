import axios from "axios";
import { getItem } from "../storage/Storage";
import { Config } from "../../../config/Config";
const baseURL = Config.baseUrl;

const instance = axios.create({
  baseURL,
});

//Response interceptor
instance.interceptors.response.use(
  (response) => {
    //Handling 2xx status code, successful responses.
    return response;
  },
  (error) => {
    //Handling status codes outside the range of 2xx, client error responses.
    const expectedError =
      error.response &&
      error.response.state >= 400 &&
      error.response.status < 500;
    if (!expectedError) {
      const token = getItem("token");

      return error.response;
    }

    //Handling server error responses.
    return Promise.reject(error);
  }
);

//Request interceptor
instance.interceptors.request.use(
  (config) => {
    //Setting token before request is sent
    const token = getItem("token");

    if (token) {
      config.headers["x-auth-token"] = token;
    }
    return config;
  },
  (error) => {
    //Handling request error
    return Promise.reject(error);
  }
);

export { instance };
