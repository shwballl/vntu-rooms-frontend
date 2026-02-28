import React, { useState, useContext } from "react";
import { X, Loader2, AlertCircle, ShieldCheck } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

export default function LoginModal({ onClose }: { onClose: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const auth = useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await auth?.login(username, password);
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || "Невірний логін або пароль");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-md flex items-center justify-center z- p-4">
      <div className="bg-white rounded-[2.5rem] p-10 w-full max-w-md relative shadow-2xl border border-white/20 animate-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-black p-2 hover:bg-gray-100 rounded-full transition-all"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-3xl flex items-center justify-center mx-auto mb-4">
            <ShieldCheck size={32} />
          </div>
          <h2 className="text-3xl font-black text-gray-900">Авторизація</h2>
          <p className="text-gray-500 font-medium">
            Для викладачів та персоналу
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm border border-red-100 flex items-center gap-3 animate-pulse">
              <AlertCircle size={20} /> {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-gray-400 ml-2">
              Логін
            </label>
            <input
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all font-medium"
              placeholder="ivanov.i.i"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-gray-400 ml-2">
              Пароль
            </label>
            <input
              type="password"
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all font-medium"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-green-600 text-white p-5 rounded-2xl font-black text-lg hover:bg-green-700 transition-all shadow-xl shadow-green-100 active:scale-[0.98] disabled:bg-gray-300"
          >
            {loading ? <Loader2 className="animate-spin mx-auto" /> : "УВІЙТИ"}
          </button>
        </form>
      </div>
    </div>
  );
}
