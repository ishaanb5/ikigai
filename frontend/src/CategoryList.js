import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import listService from './services/lists'
import List from './List'
import NewCategoryListModal from './NewCategoryListModal'

const CategoryList = ({ currentList, setCurrentList }) => {
  const [lists, setLists] = useState([])
  const [newList, setNewList] = useState({ name: '' })
  useEffect(() => {
    listService.getAll().then((allLists) => {
      setLists(allLists)
    })
  }, [currentList, newList])

  const saveNewList = (list) => {
    setNewList(list)
    listService.create(newList)
  }

  const createListItem = (list) => (
    <button type="button" onClick={() => setCurrentList(list)}>
      {`${list.name} #${list.remainingTasks}`}
    </button>
  )

  return (
    <section className="category-list">
      <div className="category-list__title">
        <h2>Lists</h2>
        <NewCategoryListModal saveNewList={saveNewList} />
      </div>
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
