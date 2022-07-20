import { useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import TaskList from './TaskList'
import CategoryList from './CategoryList'

import './index.css'

const App = () => {
  const [currentList, setCurrentList] = useState('All Tasks')
  return (
    <>
      <CssBaseline enableColorScheme />
      <div className="homepage__container">
        <CategoryList setCurrentList={setCurrentList} />
        <TaskList listName={currentList} />
      </div>
    </>
  )
}

export default App
