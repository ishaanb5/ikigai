import { useState } from 'react'
import TasksList from './TasksList'
import Lists from './Lists'

import './index.css'

const App = () => {
  const [currentList, setCurrentList] = useState('All Tasks')
  return (
    <>
      <Lists setCurrentList={setCurrentList} />
      <TasksList listName={currentList} />
    </>
  )
}

export default App
