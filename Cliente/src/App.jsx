import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Plants from "./pages/Plants";
import Community from "./pages/Community";
import Reminders from "./pages/Reminders";
import Support from "./pages/Support";
import About from "./pages/About";
import Register from "./pages/Register";
import PlantSearch from "./pages/PlantSearch";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/plants" element={<Plants />} />
        <Route path="/community" element={<Community />} />
        <Route path="/reminders" element={<Reminders />} />
        <Route path="/support" element={<Support />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/plantdb" element={<PlantSearch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
