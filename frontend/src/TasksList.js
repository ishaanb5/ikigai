import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Task from './Task'
import taskService from './services/tasks'

const Tasks = ({ listName, listId, listTasks }) => {
  const [tasks, setTasks] = useState(listTasks)
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    completed: false,
    listId,
  })

  useEffect(() => {
    setTasks(listTasks)
  }, [listTasks])

  const handleTaskCompletion = (id) => {
    const task = tasks.find((t) => t.id === id)
    const updatedTask = { ...task, completed: !task.completed }

    taskService.update(id, updatedTask)
    setTasks(
      tasks.map((t) => {
        if (t.id === id) return { ...task, completed: !t.completed }
        return t
      }),
    )
  }

  const handleAddTask = async (e) => {
    if (e.code === 'Enter') {
      const savedTask = await taskService.create(listId, newTask)

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

  return (
    <div className="tasklist">
      <h1 className="tasklist__list-name">{listName}</h1>
      {tasks.length === 0 ? (
        <p>No pending tasks!</p>
      ) : (
        <div>
          <input
            className="tasklist__new-task-input"
            type="text"
            value={newTask.title}
            placeholder=" + Add a new task, press Enter to save."
            onKeyDown={handleAddTask}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
          <ul className="tasklist__list">
            {tasks.map((task) => (
              <li key={task.id} className="task">
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
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

Tasks.propTypes = {
  listName: PropTypes.string,
  listId: PropTypes.string,
  listTasks: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      completed: PropTypes.bool,
      dueBy: PropTypes.string,
      list: PropTypes.string,
    }),
  ),
}

Tasks.defaultProps = {
  listName: '',
  listId: '',
  listTasks: [],
}

export default Tasks
