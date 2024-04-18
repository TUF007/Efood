import React from 'react'
import District from './Pages/District/District'
import Home from './Pages/Home/Home'
import Place from './Pages/Place/Place'
import Category from './Pages/Category/Category'
import Subcategory from './Pages/Place/Place'
import Foodtype from './Pages/Foodtype/Foodtype'
import Sidebar from './Components/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import "../Admin/Pages/Home/Home.css"
import Navbar from './Components/Navbar/Navbar'
import Viewrestaurant from './Pages/Viewrestaurant/Viewrestaurant'
import Viewuser from './Pages/Viewuser/Viewuser'
import Viewcomplaint from './Pages/Viewcomplaint/Viewcomplaint'
import { Box } from '@mui/material'
import Post from './Pages/Post/Post'
import Viewfeedback from './Pages/Viewfeedback/Viewfeedback'
const App = () => {
 
  return (
    <div className={ "app"}>
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          <Box sx={{overflowY:'scroll',height:600}}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/District' element={<District />} />
            <Route path='/Place' element={<Place />} />
            <Route path='/Category' element={<Category />} />
            <Route path='/Foodtype' element={<Foodtype />} />
            <Route path='/viewrestaurant' element={<Viewrestaurant />} />
            <Route path='/viewuser' element={<Viewuser />} />
            <Route path='/viewcomplaint' element={<Viewcomplaint />} />
            <Route path='/viewfeedback' element={<Viewfeedback />} />
            <Route path='/post' element={<Post />} />
          </Routes>
          </Box>
        </div>
      </div>


    </div>
  )
}

export default App