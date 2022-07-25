import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import AddIcon from '@mui/icons-material/Add'
import listService from './services/lists'
import List from './List'

const CategoryList = ({ currentList, setCurrentList }) => {
  const [lists, setLists] = useState([])
  useEffect(() => {
    listService.getAll().then((allLists) => {
      setLists(allLists)
    })
  }, [currentList])

  const createListItem = (list) => (
    <button type="button" onClick={() => setCurrentList(list)}>
      {`${list.name} #${list.remainingTasks}`}
    </button>
  )

  return (
    <section className="category-list">
      <h2>Lists</h2>
      <AddIcon />
      <List type={lists} itemKey="id" createListItem={createListItem} />
    </section>
  )
}

CategoryList.propTypes = {
  currentList: PropTypes.exact({
    remainingTasks: PropTypes.number,
    totalTasks: PropTypes.number,
  }),
  setCurrentList: PropTypes.func.isRequired,
}

CategoryList.defaultProps = {
  currentList: {},
}

export default CategoryList
