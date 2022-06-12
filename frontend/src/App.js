import { useState, useEffect } from 'react'
import TasksList from './TasksList'
import Lists from './Lists'
import listService from './services/lists'

import './index.css'
import 'react-widgets/styles.css'

const App = () => {
  const [currentList, setCurrentList] = useState({})

  useEffect(() => {
    listService.getById('inbox').then((list) => setCurrentList(list))
  }, [])

  return (
    <>
      <Lists setCurrentList={setCurrentList} />
      <TasksList
        listName={currentList.name}
        listId={currentList.id}
        listTasks={currentList.tasks}
      />
    </>
  )
}

export default App
