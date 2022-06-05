import { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import DueDate from './DueDate'

const Task = ({
  id,
  title,
  completed,
  handleCompletion,
  handleDelete,
  handleUpdate,
  dueBy,
}) => {
  const [editTaskTitle, setEditTaskTitle] = useState(false)
  const [updatedTitle, setUpdatedTitle] = useState(title)
  const [dueDate, setDueDate] = useState(new Date())
  const [editDueDate, setEditDueDate] = useState(false)
  const taskTitleInputRef = useRef()

  useEffect(() => {
    if (editTaskTitle) {
      taskTitleInputRef.current.focus()
    }
  })

  return (
    <>
      <input
        className="task__checkbox"
        type="checkbox"
        checked={completed}
        id="task"
        onChange={() => handleCompletion(id)}
      />
      <span className="task__custom-checkbox" />
      {editTaskTitle ? (
        <input
          ref={taskTitleInputRef}
          value={updatedTitle}
          onChange={(e) => {
            setUpdatedTitle(e.target.value)
            handleUpdate(id, { id, completed, title: updatedTitle })
          }}
          onBlur={() => {
            handleUpdate(id, { id, completed, title: updatedTitle })
            setEditTaskTitle(false)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.target.blur()
            }
          }}
        />
      ) : (
        <span
          role="button"
          tabIndex={0}
          onClick={() => {
            setEditTaskTitle(true)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setEditTaskTitle(true)
            }
          }}
        >
          {title}-{dueBy}
        </span>
      )}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault()
          handleDelete(id)
        }}
      >
        <img src="/images/icons/dark/delete.png" alt="icon to delete tasks" />
      </button>

      <button
        type="button"
        onClick={() => {
          setEditDueDate(true)
        }}
      >
        <img
          src="/images/icons/dark/calendar.png"
          alt="icon to set due date for a task"
        />
      </button>
      {editDueDate && (
        <DueDate
          dueDate={dueDate}
          setDueDate={setDueDate}
          visible={editDueDate}
        />
      )}
    </>
  )
}

Task.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleCompletion: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  dueBy: PropTypes.objectOf(Date),
}

Task.defaultProps = {
  dueBy: null,
}

export default Task
