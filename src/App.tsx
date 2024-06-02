import { ForecastPage } from "./components/forecast/ForecastPage";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { FavoriteCities } from "./components/favorite-cities/FavoriteCities";
import { AppBar } from "@mui/material";
import { Navbar } from "./components/navbar/Navbar";
import { isArray } from "util";



function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Navigate to={"/forecast"} />} />
          <Route path="/forecast" element={<ForecastPage />} />
          <Route path="/favorite-cities" element={<FavoriteCities />} />
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;

