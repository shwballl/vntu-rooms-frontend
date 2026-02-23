import React, { useState, useMemo } from 'react';
import { Search, Map as MapIcon, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MapFloor from '../components/MapFloor';
import { FLOORS } from '../data/floors';
import { ZONES } from '../data/zones';
import type { Room } from '../types';

const MOCK_ROOMS: Room[] = [
  { id: '1203', status: 'occupied' },
  { id: '2205', status: 'occupied' },
  { id: '3209', status: 'occupied' },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [selectedFloor, setSelectedFloor] = useState('2'); 

  const currentFloorData = FLOORS[selectedFloor];
  const currentZones = ZONES[selectedFloor] || [];

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto p-4">
      
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <select 
              value={selectedFloor}
              onChange={(e) => {
                setSelectedFloor(e.target.value);
                setSelectedRoomId(null);
              }}
              className="appearance-none bg-blue-50 py-3 pl-4 pr-10 rounded-xl font-bold text-blue-700 cursor-pointer hover:bg-blue-100 transition border border-blue-200"
            >
              <option value="1">1 Поверх (Велика карта)</option>
              <option value="2">2 Поверх</option>
              <option value="3">3 Поверх</option>
              <option value="4">4 Поверх</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-500" />
          </div>
        </div>
      </div>

      <div className="bg-gray-100 rounded-3xl p-6 shadow-inner border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">{currentFloorData.name}</h2>
        
        <div className={`mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-300 ${selectedFloor === '1' ? 'max-w-4xl' : 'min-w-[1000px] overflow-x-auto'}`}>
          <MapFloor 
            rooms={MOCK_ROOMS} 
            zones={currentZones} 
            svgContent={currentFloorData.svgContent}
            viewBox={currentFloorData.viewBox}
            onRoomSelect={setSelectedRoomId}
            selectedRoomId={selectedRoomId || undefined}
          />
        </div>

        <div className="flex justify-center mt-6 h-12">
           {selectedRoomId && (
             <button 
               onClick={() => navigate(`/booking/${selectedRoomId}`)}
               className="bg-green-500 hover:bg-green-600 text-white font-bold text-lg px-12 py-2 rounded-xl shadow-lg transition-transform hover:scale-105"
             >
               Забронювати {selectedRoomId}
             </button>
           )}
        </div>
      </div>
    </div>
  );
}