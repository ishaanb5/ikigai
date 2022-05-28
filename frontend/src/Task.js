import PropTypes from 'prop-types'

const Task = ({ id, title, description, completed, onChange }) => (
  <>
    <input
      type="checkbox"
      checked={completed}
      id="task"
      onChange={() => onChange(id)}
    />
    <span>{`${title} - ${description}`}</span>
  </>
)

Task.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
}

export default Task
