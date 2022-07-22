import { useState, useEffect } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import TaskList from './TaskList'
import CategoryList from './CategoryList'
import taskService from './services/tasks'

import './index.css'

const App = () => {
  const [currentList, setCurrentList] = useState('Inbox')
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const intialTasks = await taskService.getAll()
      setTasks(intialTasks)
    }

    getTasks()
  }, [currentList])

  return (
    <>
      <CssBaseline enableColorScheme />
      <div className="homepage__container">
        <CategoryList setCurrentList={setCurrentList} />
        <TaskList listName={currentList} tasks={tasks} updateTasks={setTasks} />
      </div>
    </>
  )
}

export default App
