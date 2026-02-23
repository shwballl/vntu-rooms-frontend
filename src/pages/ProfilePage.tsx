import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, User as UserIcon, LogOut } from 'lucide-react';
import { AuthContext } from '../App';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext) || {};

  const bookings = Array(6).fill({ room: "1012", time: "12:00-12:45" });

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      <div className="flex justify-between items-center">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-200 hover:bg-gray-50 transition text-gray-700 font-medium"
        >
          <ChevronLeft size={20} />
          На головну
        </button>
        
        <button 
          onClick={() => { logout?.(); navigate('/'); }}
          className="flex items-center gap-2 text-red-600 hover:bg-red-50 px-4 py-2 rounded-xl transition"
        >
          <LogOut size={20} /> Вийти
        </button>
      </div>

      <div className="bg-gray-200 rounded-3xl p-8 shadow-lg flex flex-col md:flex-row gap-8">
        <div className="flex flex-col items-center w-full md:w-1/3 bg-white p-6 rounded-2xl shadow-sm h-fit">
          <div className="w-32 h-32 rounded-full border-4 border-gray-100 bg-gray-50 flex items-center justify-center mb-4 text-gray-400">
             <UserIcon size={64} strokeWidth={1.5} />
          </div>
          <h2 className="text-xl font-bold text-center text-gray-800">{user?.name || "Викладач"}</h2>
          <p className="text-gray-500 text-sm">Кафедра КН</p>
        </div>

        <div className="w-full md:w-2/3">
          <h3 className="text-lg font-bold text-gray-700 mb-4 px-2 border-l-4 border-green-500 pl-3">Мої бронювання</h3>
          <div className="space-y-3">
            {bookings.map((b, idx) => (
              <div key={idx} className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                <div className="flex items-center gap-4">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg font-bold text-sm">#{b.room}</span>
                    <span className="font-medium text-gray-600">12.02.2026</span>
                </div>
                <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-lg font-mono text-sm">{b.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}