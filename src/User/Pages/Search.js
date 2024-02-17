// import React, { useEffect, useState } from 'react'
// import { TextField, Typography } from '@mui/material';
// import { collection, getDocs, query } from 'firebase/firestore';
// import { db } from '../../DB/Firebase';
// const Search = () => {
//     const [showpost, setShowpost] = useState([]);
//     const fetchData = async () => {

//         const docSnap = await getDocs(query(collection(db, 'post')));
//         if (docSnap.docs.length > 0) {
//           const data = docSnap.docs.map((doc) => ({
//             propertyId: doc.id,
//             ...doc.data(),
//           }));
//           console.log(data);
//           setShowpost(data);
//         } else {
//           console.log('No such document!');
//         }
    
    
    
//       }
//       useEffect(() => {


//         fetchData()
//       }, [])


//       const handleSearch = (event) => {
        
//         const filteredPosts = showpost.filter((post) =>
//         post.title.toLowerCase().startsWith(event.toLowerCase())
//       );
//       console.log(filteredPosts);
//       };
    
    
    
//   return (
//   <div>
//     <div>
//     <TextField
//         required
//         id="standard-required"
//         label="Search"
//         type='text'
//         variant="standard"
//     />
// </div>
// <div>
// <Typography>showpost</Typography>
// </div>

// </div>
//   )
// }

// export default Search