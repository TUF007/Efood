import React from 'react'
import Userregistration from './Userregistration/Userregistration'
import Login from "./Login/Login"
import Restregistration from './Restregistration/Restregistration'
import {Route, Routes} from 'react-router-dom'

const App = () => {
  return (
    <Routes>
      <Route path="/Userregistration" element={<Userregistration/>} />
      <Route path="/Login" element={<Login/>}/>
      <Route path="/Restregistration" element={<Restregistration/>}/>
    </Routes>
  )
}

export default App