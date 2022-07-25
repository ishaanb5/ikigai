import { useState } from 'react'
import PropTypes from 'prop-types'
import InputBase from '@mui/material/InputBase'
import Task from './Task'
import List from './List'

const TaskList = ({
  tasks,
  currentList,
  handleTaskCompletion,
  handleAddTask,
  handleDeleteTask,
  handleUpdateTask,
}) => {
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
  })

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

  const addTask = async ({ code }) => {
    if (code === 'Enter') {
      await handleAddTask(code, newTask)
      setNewTask({ title: '', description: '' })
    }
  }

  return (
    <section className="tasklist">
      <h1 className="tasklist__list-name">{currentList.name}</h1>
      <InputBase
        className="tasklist__new-task-input"
        type="text"
        value={newTask.title}
        placeholder=" + Add a new task, press Enter to save."
        onKeyDown={addTask}
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
  tasks: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
      completed: PropTypes.bool,
      dueBy: PropTypes.instanceOf(Date),
      list: PropTypes.exact({
        id: PropTypes.string,
        name: PropTypes.string,
      }),
    }),
  ),
  currentList: PropTypes.exact({
    name: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
  handleTaskCompletion: PropTypes.func.isRequired,
  handleAddTask: PropTypes.func.isRequired,
  handleDeleteTask: PropTypes.func.isRequired,
  handleUpdateTask: PropTypes.func.isRequired,
}

TaskList.defaultProps = {
  tasks: [],
}

export default TaskList
