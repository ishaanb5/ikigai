import PropTypes from 'prop-types'

const List = ({ type, createListItem, itemKey }) => (
  <ul>
    {type.map((item) => (
      <li key={item[itemKey]} className="list__list-item">
        {createListItem(item)}
      </li>
    ))}
  </ul>
)

List.propTypes = {
  itemKey: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  type: PropTypes.arrayOf(PropTypes.object).isRequired,
  createListItem: PropTypes.func.isRequired,
}

export default List
