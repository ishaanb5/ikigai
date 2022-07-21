import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import AddIcon from '@mui/icons-material/Add'
import listService from './services/lists'
import List from './List'

const CategoryList = ({ setCurrentList }) => {
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
    <section className="category-list">
      <h2>Lists</h2>
      <AddIcon />
      <List type={lists} listKey="id" createListItem={createListItem} />
    </section>
  )
}

CategoryList.propTypes = {
  setCurrentList: PropTypes.func.isRequired,
}

export default CategoryList
