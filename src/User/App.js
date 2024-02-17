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

function App() {
  const [mode, setMode] = useState("light");
  const [search, setSearch] = useState('')

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <Box bgcolor={"background.default"} color={"text.primary"}>
        <Navbar setSearch={setSearch} />
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Sidebar setMode={setMode} mode={mode} />
          <Box flex={6} p={{ xs: 0, md: 2}}>
            <Routes>
              <Route path="/Viewrestaurant" element={<Viewrestaurant />} />
              <Route path="/" element={<Feed search={search} />} />
              <Route path="/Comment" element={<Comment />} /> 
              <Route path="/Complaint" element={<Complaint />} /> 
              <Route path="/Editprofile" element={<Editprofile />} /> 
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
