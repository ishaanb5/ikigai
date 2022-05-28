import axios from 'axios'
const baseUrl = '/api/tasks'

const getAllTasks = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const updateTask = async (id, updatedTask) => {
  const request = await axios.put(`${baseUrl}/${id}`, updatedTask)
  return request.data
}

export default { getAllTasks, updateTask }
