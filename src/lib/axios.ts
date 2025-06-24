import axios, { AxiosRequestConfig } from 'axios'
// import getConfig from "next/config";

const env = process.env.NODE_ENV

export function AxiosDefault(config?: AxiosRequestConfig) {
  console.log('env', env)

  return axios.create({
    baseURL: env === 'development' ? 'http://localhost:3000/api' : 'https://blog-nine-rho-52.vercel.app/api',
    timeout: 60000,
    withCredentials: true,
    ...config
  })
}

export const axiosInstance = AxiosDefault()
