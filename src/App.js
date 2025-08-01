import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import { useSelector } from "react-redux";
import Loader from "./components/Loader";
import "./styles/custom-components.css";
import "./styles/layout.css";
import AppliedJobs from "./pages/user/AppliedJobs";
import Profile from "./pages/user/profile";
import PostedJobsPage from "./pages/user/postes-jobs";
import NewEditJob from "./pages/user/postes-jobs/NewEditJob";

function App() {
  const { loading } = useSelector((state) => state.alert);

  return (
    <div>
      {loading && <Loader />}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/applied-jobs"
            element={
              <ProtectedRoute>
                <AppliedJobs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/posted-jobs"
            element={
              <ProtectedRoute>
                <PostedJobsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/posted-jobs/new"
            element={
              <ProtectedRoute>
                <NewEditJob />
              </ProtectedRoute>
            }
          />
          <Route
            path="/posted-jobs/edit/:id"
            element={
              <ProtectedRoute>
                <NewEditJob />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default App;
