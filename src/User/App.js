import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";
import Rightbar from "./components/Rightbar";
import Viewrestaurant from "./Viewrestaurant";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import Navbar from "./components/Navbar";
import Add from "./components/Add";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";

function App() {
  const [mode, setMode] = useState("light");

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <Box bgcolor={"background.default"} color={"text.primary"}>
        <Navbar />
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Sidebar setMode={setMode} mode={mode} />
          <Box flex={6} p={{ xs: 0, md: 2 }}>
            <Routes>
              <Route path="/Viewrestaurant" element={<Viewrestaurant />} />
              <Route path="/" element={<Feed />} />
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
