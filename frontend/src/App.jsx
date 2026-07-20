import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from './Layouts/MainLayout'


function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
     <Route path="/" element={<MainLayout />}>
     </Route>
    </Routes>
  )
}

export default App