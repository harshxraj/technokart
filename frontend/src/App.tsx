import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import HomePage from "./pages/Homepage";

function App() {
  const token = localStorage.getItem("token");

  return (
    <>
      <Routes>
        <Route path="/" element={token ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/register" element={token ? <Navigate to="/" /> : <Register />} />
        <Route path="/login" element={token ? <Navigate to="/" /> : <Login />} />
      </Routes>
    </>
  );
}

export default App;
