import { useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import TaskList from './TaskList'
import CategoryList from './CategoryList'

import './index.css'

const App = () => {
  const [currentList, setCurrentList] = useState({ name: 'Inbox' })

  return (
    <>
      <CssBaseline enableColorScheme />
      <div className="homepage__container">
        <CategoryList
          currentList={currentList}
          setCurrentList={setCurrentList}
        />
        <TaskList
          currentList={currentList}
          updateCurrentList={setCurrentList}
        />
      </div>
    </>
  )
}

export default App
