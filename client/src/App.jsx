import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import DashboardLayout from "./components/DashboardLayout";
import Home from "./components/Home";
import EmployeeList from "./components/EmployeeList";
import { useSelector } from "react-redux";

const App = () => {
  const token = useSelector((state) => state.auth.token); // Get token from Redux state

  const ProtectedRoute = ({ children }) => {
    return token ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            token ? <Navigate to="/dashboard/home" /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/login"
          element={token ? <Navigate to="/dashboard/home" /> : <Login />}
        />

        {/* Dashboard layout with nested routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="home" element={<Home />} />
          <Route path="employees" element={<EmployeeList />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
