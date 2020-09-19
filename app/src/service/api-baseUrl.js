import axios from 'axios'

const baseUrl = axios.create({
  baseURL: 'http://192.168.0.10:1111',
})

export default baseUrl
