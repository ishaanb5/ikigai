import axios from 'axios'
const baseUrl = '/api/tasks'

const getTasks = () => axios.get(baseUrl).then((response) => response.data)

export default { getTasks }
