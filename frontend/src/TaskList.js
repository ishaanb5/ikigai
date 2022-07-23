import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import InputBase from '@mui/material/InputBase'
import taskService from './services/tasks'
import listService from './services/lists'
import Task from './Task'
import List from './List'

const TaskList = ({ currentList, updateCurrentList }) => {
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
  })
  const [tasks, setTasks] = useState([])

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
      updateCurrentList({
        ...currentList,
        remainingTasks: currentList.remainingTasks + 1,
        totalTasks: currentList.totalTasks + 1,
      })

      console.log('updated current list after adding task', {
        ...currentList,
        remainingTasks: currentList.remainingTasks + 1,
        totalTasks: currentList.totalTasks + 1,
      })
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
      {console.log('tasklist was rendered')}
      <h1 className="tasklist__list-name">{currentList.name}</h1>
      <InputBase
        className="tasklist__new-task-input"
        type="text"
        value={newTask.title}
        placeholder=" + Add a new task, press Enter to save."
        onKeyDown={handleAddTask}
        onChange={(e) =>
          setNewTask((prevState) => ({
            ...prevState,
            title: e.target.value,
            listId: currentList.id,
          }))
        }
      />
      {tasks.length === 0 ? (
        <p>No pending tasks!</p>
      ) : (
        <List
          type={tasks}
          itemKey="id"
          className="list"
          createListItem={createListItem}
        />
      )}
    </section>
  )
}

TaskList.propTypes = {
  currentList: PropTypes.objectOf({
    name: PropTypes.string,
    tasks: PropTypes.arrayOf(
      PropTypes.objectOf({
        title: PropTypes.string,
        description: PropTypes.string,
        completed: PropTypes.bool,
        dueBy: PropTypes.instanceOf(Date),
        list: PropTypes.string,
      }),
    ),
    editable: PropTypes.bool,
  }).isRequired,
  updateCurrentList: PropTypes.func.isRequired,
}

export default TaskList
