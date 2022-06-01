import { useState, useEffect } from 'react'
import Task from './Task'
import taskService from './services/tasks'

const Tasks = () => {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState({ title: '', description: '' })

  useEffect(() => {
    const getTasks = async () => {
      const intialTasks = await taskService.getAllTasks()
      setTasks(intialTasks)
    }

    getTasks()
  }, [])

  const handleTaskCompletion = (id) => {
    const task = tasks.find((t) => t.id === id)
    const updatedTask = { ...task, completed: !task.completed }

    taskService.updateTask(id, updatedTask)
    setTasks(
      tasks.map((t) => {
        if (t.id === id) return { ...task, completed: !t.completed }
        return t
      }),
    )
  }

  const handleAddTask = async (e) => {
    if (e.code === 'Enter') {
      const savedTask = await taskService.createTask(newTask)

      setTasks(tasks.concat(savedTask))
      setNewTask({ title: '', description: '' })
    }
  }

  const handleDeleteTask = async (id) => {
    await taskService.deleteTask(id)
    const updatedTasks = tasks.filter((task) => task.id !== id)
    setTasks(updatedTasks)
  }

  const handleUpdateTask = async (id, task) => {
    await taskService.updateTask(id, task)
    const updatedTasks = tasks.map((t) => {
      if (t.id !== id) return t
      return task
    })

    setTasks(updatedTasks)
  }

  return tasks.length === 0 ? (
    <p>No pending tasks!</p>
  ) : (
    <ul>
      <input
        type="text"
        value={newTask.title}
        placeholder="Add a new task. Press enter to save"
        onKeyDown={handleAddTask}
        onChange={(e) => setNewTask({ title: e.target.value })}
      />
      {tasks.map((task) => (
        <li key={task.id}>
          <Task
            id={task.id}
            title={task.title}
            description={task.description}
            completed={task.completed}
            handleCompletion={handleTaskCompletion}
            handleDelete={handleDeleteTask}
            handleUpdate={handleUpdateTask}
          />
        </li>
      ))}
    </ul>
  )
}

export default Tasks
