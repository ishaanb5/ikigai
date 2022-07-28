import axios from 'axios'
const baseUrl = '/api/lists'

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const getListById = async (listId) => {
  const request = await axios.get(`${baseUrl}/${listId}`)
  return request.data
}

const create = async (newList) => {
  const response = await axios.post(baseUrl, newList)

  return response.data
}

export default { getAll, getListById, create }
