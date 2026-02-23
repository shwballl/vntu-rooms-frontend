import React, { useState, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import LoginModal from './components/LoginModal';
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import ProfilePage from './pages/ProfilePage';
import type { User } from './types';

interface AuthContextType {
  user: User | null;
  login: (username: string) => void;
  logout: () => void;
  setIsLoginOpen: (isOpen: boolean) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);

  const login = (username: string) => {
    setUser({ 
      id: '1', 
      name: username, 
      email: 'teacher@vntu.edu.ua', 
      department: 'teacher' 
    });
    setIsLoginOpen(false);
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, setIsLoginOpen }}>
      <Router>
        <div className="min-h-screen bg-gray-100 text-gray-800 font-sans">
          <Header />
          <main className="p-6 max-w-7xl mx-auto">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/booking/:roomId" element={<BookingPage />} />
              <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/" />} />
            </Routes>
          </main>
          
          {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} onLogin={login} />}
        </div>
      </Router>
    </AuthContext.Provider>
  );
}