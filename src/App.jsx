import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import Tasks from "./pages/Tasks/Tasks";
import Profile from "./pages/Profile/Profile";
import SingleTask from "./pages/Tasks/SingleTask";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/tasks/:id" element={<SingleTask />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
