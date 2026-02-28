import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import Header from "./components/Header";
import LoginModal from "./components/LoginModal";
import HomePage from "./pages/HomePage";
import BookingPage from "./pages/BookingPage";
import ProfilePage from "./pages/ProfilePage";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-[#FDFDFD] text-gray-900 font-sans selection:bg-green-100 selection:text-green-900">
          <Header />
          <main className="pb-20">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/booking/:roomId" element={<BookingPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <AuthConsumer />
        </div>
      </Router>
    </AuthProvider>
  );
}

function AuthConsumer() {
  const { isLoginOpen, setIsLoginOpen } = React.useContext(AuthContext);
  return isLoginOpen ? (
    <LoginModal onClose={() => setIsLoginOpen(false)} />
  ) : null;
}
