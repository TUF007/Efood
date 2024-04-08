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
const App = () => {
  return (
    <div className={ "app"}>
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          <Routes>
            <Route path='/Home' element={<Home />} />
            <Route path="/Food" element={<Food />} />
            <Route path="/Menu" element={<Menu />} />
            <Route path="/Tables" element={<Table />} />
            <Route path="/Booking" element={<Booking />} />
          </Routes>
        </div>
      </div>


    </div>
  )
}

export default App