import axios from 'axios';

let prefix = 'http://localhost:5000/api'

const getRequest = async (endpoint, params) => {
  const headers = {
    'Content-Type': 'application/json'
  }
  const instance = axios.create({
    withCredentials: true,
    headers: headers
  })

  try {
    if (params) {
      const req = await instance.get(prefix + endpoint + '?' + params)
      return req
    } else {
      const req = await instance.get(prefix + endpoint)
      return req
    }

  } catch (err) {
    if(err.response.status === 401) {
      window.location = '/login'
    }
    console.log(err)
  }
}

const postRequest = async (endpoint, data) => {
  const headers = {
    'Content-Type': 'application/json'
  }
  const instance = axios.create({
    withCredentials: true,
    headers: headers
  })

  try {
      const req = await instance.post(prefix + endpoint, data)
      return req
  } catch (err) {
    console.log(err)
  }
}

export {getRequest, postRequest}