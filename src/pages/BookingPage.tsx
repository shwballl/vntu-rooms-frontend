import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  ChevronLeft,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import api from "../api/axios";

// Константи часу та дат
const TIMES = [
  "12:00-12:45",
  "13:00-13:45",
  "14:00-14:45",
  "15:00-15:45",
  "16:00-16:45",
];
const DATES = Array.from({ length: 7 }, (_, i) => {
  const d = new Date();
  d.setDate(d.getDate() + i);
  return d.toLocaleDateString("uk-UA").replace(/\./g, "/");
});

export default function BookingPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [bookedSlots, setBookedSlots] = useState<any[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ендпоінт: GET /rooms/:name
    api
      .get(`/rooms/${roomId}`)
      .then((res) => {
        const roomData = res.data;
        // Оскільки в моделі Room у тебе поля isBookedOn/isBookedUntil,
        // ми перетворюємо їх на масив, який розуміє фронтенд
        if (roomData && roomData.isBookedOn) {
          setBookedSlots([
            {
              startsAt: roomData.isBookedOn,
              endsAt: roomData.isBookedUntil,
            },
          ]);
        } else {
          setBookedSlots([]);
        }
      })
      .catch((err) => console.error("Помилка завантаження розкладу:", err))
      .finally(() => setLoading(false));
  }, [roomId]);

  const getSlotStatus = (dateStr: string, timeStr: string) => {
    const isOccupied = bookedSlots.some((b) => {
      const bDate = new Date(b.startsAt)
        .toLocaleDateString("uk-UA")
        .replace(/\./g, "/");
      const bTime = `${new Date(b.startsAt).getHours()}:${String(new Date(b.startsAt).getMinutes()).padStart(2, "0")}-${new Date(b.endsAt).getHours()}:${String(new Date(b.endsAt).getMinutes()).padStart(2, "0")}`;
      return bDate === dateStr && bTime === timeStr;
    });

    if (isOccupied) return "occupied";
    if (selectedSlot?.date === dateStr && selectedSlot?.time === timeStr)
      return "selected";
    return "free";
  };

  const handleConfirm = async () => {
    if (!selectedSlot) return;
    try {
      const [day, month, year] = selectedSlot.date.split("/");
      const [start, end] = selectedSlot.time.split("-");

      // Відправляємо саме ті поля, які чекає твій BookingsService:
      // room_name, booking_start_time, booking_end_time
      await api.post("/bookings", {
        room_name: roomId,
        booking_start_time: new Date(
          `${year}-${month}-${day}T${start}:00`,
        ).toISOString(),
        booking_end_time: new Date(
          `${year}-${month}-${day}T${end}:00`,
        ).toISOString(),
      });
      navigate("/profile");
    } catch (err: any) {
      alert(
        err.response?.data?.message ||
          "Це місце вже зайняте або сталась помилка.",
      );
    }
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <Loader2 className="animate-spin text-green-600 mb-4" size={48} />
        <p className="text-gray-500 font-bold">
          Оновлюємо розклад аудиторії...
        </p>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto py-12 px-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-400 hover:text-gray-900 transition-colors mb-10 font-bold group"
      >
        <ChevronLeft className="group-hover:-translate-x-1 transition-transform" />
        Назад до мапи
      </button>

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-8">
        <div>
          <h1 className="text-6xl font-black text-gray-900 mb-4 tracking-tighter">
            Аудиторія <span className="text-green-600">{roomId}</span>
          </h1>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-gray-400 font-bold">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              Доступна для бронювання
            </div>
            <div className="flex items-center gap-2 text-gray-400 font-bold">
              <Clock size={18} /> 45 хв / сесія
            </div>
          </div>
        </div>

        <div className="flex bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
          <div className="px-4 py-2 flex items-center gap-2 text-xs font-black text-gray-400 uppercase">
            <div className="w-3 h-3 bg-green-500 rounded-sm"></div> Вільні
          </div>
          <div className="px-4 py-2 flex items-center gap-2 text-xs font-black text-gray-400 uppercase">
            <div className="w-3 h-3 bg-red-100 rounded-sm"></div> Зайняті
          </div>
        </div>
      </div>

      <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl shadow-gray-200/50 border border-gray-50 overflow-x-auto custom-scrollbar">
        <div className="grid grid-flow-col auto-cols-max gap-8 min-w-max">
          {DATES.map((date) => (
            <div key={date} className="w-44 flex flex-col gap-4">
              <div className="bg-gray-900 text-white p-5 rounded-[2rem] text-center shadow-xl shadow-gray-200">
                <div className="text-[10px] font-black uppercase opacity-40 mb-1 tracking-widest">
                  Дата
                </div>
                <div className="font-black text-lg">{date}</div>
              </div>

              <div className="space-y-3">
                {TIMES.map((time) => {
                  const status = getSlotStatus(date, time);
                  return (
                    <button
                      key={time}
                      disabled={status === "occupied"}
                      onClick={() => setSelectedSlot({ date, time })}
                      className={`w-full h-20 rounded-[1.8rem] text-sm font-black transition-all border-2 flex flex-col items-center justify-center gap-1 ${
                        status === "occupied"
                          ? "bg-gray-50 text-gray-200 border-gray-50 cursor-not-allowed"
                          : status === "selected"
                            ? "bg-yellow-400 border-yellow-500 scale-105 shadow-2xl text-yellow-900"
                            : "bg-white text-gray-700 border-gray-100 hover:border-green-500 hover:text-green-600 hover:bg-green-50/50"
                      }`}
                    >
                      <span className="opacity-40 text-[10px] uppercase">
                        Слот
                      </span>
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 flex flex-col items-center gap-6">
        {selectedSlot && (
          <div className="bg-green-50 border border-green-100 px-8 py-4 rounded-3xl flex items-center gap-4 animate-in slide-in-from-bottom-4">
            <Calendar className="text-green-600" />
            <span className="font-bold text-green-800">
              Ви обрали: {selectedSlot.date} о {selectedSlot.time}
            </span>
          </div>
        )}

        <button
          onClick={handleConfirm}
          disabled={!selectedSlot}
          className="group relative bg-gray-900 text-white px-20 py-6 rounded-[2.5rem] font-black text-2xl disabled:bg-gray-100 disabled:text-gray-300 transition-all hover:bg-green-600 hover:shadow-2xl hover:shadow-green-200 active:scale-95 flex items-center gap-4 overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-3">
            {selectedSlot ? (
              <>
                <CheckCircle2 /> ПІДТВЕРДИТИ
              </>
            ) : (
              "ОБЕРІТЬ СЛОТ"
            )}
          </span>
          {selectedSlot && (
            <div className="absolute inset-0 bg-green-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          )}
        </button>
      </div>
    </div>
  );
}
