import axios from 'axios'

const baseUrl = axios.create({
  baseURL: 'http://localhost:1111',
})

export default baseUrl
