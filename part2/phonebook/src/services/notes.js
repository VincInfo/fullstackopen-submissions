import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  // return axios.get(baseUrl)
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  // return axios.post(baseUrl, newObject)
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  // return axios.put(`${baseUrl}/${id}`, newObject)
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const deletePerson = id => {
  // return axios.delete(`${baseUrl}/${id}`)
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

export default { getAll, create, update, deletePerson }