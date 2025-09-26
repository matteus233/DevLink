import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Globe from "./components/Globe";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <Globe />
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 10 }}>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="*" element={<h1>404 - Página não encontrada</h1>} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
