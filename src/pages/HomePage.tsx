import React, { useState } from "react";
import { ChevronDown, Map as MapIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MapFloor from "../components/MapFloor";
import { BUILDINGS, MAP_DATA, MOCK_ROOMS_STATUS } from "../data/mapData";

export default function HomePage() {
  const navigate = useNavigate();
  const [selectedBuilding, setSelectedBuilding] = useState("1");
  const [selectedFloor, setSelectedFloor] = useState("2");
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  const currentFloorData = MAP_DATA[selectedBuilding]?.[selectedFloor];

  return (
    <div className="space-y-8 max-w-[1400px] mx-auto p-6">
      {/* Панель керування */}
      <div className="bg-white p-5 rounded-3xl shadow-sm border border-lime-100 flex flex-wrap gap-6 items-center justify-between">
        <div className="flex items-center gap-6 w-full sm:w-auto">
          <div className="flex items-center gap-2 text-emerald-700 font-extrabold">
            <div className="bg-lime-100 p-2 rounded-lg">
              <MapIcon size={20} />
            </div>
            <span className="tracking-wide">Локація:</span>
          </div>

          <div className="flex gap-3">
            {/* Селект корпусу */}
            <div className="relative">
              <select
                value={selectedBuilding}
                onChange={(e) => {
                  setSelectedBuilding(e.target.value);
                  setSelectedFloor("1");
                  setSelectedRoomId(null);
                }}
                className="appearance-none bg-lime-50/50 py-2.5 pl-4 pr-10 rounded-xl font-bold text-emerald-800 cursor-pointer hover:bg-lime-100 transition border border-lime-200 focus:ring-2 focus:ring-lime-400 outline-none"
              >
                {BUILDINGS.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-600 pointer-events-none" />
            </div>

            {/* Селект поверху */}
            {/* Селект поверху */}
            <div className="relative">
              <select
                value={selectedFloor}
                onChange={(e) => {
                  setSelectedFloor(e.target.value);
                  setSelectedRoomId(null);
                }}
                className="appearance-none bg-lime-50/50 py-2.5 pl-4 pr-10 rounded-xl font-bold text-emerald-800 cursor-pointer hover:bg-lime-100 transition border border-lime-200 focus:ring-2 focus:ring-lime-400 outline-none"
              >
                {/* Отримуємо список доступних поверхів для обраного корпусу */}
                {MAP_DATA[selectedBuilding] &&
                  Object.keys(MAP_DATA[selectedBuilding]).map((f) => (
                    <option key={f} value={f}>
                      {f} Поверх
                    </option>
                  ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-600 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Контейнер мапи */}
      <div className="bg-slate-50/50 rounded-[2.5rem] p-8 border border-slate-100">
        {!currentFloorData ? (
          <div className="text-center py-20 text-slate-400 font-medium italic">
            Мапа для цього поверху ще не завантажена
          </div>
        ) : (
          <>
            <div className="flex justify-between items-end mb-6">
              <div>
                <h2 className="text-3xl font-black text-slate-800">
                  Корпус {selectedBuilding}
                </h2>
                <p className="text-emerald-600 font-bold uppercase tracking-widest text-sm">
                  {currentFloorData.name}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl shadow-lime-900/5 overflow-hidden border border-slate-200 w-full overflow-x-auto">
              <div className="min-w-[1000px] p-4">
                <MapFloor
                  rooms={MOCK_ROOMS_STATUS}
                  floorData={currentFloorData}
                  onRoomSelect={setSelectedRoomId}
                  selectedRoomId={selectedRoomId || undefined}
                />
              </div>
            </div>

            {/* Кнопка бронювання */}
            <div className="flex justify-center mt-8 h-16">
              {selectedRoomId && (
                <button
                  onClick={() => navigate(`/booking/${selectedRoomId}`)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-black text-lg px-10 py-4 rounded-2xl shadow-xl shadow-emerald-200 transition-all hover:scale-[1.02] active:scale-95 animate-in fade-in slide-in-from-bottom-4 duration-300"
                >
                  Забронювати ауд. {selectedRoomId}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
