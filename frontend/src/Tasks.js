import PropTypes from 'prop-types'
import Task from './Task'

const Tasks = ({ tasks }) => {
  if (tasks === []) {
    return <p>No pending tasks!</p>
  }
  return (
    <ul>
      {tasks.map((task) => (
        <li>
          <Task
            key={task.id}
            title={task.title}
            description={task.description}
            completed={task.completed}
          />
        </li>
      ))}
    </ul>
  )
}

Tasks.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      description: PropTypes.string,
      completed: PropTypes.bool,
      // eslint-disable-next-line comma-dangle
    })
  ),
}

Tasks.defaultProps = {
  tasks: [],
}

export default Tasks
