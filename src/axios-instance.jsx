import axios from "axios";
export const api = axios.create({
  baseURL: 'https://64f71de99d77540849531e37.mockapi.io/',
  headers: {
    'Content-type': 'application/json',
  },
})