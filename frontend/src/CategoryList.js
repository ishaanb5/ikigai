import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import AddIcon from '@mui/icons-material/Add'
import listService from './services/lists'
import List from './List'

const CategoryList = ({ currentList, setCurrentList }) => {
  const [lists, setLists] = useState([])
  console.log('category list was rendered', currentList)
  useEffect(() => {
    listService.getAll().then((allLists) => {
      setLists(allLists)
    })
  }, [])

  const createListItem = (list) => (
    <button type="button" onClick={() => setCurrentList(list)}>
      {`${list.name} #${list.remainingTasks}`}
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
  currentList: PropTypes.objectOf({
    name: PropTypes.string,
    tasks: PropTypes.arrayOf(
      PropTypes.objectOf({
        title: PropTypes.string,
        description: PropTypes.string,
        completed: PropTypes.bool,
        dueBy: PropTypes.instanceOf(Date),
        list: PropTypes.string,
      }),
    ),
    editable: PropTypes.bool,
  }).isRequired,
  setCurrentList: PropTypes.func.isRequired,
}

export default CategoryList
