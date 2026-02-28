import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, LogIn, LayoutDashboard } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

export default function Header() {
  const { user, logout, setIsLoginOpen } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-lime-100 py-4 px-8 flex justify-between items-center sticky top-0 z-50 shadow-sm">
      <Link to="/" className="flex items-center gap-3 group">
        <div className="bg-gradient-to-br from-lime-500 to-emerald-600 p-2.5 rounded-xl group-hover:rotate-6 transition-transform shadow-md shadow-lime-200">
          <LayoutDashboard className="text-white" size={22} />
        </div>
        <span className="text-2xl font-black text-slate-800 tracking-tight">
          VNTU<span className="text-lime-600">BOOKING</span>
        </span>
      </Link>

      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-3">
            <Link
              to="/profile"
              className="flex items-center gap-3 bg-lime-50/50 hover:bg-lime-100 px-4 py-2 rounded-2xl transition-all border border-lime-100 group"
            >
              <div className="w-8 h-8 bg-lime-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm group-hover:scale-110 transition-transform">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="font-semibold text-slate-700 hidden md:block">
                {user.name}
              </span>
            </Link>
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
              title="Вийти"
            >
              <LogOut size={20} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsLoginOpen(true)}
            className="bg-slate-900 text-white px-7 py-2.5 rounded-2xl font-bold flex items-center gap-2 hover:bg-lime-600 transition-all active:scale-95 shadow-lg shadow-slate-200"
          >
            <LogIn size={18} /> Увійти
          </button>
        )}
      </div>
    </header>
  );
}
