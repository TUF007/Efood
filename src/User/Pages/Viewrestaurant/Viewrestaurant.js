import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../../DB/Firebase';
import { Avatar, Box, Button, Card, CardContent, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { Link } from 'react-router-dom';
const Viewrestaurant = ({searchRestaurant}) => {
  const [showrestaurant, setShowRestaurant] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showdistrict, setShowDistrict] = useState([]);
  const [place, setPlace] = useState('');
  const [showplace, setShowPlace] = useState([]);
  const [district, setDistrict] = useState('');

  const fetchRestaurant = async () => {
    const docSnap = await getDocs(query(collection(db, 'restaurant')));
    const docSnap1 = await getDocs(query(collection(db, 'place')));
    const docSnap2 = await getDocs(query(collection(db, 'district')))

    if (docSnap.docs.length > 0 && docSnap1.docs.length > 0 && docSnap2.docs.length > 0) {
      const placeData = docSnap1.docs.map((doc) => ({
        placeId: doc.id,
        ...doc.data(),
      }));
      const restaurantData = docSnap.docs.map((doc) => ({
        restaurantId: doc.id,
        ...doc.data(),
      }));
      const districtData = docSnap2.docs.map((doc) => ({
        districtId: doc.id,
        ...doc.data(),
      }));
      const joinedData = restaurantData
        .filter((restaurant) => placeData.some((place) => restaurant.place === place.placeId))

        .map((restaurant) => ({
          ...restaurant,
          placeInfo: placeData.find((place) => restaurant.place === place.placeId),
        }));
        console.log(joinedData);

        const filteredPosts = joinedData.filter((restaurant) =>
        restaurant.name.toLowerCase().startsWith(searchRestaurant.toLowerCase())
      );

      setShowRestaurant(filteredPosts);
      console.log(joinedData);
    } else {
      console.log('No such document!');
    }
  };




  const fetchRestaurantDistrict = async (Did) => {
    const docSnap = await getDocs(query(collection(db, 'restaurant')));
    const docSnap1 = await getDocs(query(collection(db, 'place')));
  
    if (docSnap.docs.length > 0 && docSnap1.docs.length > 0) {
      const restaurantData = docSnap.docs.map((doc) => ({
        restaurantId: doc.id,
        ...doc.data(),
      }));
  
      const placeData = docSnap1.docs.map((doc) => ({
        placeId: doc.id,
        ...doc.data(),
      }));
  
      const filteredData = restaurantData
        .filter((restaurant) => {
          const place = placeData.find(place => place.placeId === restaurant.place);
          return place && place.district === Did;
        })
        .map((restaurant) => ({
          ...restaurant,
          placeInfo: {
            ...placeData.find((place) => restaurant.place === place.placeId),
          },
        }));
  
      setShowRestaurant(filteredData);
      console.log(filteredData);
    } else {
      console.log('No such document!');
    }
  };
  

  const fetchRestaurantPlace = async (placeId) => {
    const docSnap = await getDocs(query(collection(db, 'restaurant')));
    const docSnap1 = await getDocs(query(collection(db, 'place')));
  
    if (docSnap.docs.length > 0 && docSnap1.docs.length > 0) {
      const placeData = docSnap1.docs.map((doc) => ({
        placeId: doc.id,
        ...doc.data(),
      }));
      const restaurantData = docSnap.docs.map((doc) => ({
        restaurantId: doc.id,
        ...doc.data(),
      }));
  
      const joinedData = restaurantData
        .filter((restaurant) => placeData.some((place) => restaurant.place === place.placeId))
        .filter((restaurant) => restaurant.place === placeId)
        .map((restaurant) => ({
          ...restaurant,
          placeInfo: {
            ...placeData.find((place) => restaurant.place === place.placeId),
          },
        }));
  
      setShowRestaurant(joinedData);
      console.log(joinedData);
    } else {
      console.log('No such document!');
    }
  };
  
  const handleSearch = () => {
    const filteredData = showrestaurant.filter(
      (restaurant) =>
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.placeInfo.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    // Update the state with filtered data
    setShowRestaurant(filteredData);
  };

  const fetchDistrict = async () => {

    const docSnap = await getDocs(query(collection(db, 'district')));
    console.log(docSnap.docs[0].data());

    if (docSnap.docs.length > 0) {
      const datadistrict = docSnap.docs.map((doc) => ({
        propertyId: doc.id,
        ...doc.data(),
      }));
      console.log(datadistrict);
      setShowDistrict(datadistrict);
    } else {
      console.log('No such document!');
    }



  }

  const fetchPlace = async (id) => {
    const placeDocs = await getDocs(query(collection(db, 'place'), where('district', '==', id)));

    if (placeDocs.docs.length > 0) {
      const dataplace = placeDocs.docs.map((doc) => ({
        propertyId: doc.id,
        ...doc.data(),
      }));
      console.log(dataplace);
      setShowPlace(dataplace);
    } else {
      console.log('No such document!');
    }



  }




  useEffect(() => {

    fetchRestaurant();

    fetchDistrict()
  }, [searchRestaurant])
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <FormControl fullWidth style={{ borderRadius: '8px', marginRight: '10px' }}>
          <InputLabel id="demo-simple-select-label">District</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="district-simple-select"
            value={district}
            label="District"
            onChange={(event) => {
              fetchPlace(event.target.value)
              setDistrict(event.target.value)
              fetchRestaurantDistrict(event.target.value)
            }}
            style={{ borderRadius: '8px' }}
          >
            {
              showdistrict.map((row, key) => (
                <MenuItem key={key} value={row.propertyId} >{row.district}</MenuItem>
              ))
            }
          </Select>
        </FormControl>

        <FormControl fullWidth style={{ borderRadius: '8px', marginLeft: '10px' }}>
          <InputLabel id="demo-simple-select-label">Place</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="place-simple-select"
            value={place}
            label="Place"
            onChange={(event) => {
               setPlace(event.target.value) 
              fetchRestaurantPlace(event.target.value)


            }}
            style={{ borderRadius: '8px' }}
          >
            {
              showplace.map((row, key) => (
                <MenuItem key={key} value={row.propertyId} >{row.place}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </div>



      <Box
        display="flex"
        justifyContent="center"
        marginTop="100px"
      >
        <Grid container spacing={3}>
          {showrestaurant.map((row, key) => (
            <Grid key={key + 1} item xs={12} sm={6} md={4}>
              <Card style={{ marginBottom: '20px', width: '100%', height: '500px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
                <CardContent>
                  <Avatar
                    src={row.photo}
                    style={{ width: '100%', height: '300px', marginBottom: '20px', borderRadius: '0' }}
                  />
                  <Typography variant="h5" component="div">
                    {row.name}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    {row.email}
                  </Typography>
                  <Typography color="textSecondary">
                    Place: {row.placeInfo.place}
                  </Typography>
                </CardContent>
                <Link to={`/User/ViewTable/${row.restaurantId}`} >

                <Button variant="contained" style={{ marginLeft: '130px' }}>
                  Book<RestaurantIcon />
                </Button>
                </Link>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>

  );
}

export default Viewrestaurant