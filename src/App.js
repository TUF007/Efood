import React from 'react'
import Admin from './Admin/App'
import Guest from './Guest/App'
import User from './User/App'
import Restaurant from './Restaurant/App'
import {Route, Routes} from 'react-router-dom'
const App = () => {
  return (
   <Routes>
    <Route  path="/Admin/*" element={<Admin/>}/>
    <Route  path="/*" element={<Guest/>}/>
    <Route  path="/User/*" element={<User/>}/>
    <Route path="/Restaurant/*" element={<Restaurant/>}/>
   </Routes>
  )
}

export default App