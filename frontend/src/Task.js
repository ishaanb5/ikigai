import { useState } from 'react'
import PropTypes from 'prop-types'

import Divider from '@mui/material/Divider'
import InputBase from '@mui/material/InputBase'

import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import Checkbox from '@mui/material/Checkbox'
import ListItemIcon from '@mui/material/ListItemIcon'
// import DeleteIcon from '@mui/icons-material/Delete'

const Task = ({
  id,
  title,
  completed,
  handleCompletion,
  // handleDelete,
  handleUpdate,
  // dueBy,
}) => {
  const [updatedTitle, setUpdatedTitle] = useState(title)

  return (
    // secondary action for displaying due date
    <ListItem disablePadding>
      <ListItemButton onClick={() => handleCompletion(id)}>
        <ListItemIcon>
          <Checkbox
            edge="start"
            disableRipple
            checked={completed}
            tabIndex={-1}
            disablePadding
          />
        </ListItemIcon>
      </ListItemButton>

      <div className="task-info">
        <InputBase
          fullWidth
          value={updatedTitle}
          onChange={(e) => {
            setUpdatedTitle(e.target.value)
            handleUpdate(id, { id, completed, title: updatedTitle })
          }}
          onBlur={() => {
            handleUpdate(id, { id, completed, title: updatedTitle })
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.target.blur()
            }
          }}
        />
        {/* <button
        type="button"
        onClick={() => {
          handleDelete(id, completed)
        }}
      >
        <DeleteIcon fill="red" />
      </button> */}
        <Divider />
      </div>
    </ListItem>
  )
}

Task.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  // handleDelete: PropTypes.func.isRequired,
  handleCompletion: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  // dueBy: PropTypes.objectOf(Date),
}

// Task.defaultProps = {
//   dueBy: null,
// }

export default Task
