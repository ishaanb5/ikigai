import PropTypes from 'prop-types'
import Calendar from 'react-widgets/Calendar'

const DueDate = ({ dueDate, setDueDate }) => (
  <Calendar
    value={dueDate}
    onChange={(date) => {
      setDueDate(date)
    }}
  />
)

export default DueDate

DueDate.propTypes = {
  dueDate: PropTypes.instanceOf(Date).isRequired,
  setDueDate: PropTypes.func.isRequired,
}
