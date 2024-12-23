
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import {  useNavigate } from "react-router-dom";


const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_CLIENT_PORT}`,
  // baseURL: 'http://localhost:1000',


  withCredentials: true
});

const useAxiosSecure = () => {
    const { signOutUser } = useContext(AuthContext);
    const navigate = useNavigate();
  
  useEffect(() => {
 
    const interceptor = axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
     
        console.error("Error response:", error);
        signOutUser();
        navigate("/login"); 
        return Promise.reject(error);
       
      }
    );

    // Cleanup function to remove the interceptor on unmount
    return () => {
      axiosInstance.interceptors.response.eject(interceptor);
    };
  }, []);

  return axiosInstance;
};

export default useAxiosSecure;
