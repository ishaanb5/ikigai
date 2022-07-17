import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import listService from './services/lists'
import List from './List'

const Lists = ({ setCurrentList }) => {
  const [lists, setLists] = useState([])

  useEffect(() => {
    listService.getAll().then((allLists) => {
      setLists(allLists)
    })
  }, [])

  const createListItem = (list) => (
    <button type="button" onClick={() => setCurrentList(list.name)}>
      {`${list.name} #${list.totalTasks}`}
    </button>
  )

  return (
    <div>
      <h2>Lists</h2>
      <List type={lists} listKey="id" createListItem={createListItem} />
    </div>
  )
}

Lists.propTypes = {
  setCurrentList: PropTypes.func.isRequired,
}

export default Lists
