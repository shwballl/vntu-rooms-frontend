import React, { useContext } from 'react';
import { User, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';

export default function Header() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  if (!authContext) {
    return null;
  }

  const { user, setIsLoginOpen, logout } = authContext;

  return (
    <header className="bg-gray-300 py-4 px-8 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-semibold text-gray-800 tracking-wide">
          VNTU-Rooms
        </Link>
        
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/profile')}>
              <span className="text-sm font-medium hidden sm:block">{user.name}</span>
              <div className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center bg-transparent">
                <User size={24} />
              </div>
            </div>
          ) : (
            <button 
              onClick={() => setIsLoginOpen(true)}
              className="flex items-center gap-2 hover:bg-gray-400/20 px-3 py-2 rounded-lg transition"
            >
              <div className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center">
                <User size={24} />
              </div>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}