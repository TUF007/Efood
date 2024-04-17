import React, { useEffect, useState } from 'react'
import "./Menu.css";
import { db } from '../../../DB/Firebase';
import { collection, addDoc, query, getDocs, deleteDoc, doc, updateDoc, getDoc, where } from 'firebase/firestore'
import { Paper, Box, TextField, Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material/';


const Menu = () => {


  const MenuCollection = collection(db, 'menu');
  const [menu, setMenu] = useState('');
  const [showmenu, setShowmenu] = useState([]);
  const [updatemenuID, setupdateMenuID] = useState('');
  const restid = sessionStorage.getItem('rid');

  useEffect(() => {


    fetchData()
  }, [])


  const fetchData = async () => {

    const docSnap = await getDocs(query(collection(db, 'menu'),where('restaurant_id', '==', restid)));
    if (docSnap.docs.length > 0) {
      const data = docSnap.docs.map((doc) => ({
        propertyId: doc.id,
        ...doc.data(),
      }));
      console.log(data);
      setShowmenu(data);
    } else {
      console.log('No such document!');
    }



  }

  const InsertData = async (Id) => {
    const data = {
      menu,
      restaurant_id: restid,
    }

    if (Id) {
      await updateDoc(doc(db, "menu", Id), data);
      fetchData();
      setMenu('');
      setupdateMenuID('');
    }
    else {
      const response = await addDoc(MenuCollection, data)
      console.log(response);
      fetchData()
      setMenu('');
      setupdateMenuID('');
    }


  }

  const fetchUpdatedata = async (id) => {
    const docRef = doc(db, 'menu', id);

    try {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = {
          propertyId: docSnap.id,
          ...docSnap.data(),
        };
        console.log(data);
        const value = data.menu;
        const Id = data.propertyId;
        setMenu(value);
        setupdateMenuID(Id)

      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error getting document:', error);
    }

  }

  const Deletedata = async (id) => {

    await deleteDoc(doc(db, "menu", id));
    fetchData();
  }

  return (
    <>
      <Box className='menucontainer'>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Paper elevation={6} className='menupaper' >
            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <div style={{ marginRight: '25px' }}>
                <TextField id="outlined-basic" label="Menu" variant="outlined" value={menu} onChange={(event) => setMenu(event.target.value)} />
              </div>

            </Box>
            <div>
              <Stack direction="row" spacing={2}>
                <Button variant="contained" style={{ marginRight: '43px' }} className='menusub' onClick={() => InsertData(updatemenuID)}>submit</Button>
              </Stack>
            </div>
          </Paper >
        </div>
        <Box
          display="flex"
          justifyContent="center"
          marginTop="100px"

        >
          <Paper style={{ marginBottom: '50px' }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Sl. No.</TableCell>
                    <TableCell>Menu</TableCell>
                    <TableCell align='center' >Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {showmenu.map((row, key) => (
                    <TableRow
                      key={key + 1}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {key + 1}
                      </TableCell>
                      <TableCell sx={{width:250}}>{row.menu}</TableCell>
                      <TableCell align='center' ><Button onClick={() => Deletedata(row.propertyId)}>Delete</Button>
                        <Button onClick={() => fetchUpdatedata(row.propertyId)}>Update</Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>

      </Box>

    </>
  )
}

export default Menu