import { useState } from 'react'
import PropTypes from 'prop-types'

import InputBase from '@mui/material/InputBase'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import SortIcon from '@mui/icons-material/Sort'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

import Task from './Task'

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

  const renderedTasks = tasks.map((task) => (
    <ListItem key={task.id}>
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
    </ListItem>
  ))

  const addTask = async ({ code }) => {
    if (code === 'Enter') {
      await handleAddTask(code, newTask)
      setNewTask({ title: '', description: '' })
    }
  }

  return (
    <section className="tasklist">
      <List className="list">
        <div className="tasklist__heading">
          <div className="container-1">
            <MenuOpenIcon sx={{ fontSize: '30px' }} color="secondary" />
            <h1 className="tasklist__list-name">{currentList.name}</h1>
          </div>
          <div className="container-2">
            <SortIcon fontSize="small" color="secondary" />
            <MoreHorizIcon fontSize="small" color="secondary" />
          </div>
        </div>
        <span>
          <InputBase
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
            fullWidth
            sx={{
              padding: '5px',
              backgroundColor: 'background.paper',
              borderRadius: '4px',
            }}
          />
        </span>
        {tasks.length === 0 ? <p>No pending tasks!</p> : renderedTasks}
      </List>
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
