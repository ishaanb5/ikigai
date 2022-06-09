import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import listService from './services/lists'

const Lists = ({ setCurrentList }) => {
  const [lists, setLists] = useState([])

  useEffect(() => {
    listService.getAll().then((allLists) => {
      setLists(allLists)
    })
  }, [])
  return (
    <div>
      <h2>Lists</h2>
      <ul>
        {lists.map((list) => (
          <li key={list.id}>
            <button type="button" onClick={() => setCurrentList(list.name)}>
              {`${list.name} #${list.totalTasks}`}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

Lists.propTypes = {
  setCurrentList: PropTypes.func.isRequired,
}

export default Lists
