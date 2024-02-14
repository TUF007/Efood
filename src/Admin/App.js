import React from 'react'
import District from './Pages/District/District'
import Home from './Pages/Home/Home'
import Place from './Pages/Place/Place'
import Category from './Pages/Category/Category'
import Subcategory from './Pages/Place/Place'
import Foodtype from './Pages/Foodtype/Foodtype'
import Sidebar from './Components/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import "./Style/dark.css";
import "../Admin/Pages/Home/Home.css"
import { useContext } from "react";
import { DarkModeContext } from "./Context/DarkModeContext";
import Navbar from './Components/Navbar/Navbar'
import Viewrestaurant from './Pages/Viewrestaurant/Viewrestaurant'
import Viewcomplaint from './Pages/Viewcomplaint/Viewcomplaint'
const App = () => {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/District' element={<District />} />
            <Route path='/Place' element={<Place />} />
            <Route path='/Category' element={<Category />} />
            <Route path='/Subcategory' element={<Subcategory />} />
            <Route path='/Foodtype' element={<Foodtype />} />
            <Route path='/viewrestaurant' element={<Viewrestaurant />} />
            <Route path='/viewcomplaint' element={<Viewcomplaint />} />
          </Routes>
        </div>
      </div>


    </div>
  )
}

export default App