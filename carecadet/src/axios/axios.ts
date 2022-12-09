import axios, { AxiosRequestConfig } from "axios";

import Cookies from "js-cookie";

import { store } from "../Redux/Store";



export const axiosPrivate = axios.create({
  baseURL: "http://localhost:5200",
});


axiosPrivate.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    const tokenData = store.getState();
    // console.log(store1)
    config.headers = config.headers || {};
    config.headers["authorization"] = tokenData.auth.login.token;
    // console.info(`[request] [${JSON.stringify(config)}]`);
    return config;
  }
);
// axiosPrivate.interceptors.response.use(
//   (res) => res.data,
//   (err) => {
//     console.log(err.response.statusText)
//   //   if (err.response) {
//   //     return Promise.reject(err.response.data);
//   //   }

//   //   if (err.request) {
//   //     return Promise.reject(err.request);
//   //   }

//   //   return Promise.reject(err.message);
//    }
// );
// //axiosPrivate.interceptors.request.use((res) => {res.data});
// let checkToken;
// export const check = () => {
//   let token = Cookies.get("token");
//   console.log(token);
//   checkToken = token;
// };