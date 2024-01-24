import { Avatar, Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import "./Myprofile.css";
const Myprofile = () => {
    return (
        <Paper elevation={3} className='myprocontainer' >
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Paper elevation={6} className='mypropaper' >
                    <div className='root'>
                        <Stack direction="row" spacing={2}>
                            <Avatar className='avatar' src="/broken-image.jpg" />
                        </Stack>
                        <Typography variant="h5">
                            Bharath S
                        </Typography>
                        <Typography variant="subtitle1">
                            bharaths9061@gmail.com
                        </Typography>
                        <Typography variant="subtitle1">
                            9061253966
                        </Typography>
                        <Typography variant="body1">
                            "I hope one day you will be reunited with the one you cherish"
                        </Typography>
                    </div>
                </Paper>
            </div>
        </Paper>
    )
}

export default Myprofile