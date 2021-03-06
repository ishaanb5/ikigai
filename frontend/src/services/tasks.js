import axios from 'axios'
const baseUrl = '/api/tasks'

const getAll = async () => {
  const request = await axios.get(`${baseUrl}`)
  return request.data
}

const update = async (id, updatedTask) => {
  const request = await axios.put(`${baseUrl}/${id}`, updatedTask)
  return request.data
}

const create = async (task) => {
  const request = await axios.post(baseUrl, task)
  return request.data
}

const remove = async (id) => {
  await axios.delete(`${baseUrl}/${id}`)
}

export default { getAll, create, update, remove }
