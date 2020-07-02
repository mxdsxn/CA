import axios from "axios";

/* baseUrl dev */
const baseUrl = axios.create({
  baseURL: "http://192.168.100.19:1111/",
});

/* baseUrl prod */
// const api = axios.create({
//   baseURL: "http://192.168.100.19:1111/",
// });

export default baseUrl;
