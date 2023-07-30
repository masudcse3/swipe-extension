/** @format */

import axios from "axios";
// import { Notify } from "./Notify";

const axiosInterceptor = axios.create({
  baseURL:
    // "https://app.swipeswipe.co/",
    "http://localhost:3002/",
  timeout: 10000

 
});


const requestHandler = (request:any) => {
  // Token will be dynamic so we can use any app-specific way to always
  // fetch the new token before making the call
  const access_token = localStorage.getItem("token");
  request.headers.Accept = "application/json";
  if (access_token && access_token !== "undefined") {
    request.headers.Authorization = `${access_token}`;
  }
  return request;
};

const responseHandler = (response:any) => {
  if (response.status === 401) {
  }
  if (response.status === 200) {
    return response.data;
  }
  return response;
};

const errorHandler = (error:any) => {
  if (error.response?.status === 400) {
    if (error.response.data) {
      error.response.data.errors.map((obj:any) => {
        // Notify.error(obj.message);
        return null;
      });
    }
  }
  if(error.response?.data.message == 'Invalid Token'){
    
    // history.push("/login")
    window.location.assign('/login');
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("loginuser");
    
  }
  return Promise.reject(error);
};

axiosInterceptor.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);

axiosInterceptor.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

export default axiosInterceptor;