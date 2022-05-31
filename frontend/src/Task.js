import PropTypes from 'prop-types'

const Task = ({
  id,
  title,
  description,
  completed,
  onChange,
  handleDelete,
}) => (
  <>
    <input
      type="checkbox"
      checked={completed}
      id="task"
      onChange={() => onChange(id)}
    />
    <span>{`${title} - ${description}`}</span>
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault()
        handleDelete(id)
      }}
    >
      <img src="/images/icons/dark/delete.png" alt="icon to delete tasks" />
    </button>
  </>
)

Task.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
}

export default Task
