import Sidebar from "./Components/Sidebar";
import Feed from "./Components/Feed";
import Rightbar from "./Components/Rightbar";
import Viewrestaurant from "./Pages/Viewrestaurant/Viewrestaurant";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import Navbar from "./Components/Navbar";
import Add from "./Components/Add";
import Comment from "./Components/Comment";
import Complaint from "./Pages/Complaint/Complaint";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Editprofile from "./Pages/Editprofile/Editprofile";
import Myprofile from "./Pages/Myprofile/Myprofile";
import Changepassword from "./Pages/ChangePassword/Changepassword"
import ViewTable from "./Pages/ViewTable/ViewTable";
import ViewMenu from "./Pages/ViewMenu/ViewMenu";
import { db } from "../DB/Firebase";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import ViewCart from "./Components/ViewCart";
import Payment from "./Pages/Payment/Payment";
import Booking from "./Pages/Booking/Booking";
import Liked from "./Pages/Liked/Liked";
import Feedback from "./Pages/Feedback/Feedback";


function App() {
  const [mode, setMode] = useState("light");
  const [search, setSearch] = useState('')
  const [searchRestaurant, setSearchRestaurant] = useState('')
  const [CardData, setCartData] = useState([])

  const Uid = sessionStorage.getItem('uid')

  const fetchFoodForBooking = async () => {
    const BookingCollection = collection(db, 'booking');
    const CartCollection = collection(db, 'cart');
    const FoodCollection = collection(db, 'food'); // Assuming the name of the collection is 'food'

    // Find the booking with status 0 for the specified user
    const existingBookingQuery = query(BookingCollection, where('userId', '==', Uid), where('status', '==', 0));
    const existingBookingSnapshot = await getDocs(existingBookingQuery);

    if (existingBookingSnapshot.size > 0) {
        // If an existing booking is found, get its bookingId
        const existingBooking = existingBookingSnapshot.docs[0];
        const bookingId = existingBooking.id;

        // Fetch all food items associated with the bookingId
        const cartQuery = query(CartCollection, where('bookingId', '==', bookingId));
        const cartSnapshot = await getDocs(cartQuery);

        const foodItems = cartSnapshot.docs.map(async (cartDoc) => {
            const cartData = cartDoc.data();

            // Fetch details of each food item from the 'food' collection
            const foodDoc = await getDoc(doc(FoodCollection, cartData.foodId));

            if (foodDoc.exists()) {
                const foodData = foodDoc.data();
                return {
                    foodId: cartData.foodId,
                    cartItemId: cartDoc.id,
                    foodDetails: foodData
                };
            }

            return null; // Handle the case where food details are not found
        });

        // Wait for all promises to resolve
        const resolvedFoodItems = await Promise.all(foodItems);
        setCartData(resolvedFoodItems)
        console.log(resolvedFoodItems);
        // return resolvedFoodItems.filter(item => item !== null); // Filter out null values
    } else {
        console.log("No booking with status 0 found");
        return [];
    }
}


  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <Box bgcolor={"#FBF9F1"} color={"text.primary"} >
        <Navbar setSearch={setSearch} setSearchRestaurant={setSearchRestaurant} />
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Sidebar setMode={setMode} mode={mode} />
          <Box flex={6}  bgcolor={"#FBF9F1"} sx={{height:600,overflowY:'scroll'}}>
           
            <Routes>
              <Route path="/Viewrestaurant" element={<Viewrestaurant searchRestaurant={searchRestaurant} />} />
              <Route path="/" element={<Feed search={search} />} />
              <Route path="/Comment" element={<Comment />} /> 
              <Route path="/Complaint" element={<Complaint />} /> 
              <Route path="/Editprofile" element={<Editprofile />} /> 
              <Route path="/Myprofile" element={<Myprofile />} /> 
              <Route path="/Changepassword" element={<Changepassword />} /> 
              <Route path="/ViewTable/:Id" element={<ViewTable />} /> 
              <Route path="/ViewMenu/:Tid" element={<ViewMenu  fetchFoodForBooking={fetchFoodForBooking}/>} /> 
              <Route path="/ViewCart" element={<ViewCart  />} /> 
              <Route path="/Payment/:Bid" element={<Payment />} /> 
              <Route path="/Payment/:Bid" element={<Payment />} /> 
              <Route path="/Booking" element={<Booking />} /> 
              <Route path="/Liked" element={<Liked />} /> 
              <Route path="/Feedback" element={<Feedback />} /> 
            </Routes>
          </Box>
          {
            CardData &&  <Rightbar fetchFoodForBooking={fetchFoodForBooking} CardData={CardData}/>

          }
        </Stack>
        <Add />
      </Box>
    </ThemeProvider>
  );

}

export default App;
