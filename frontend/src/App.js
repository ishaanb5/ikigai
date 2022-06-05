import React, { useState } from 'react'
import TasksList from './TasksList'

import './index.css'
import 'react-widgets/styles.css'

const App = () => {
  const [listName] = useState('All Tasks')
  return <TasksList listName={listName} />
}

export default App
