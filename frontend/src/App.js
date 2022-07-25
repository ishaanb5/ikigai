import { useState, useEffect } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import taskService from './services/tasks'
import listService from './services/lists'
import TaskList from './TaskList'
import CategoryList from './CategoryList'

import './index.css'

const App = () => {
  const [tasks, setTasks] = useState([])
  const [currentList, setCurrentList] = useState({ name: 'Inbox' })

  useEffect(() => {
    const getTasks = async () => {
      if (currentList.name === 'Inbox') {
        const intialTasks = await taskService.getAll()
        setTasks(intialTasks)
      } else {
        const list = await listService.getListById(currentList.id)
        setTasks(list.tasks)
      }
    }

    getTasks()
  }, [currentList.name, currentList.id])

  const handleTaskCompletion = (id) => {
    const task = tasks.find((t) => t.id === id)
    const updatedTask = {
      ...task,
      completed: !task.completed,
      list: task.list.id,
    }

    taskService.update(id, updatedTask)
    setTasks(
      tasks.map((t) => {
        if (t.id === id) {
          return { ...task, completed: !t.completed }
        }
        return t
      }),
    )

    setCurrentList((prevState) => ({
      ...prevState,
      remainingTasks: updatedTask.completed
        ? prevState.remainingTasks - 1
        : prevState.remainingTasks + 1,
    }))
  }

  const handleAddTask = async (keyCode, newTask) => {
    const savedTask = await taskService.create(newTask)
    setTasks(tasks.concat(savedTask))
    setCurrentList((prevState) => ({
      ...prevState,
      remainingTasks: prevState.remainingTasks + 1,
      totalTasks: prevState.totalTasks + 1,
    }))
  }

  const handleDeleteTask = async (id, completed) => {
    await taskService.remove(id)
    const updatedTasks = tasks.filter((task) => task.id !== id)
    setTasks(updatedTasks)
    setCurrentList((prevState) => ({
      ...prevState,
      remainingTasks: completed
        ? prevState.remainingTasks
        : prevState.remainingTasks - 1,
      totalTasks: prevState.totalTasks - 1,
    }))
  }

  const handleUpdateTask = async (id, updatedTask) => {
    await taskService.update(id, updatedTask)
    const updatedTasks = tasks.map((t) => {
      if (t.id !== id) return t
      return updatedTask
    })

    setTasks(updatedTasks)
  }

  return (
    <>
      {console.log('currentList', currentList)}
      <CssBaseline enableColorScheme />
      <div className="homepage__container">
        <CategoryList
          currentList={{
            totalTasks: currentList.totalTasks,
            remainingTasks: currentList.remainingTasks,
          }}
          setCurrentList={setCurrentList}
        />
        <TaskList
          tasks={tasks}
          currentList={{ name: currentList.name, id: currentList.id }}
          handleTaskCompletion={handleTaskCompletion}
          handleAddTask={handleAddTask}
          handleDeleteTask={handleDeleteTask}
          handleUpdateTask={handleUpdateTask}
        />
      </div>
    </>
  )
}

export default App
