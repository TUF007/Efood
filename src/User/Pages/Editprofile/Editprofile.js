import { Box, Button, TextField, Typography } from '@mui/material'
import React from 'react'

const Editprofile = () => {
  return (
    <Box sx={{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"column",
         width:"650px",
         height:"600px",
        margin:"auto",
        marginTop:"40px",
        border:"1px solid black", 
         boxShadow:"7px",
         borderRadius:"10px",  

    }}>
        <Box sx={{
            fontSize:"10px",
            display:"flex",
            flexDirection:"column",
            gap:"10px",
            marginBottom:"120px",
            mt:"120px"
        }}>
          <Typography  variant="h4" color="text.secondary" style={{marginBottom:"50px"}}>
                        Edit Profile
                    </Typography>

        <h1 style={{fontSize:"18px"}}>Name</h1>
        <TextField id="outlined-basic" sx={{ width: 500,maxWidth: '100%' }} variant="outlined" />
        
        <h1 style={{fontSize:"18px"}}>Title</h1>
        <TextField id="outlined-basic" sx={{ width: 500,maxWidth: '100%'  }} variant="outlined" />
        
        <h1 style={{fontSize:"18px"}}>Email</h1>
        <TextField id="outlined-basic" sx={{ width: 500,maxWidth: '100%'}} variant="outlined" />
        <Box sx={{
          display:"flex",
          mt:"20px",
          justifyContent:"center",
        }}>
        <Button variant="contained" sx={{width:"120px", height:"40px",borderRadius:"20px", '&:hover': {backgroundColor: "darkblue",transform: 'scale(1.05)' }}}>Save</Button>
        </Box>
        </Box>
    </Box>
  )
}

export default Editprofile