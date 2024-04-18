import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, Card, CardContent, Stack, TextField } from '@mui/material';
import './Payment.css';
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { useNavigate, useParams } from 'react-router-dom';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../DB/Firebase';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Payment = () => {
  const navigate = useNavigate();
  const { Bid } = useParams();
  const [value, setValue] = React.useState(0);
  const [orderId, setOrderId] = useState("");
  const [course, setCourse] = useState([]);
  const [user, setUser] = useState([]);
  const [booking, setBooking] = useState([]);
  const [state, setState] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    focus: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (e) => {
    setState((prev) => ({ ...prev, focus: e.target.name }));
  };

  const updateStatus = async () => {
    const docRef = doc(db, 'booking', Bid);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = {
          propertyId: docSnap.id,
          ...docSnap.data(),
        };
        console.log('Existing data:', data);
        const updatedData = {
          ...data,
          status: 2,
        };
        console.log('Updated data:', updatedData);
        await updateDoc(docRef, updatedData);
        alert('payment done');
        console.log('Document updated successfully.');
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  return (
    <Box className="userCheckout" sx={{ width: '100%' }}>
      <CustomTabPanel value={value} index={0}>
        <Box sx={{ width: "100%", minHeight: "50vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Card sx={{ width: "900px", height: "700px" }}>
            <CardContent>
              <Typography sx={{ color: "#003f88", fontWeight: "bold", fontSize: "30px", textAlign: "center", mt: 3 }} variant='h4'>CHECKOUT</Typography>
              <Typography sx={{ color: "gray", fontSize: "12px", textAlign: "center" }}>Secure Card Payments</Typography>
              <Box>
                <Box sx={{ mt: 2, width: "100%" }}>
                  <Cards
                    number={state.number}
                    expiry={state.expiry}
                    cvc={state.cvc}
                    name={state.name}
                    focused={state.focus}
                  />
                  <div className="mt-3">
                    <form>
                      <TextField
                        sx={{ mt: 3 }}
                        type="number"
                        name="number"
                        className="form-control"
                        placeholder="Card Number"
                        value={state.number}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        required
                        variant='outlined'
                        fullWidth
                      />
                      <TextField
                        sx={{ mt: 3 }}
                        fullWidth
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Name"
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        required
                      />
                      <Stack direction={"row"} spacing={3} mt={3} sx={{ justifyContent: "center" }}>
                        <TextField
                          type="number"
                          name="expiry"
                          className="form-control"
                          placeholder="Valid Thru"
                          pattern="\d\d/\d\d"
                          value={state.expiry}
                          onChange={handleInputChange}
                          onFocus={handleInputFocus}
                          required
                        />
                        <TextField
                          type="text"
                          name="cvc"
                          className="form-control"
                          placeholder="CVC"
                          pattern="\d{3,4}"
                          value={state.cvc}
                          onChange={handleInputChange}
                          onFocus={handleInputFocus}
                          required
                        />
                      </Stack>
                      <Button
                        type='button' // Change the type to 'button' to prevent form submission
                        variant='outlined'
                        sx={{ margin: "0 auto", display: "block", mt: 3, px: 5, fontSize: "18px" }}
                        onClick={() => updateStatus()} // Call the updateStatus function on button click
                      >
                        Pay Now
                      </Button>
                    </form>
                  </div>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </CustomTabPanel>
    </Box>
  );
};

export default Payment;
