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
    <div className="space-y-6 max-w-[1600px] mx-auto p-4">
      {/* Панель керування (Вибір корпусу та поверху) */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="flex items-center gap-2 text-blue-700 font-bold">
            <MapIcon size={24} />
            <span>Локація:</span>
          </div>

          <div className="relative">
            <select
              value={selectedBuilding}
              onChange={(e) => {
                setSelectedBuilding(e.target.value);
                setSelectedFloor("1");
                setSelectedRoomId(null);
              }}
              className="appearance-none bg-blue-50 py-3 pl-4 pr-10 rounded-xl font-bold text-blue-700 cursor-pointer hover:bg-blue-100 transition border border-blue-200 focus:outline-none"
            >
              {BUILDINGS.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-500 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={selectedFloor}
              onChange={(e) => {
                setSelectedFloor(e.target.value);
                setSelectedRoomId(null);
              }}
              className="appearance-none bg-blue-50 py-3 pl-4 pr-10 rounded-xl font-bold text-blue-700 cursor-pointer hover:bg-blue-100 transition border border-blue-200 focus:outline-none"
            >
              <option value="1">1 Поверх</option>
              <option value="2">2 Поверх</option>
              <option value="3">3 Поверх</option>
              <option value="4">4 Поверх</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-500 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Контейнер мапи */}
      <div className="bg-gray-50 rounded-3xl p-6 shadow-inner border border-gray-200">
        {!currentFloorData ? (
          <div className="text-center py-20 text-gray-500 text-lg">
            Мапа для цього поверху ще не завантажена
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              Корпус {selectedBuilding}, {currentFloorData.name}
            </h2>

            <div className="mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-300 w-full overflow-x-auto">
              <div className="min-w-[1000px]">
                <MapFloor
                  rooms={MOCK_ROOMS_STATUS}
                  floorData={currentFloorData}
                  onRoomSelect={setSelectedRoomId}
                  selectedRoomId={selectedRoomId || undefined}
                />
              </div>
            </div>

            {/* Кнопка бронювання */}
            <div className="flex justify-center mt-6 h-14">
              {selectedRoomId && (
                <button
                  onClick={() => navigate(`/booking/${selectedRoomId}`)}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold text-lg px-12 py-3 rounded-xl shadow-lg transition-transform hover:scale-105 animate-fade-in-up"
                >
                  Перейти до бронювання {selectedRoomId}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
