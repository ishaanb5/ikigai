import axios from 'axios'
const baseUrl = '/api/lists'

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const getById = async (listId) => {
  const request = await axios.get(`${baseUrl}/${listId}`)
  return request.data
}

export default { getAll, getById }
