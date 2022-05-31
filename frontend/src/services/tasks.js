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

const createTask = async (task) => {
  const request = await axios.post(baseUrl, task)
  return request.data
}

const deleteTask = async (id) => {
  await axios.delete(`${baseUrl}/${id}`)
}

export default { getAllTasks, createTask, updateTask, deleteTask }
