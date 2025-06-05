import axios, { AxiosRequestConfig } from 'axios'
// import getConfig from "next/config";

export function AxiosDefault(config?: AxiosRequestConfig) {
  return axios.create({
    baseURL: 'https://blog-nine-rho-52.vercel.appupda/api',
    timeout: 60000,
    withCredentials: true,
    ...config
  })
}

export const axiosInstance = AxiosDefault()
