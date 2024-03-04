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

function App() {
  const [mode, setMode] = useState("light");
  const [search, setSearch] = useState('')
  const [searchRestaurant, setSearchRestaurant] = useState('')

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <Box bgcolor={"#FBF9F1"} color={"text.primary"}>
        <Navbar setSearch={setSearch} setSearchRestaurant={setSearchRestaurant} />
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Sidebar setMode={setMode} mode={mode} />
          <Box flex={6} p={{ xs: 0, md: 2}}>
            <Routes>
              <Route path="/Viewrestaurant" element={<Viewrestaurant searchRestaurant={searchRestaurant} />} />
              <Route path="/" element={<Feed search={search} />} />
              <Route path="/Comment" element={<Comment />} /> 
              <Route path="/Complaint" element={<Complaint />} /> 
              <Route path="/Editprofile" element={<Editprofile />} /> 
              <Route path="/Myprofile" element={<Myprofile />} /> 
              <Route path="/Changepassword" element={<Changepassword />} /> 
              <Route path="/ViewTable/:Id" element={<ViewTable />} /> 
            </Routes>
          </Box>
          <Rightbar />
        </Stack>
        <Add />
      </Box>
    </ThemeProvider>
  );

}

export default App;
