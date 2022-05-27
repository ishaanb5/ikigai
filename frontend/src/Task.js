import PropTypes from 'prop-types'

const Task = ({ title, description, completed }) => (
  <p>{`${title} - ${description}`}</p>
)

Task.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  completed: PropTypes.bool.isRequired,
}

export default Task
