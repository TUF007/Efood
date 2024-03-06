import { Avatar, Box, Card,  Typography, } from "@mui/material";
import React, { useEffect } from "react";

const Rightbar = ({ fetchFoodForBooking, CardData }) => {
  console.log(CardData);


  useEffect(() => {
    fetchFoodForBooking()
  }, [])

  return (
    <Box flex={2} p={2} sx={{ display: { xs: "none", sm: "block", backgroundColor: "#FBF9F1" } }}>
      {/* <Card position="fixed" width={350} display="flex" flexDirection="column" gap="10px" >
        <Typography variant="h5" fontWeight={500} textAlign={'center'} sx={{ p: 3 }}>
          Cart
        </Typography>
        {
          CardData.map((data, key) => (
            <Card key={key} sx={{ p: 3, backgroundColor: 'lavender', display: 'flex', justifyContent: 'space-between', alignItems: 'center', m: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Avatar src={data.foodDetails.photo} />
                <Box>
                  {
                    data.foodDetails.name
                  }
                </Box>
              </Box>
              <Box>
                {
                  data.foodDetails.foodprice
                }
              </Box>
            </Card>
          ))
        }

      </Card> */}
    </Box>
  );
};

export default Rightbar;