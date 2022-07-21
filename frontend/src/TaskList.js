import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import InputBase from '@mui/material/InputBase'
import Task from './Task'
import taskService from './services/tasks'
import List from './List'

const TaskList = ({ listName }) => {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState({ title: '', description: '' })

  useEffect(() => {
    const getTasks = async () => {
      const intialTasks = await taskService.getAll()
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
      const savedTask = await taskService.create(newTask)

      setTasks(tasks.concat(savedTask))
      setNewTask({ title: '', description: '' })
    }
  }

  const handleDeleteTask = async (id) => {
    await taskService.remove(id)
    const updatedTasks = tasks.filter((task) => task.id !== id)
    setTasks(updatedTasks)
  }

  const handleUpdateTask = async (id, task) => {
    await taskService.update(id, task)
    const updatedTasks = tasks.map((t) => {
      if (t.id !== id) return t
      return task
    })

    setTasks(updatedTasks)
  }

  const createListItem = (task) => (
    <Task
      id={task.id}
      title={task.title}
      description={task.description}
      completed={task.completed}
      handleCompletion={handleTaskCompletion}
      handleDelete={handleDeleteTask}
      handleUpdate={handleUpdateTask}
      dueBy={task.dueBy}
    />
  )

  return (
    <section className="tasklist">
      <h1 className="tasklist__list-name">{listName}</h1>
      {tasks.length === 0 ? (
        <p>No pending tasks!</p>
      ) : (
        <div>
          <InputBase
            className="tasklist__new-task-input"
            type="text"
            value={newTask.title}
            placeholder=" + Add a new task, press Enter to save."
            onKeyDown={handleAddTask}
            onChange={(e) => setNewTask({ title: e.target.value })}
          />
          <List
            type={tasks}
            itemKey="id"
            className="list"
            createListItem={createListItem}
          />
        </div>
      )}
    </section>
  )
}

TaskList.propTypes = {
  listName: PropTypes.string.isRequired,
}

export default TaskList
