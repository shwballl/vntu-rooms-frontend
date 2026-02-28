import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Calendar, Clock, MapPin, Loader2 } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";

export default function ProfilePage() {
  const { user, logout, isAuthLoading } = useContext(AuthContext)!;
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await api.get("/bookings/my");
      // Бекенд тепер шле масив об'єктів
      setBookings(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthLoading) return;
    if (!user) navigate("/");
    else fetchData();
  }, [user, isAuthLoading]);

  const handleDelete = async (roomName: string) => {
    if (!confirm(`Скасувати бронювання аудиторії ${roomName}?`)) return;
    try {
      await api.delete(`/bookings/${roomName}`);
      setBookings((prev) =>
        prev.filter((b) => (b.roomName || b.name) !== roomName),
      );
    } catch (err) {
      alert("Помилка видалення");
    }
  };

  if (loading || isAuthLoading)
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <Loader2 className="animate-spin text-green-500" size={48} />
        <span className="font-bold text-gray-500">
          Завантажуємо ваш кабінет...
        </span>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Бокова панель профілю */}
        <div className="w-full md:w-80 space-y-6">
          <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-gray-100 border border-gray-100 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-3xl mx-auto mb-6 flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-green-200">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <h2 className="text-2xl font-black text-gray-800">{user?.name}</h2>
            <p className="text-gray-400 font-bold text-sm mb-6">
              Викладач ВНТУ
            </p>
            <div className="pt-6 border-t border-gray-50 flex flex-col gap-2">
              <div className="flex items-center gap-3 text-gray-500 text-sm font-bold">
                <MapPin size={18} /> Кафедра КН
              </div>
            </div>
          </div>
        </div>

        {/* Список бронювань */}
        <div className="flex-1 space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">
              Мої бронювання
            </h1>
            <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full font-black text-sm">
              Активних: {bookings.length}
            </span>
          </div>

          {bookings.length === 0 ? (
            <div className="bg-white border-2 border-dashed border-gray-200 rounded-[3rem] p-20 text-center">
              <Calendar className="mx-auto text-gray-200 mb-4" size={64} />
              <p className="text-gray-400 font-bold text-xl">
                Ви ще не забронювали жодної аудиторії
              </p>
              <button
                onClick={() => navigate("/")}
                className="mt-6 text-green-600 font-black hover:underline"
              >
                Перейти до мапи корпусів →
              </button>
            </div>
          ) : (
            <div className="grid gap-6">
              {bookings.map((b) => (
                <div
                  key={b.id}
                  className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-wrap justify-between items-center group hover:shadow-2xl hover:border-green-100 transition-all duration-300"
                >
                  <div className="flex gap-8 items-center">
                    <div className="bg-gray-900 text-white w-20 h-20 rounded-[1.5rem] flex items-center justify-center font-black text-2xl shadow-lg group-hover:bg-green-600 transition-colors">
                      {b.name || b.roomName}
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-800 font-black text-xl">
                        <Calendar size={18} className="text-green-500" />
                        {new Date(
                          b.isBookedOn || b.startsAt,
                        ).toLocaleDateString("uk-UA")}
                      </div>
                      <div className="flex items-center gap-4 text-gray-400 font-bold">
                        <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1 rounded-lg">
                          <Clock size={16} />
                          {new Date(
                            b.isBookedOn || b.startsAt,
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                          -
                          {new Date(
                            b.isBookedUntil || b.endsAt,
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(b.name || b.roomName)}
                    className="p-4 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                  >
                    <Trash2 size={28} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
