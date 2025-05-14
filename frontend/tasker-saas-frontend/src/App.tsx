import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login"; // adjust path if needed
import SignUpPage from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import Profile from "./pages/Profile";
import EditProfilePage from "./pages/EditProfilePage";

const App = () => {
  return (
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/signup" element={<SignUpPage/>}></Route>
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}></Route>
            <Route path="/tasks" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/team" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/chat" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
            <Route path="/setting" element={<ProtectedRoute><EditProfilePage/></ProtectedRoute>}/>
          </Routes>
        </BrowserRouter>
  );
};

export default App;
