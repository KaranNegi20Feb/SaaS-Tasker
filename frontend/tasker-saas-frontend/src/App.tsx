import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login"; // adjust path if needed
import SignUpPage from "./pages/SignUp";

const App = () => {
  return (
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/signup" element={<SignUpPage/>}></Route>
          </Routes>
        </BrowserRouter>
  );
};

export default App;
