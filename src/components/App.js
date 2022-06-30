import { useState} from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import Login from "./Login.js";
import Signup from "./Signup";
import Home from "./Home";
import "../assets/css/reset.css";

export default function App() { 
  const [token, setToken] = useState('');
  const [name, setName] = useState('');

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ token, setToken, name, setName }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>

  );
}
