import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar"; // <-- REMOVE THIS LINE
import Home from "./pages/Home";
import { AuthProvider } from "./context/AuthContext";

// Placeholders
const Login = () => <div className="text-center mt-20">Login Page</div>;
const Register = () => <div className="text-center mt-20">Register Page</div>;
const SubmitApi = () => <div className="text-center mt-20">Submit Form</div>;

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen bg-[#FDFDFD] font-sans text-gray-900">
          {/* Navbar removed from here because it's inside Home.jsx now */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/submit" element={<SubmitApi />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
