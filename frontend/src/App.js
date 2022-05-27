import React, { useState, useEffect } from 'react'
import Tasks from './Tasks'
import taskService from './services/tasks'
import './index.css'

const App = () => {
  const { tasks, setTasks } = useState([])
  useEffect(() => {
    setTasks(taskService.getTasks())
  }, [setTasks])
  return (
    <>
      <h1>Ikigai</h1>
      <Tasks tasks={tasks} />
    </>
  )
}

export default App
