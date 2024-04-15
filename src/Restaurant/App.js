import React from 'react'
import Food from './Pages/Food/Food'
import Menu from './Pages/Menu/Menu'
import Table from './Pages/Tables/Tables'
import Home from './Pages/Home/Home'
import Sidebar from './Components/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import "../Restaurant/Pages/Home/Home.css"
import Navbar from './Components/Navbar/Navbar'
import Booking from './Pages/Booking/Booking'
import Myprofile from './Pages/Myprofile/Myprofile'
import { Box } from '@mui/material'
import ViewFood from './Pages/ViewFood/ViewFood'
const App = () => {
  return (
    <div className={ "app"}>
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          <Box sx={{overflowY:'scroll',height:600}}>


          <Routes>
            <Route path='/Home' element={<Home />} />
            <Route path="/Food" element={<Food />} />
            <Route path="/Menu" element={<Menu />} />
            <Route path="/Tables" element={<Table />} />
            <Route path="/Booking" element={<Booking />} />
            <Route path="/Myprofile" element={<Myprofile />} />
            <Route path="/ViewFood/:Id" element={<ViewFood />} />
          </Routes>
          </Box>
        </div>
      </div>


    </div>
  )
}

export default App