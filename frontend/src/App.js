import { useState } from 'react'
import TaskList from './TaskList'
import CategoryList from './CategoryList'

import './index.css'

const App = () => {
  const [currentList, setCurrentList] = useState('All Tasks')
  return (
    <div className="homepage__container">
      <CategoryList setCurrentList={setCurrentList} />
      <TaskList listName={currentList} />
    </div>
  )
}

export default App
