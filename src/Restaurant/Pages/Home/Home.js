import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../../DB/Firebase';
import { Typography } from '@mui/material';
const Home = () => {
    const [showrestaurant, setShowRestaurant] = useState([]);
    const restid = sessionStorage.getItem('rid');
  useEffect(() => {


    fetchRestaurant()
  }, [])


  
  const fetchRestaurant = async () => {
    const docSnap = await getDocs(query(collection(db, 'restaurant'), where('id', '==', restid)));
    const docSnap1 = await getDocs(query(collection(db,'place' )));

 if (docSnap.docs.length > 0 && docSnap1.docs.length > 0) {
      const placeData = docSnap1.docs.map((doc) => ({
        placeId: doc.id,
        ...doc.data(),
      }));
	 const restaurantData = docSnap.docs.map((doc) => ({
        restaurantId: doc.id,
        ...doc.data(),
      }));
    console.log(docSnap.docs[0].data());

     const joinedData = restaurantData
    .filter((restaurant) => placeData.some((place) => restaurant.place === place.placeId))
    .map((restaurant) => ({
      ...restaurant,
      placeInfo: placeData.find((place) => restaurant.place === place.placeId),
    }));

      console.log(joinedData);
      setShowRestaurant(joinedData);
    } else {
      console.log('No such document!');
    }

 }

return (
    <div className="home1">
      <div className="homeContainer11">
        {showrestaurant.map((row, key) => (
          <div key={key + 1} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h3" color="textSecondary" style={{ paddingTop: '270px' }}>
            WELCOME {row.name.toUpperCase()}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home