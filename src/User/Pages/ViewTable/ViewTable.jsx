import React, { useEffect, useState } from 'react'
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import { Box } from '@mui/material';
import { db } from '../../../DB/Firebase';

import { useParams } from 'react-router-dom';
import { collection, getDocs, query } from 'firebase/firestore';
const ViewTable = () => {
    const [tables,setTables] = useState([])
    const {Id } = useParams()


    const fetchTable = async (id) => {
        const docSnap = await getDocs(query(collection(db, 'table')));

        if (docSnap.docs.length > 0) {
        const tableData = docSnap.docs.map((doc) => ({
            tableId: doc.id,
            ...doc.data(),
          }));

        //   const filteredPosts = tableData.filter((table) =>
        // table.name.toLowerCase().startsWith(searchRestaurant.toLowerCase())
      // );
      console.log(tableData);
      setTables(tableData);
    } else {
      console.log('No such document!');
    }



  }
    useEffect(() => { 
        fetchTable(Id)
    },[])
  return (
  <Box>
    {

    }
  </Box>
  )
}

export default ViewTable