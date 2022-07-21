import { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import DeleteIcon from '@mui/icons-material/Delete'

const Task = ({
  id,
  title,
  completed,
  handleCompletion,
  handleDelete,
  handleUpdate,
  dueBy,
}) => {
  const [editable, setEditable] = useState(false)
  const [updatedTitle, setUpdatedTitle] = useState(title)
  const inputRef = useRef()

  useEffect(() => {
    if (editable) {
      inputRef.current.focus()
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
      {editable ? (
        <input
          ref={inputRef}
          value={updatedTitle}
          onChange={(e) => {
            setUpdatedTitle(e.target.value)
            handleUpdate(id, { id, completed, title: updatedTitle })
          }}
          onBlur={() => {
            handleUpdate(id, { id, completed, title: updatedTitle })
            setEditable(false)
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
            setEditable(true)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setEditable(true)
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
        <DeleteIcon fill="red" />
      </button>
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
