import React, { useState } from 'react';
import type { FormEvent } from 'react';
import { X } from 'lucide-react';

interface LoginModalProps {
  onClose: () => void;
  onLogin: (username: string) => void;
}

export default function LoginModal({ onClose, onLogin }: LoginModalProps) {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (login && password) {
      onLogin("Викладач Іванов І.І.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-black">
          <X size={24} />
        </button>
        
        <h2 className="text-2xl font-bold mb-6 text-center">Вхід для викладачів</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Логін / Email</label>
            <input 
              type="text" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              placeholder="user@vntu.edu.ua"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
            <input 
              type="password" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition shadow-md"
          >
            Увійти
          </button>
        </form>
      </div>
    </div>
  );
}