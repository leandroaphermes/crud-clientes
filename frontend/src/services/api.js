import axios from 'axios'

const instance = axios.create({
  baseURL: "http://localhost:3333/",
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }
})

export default instance 