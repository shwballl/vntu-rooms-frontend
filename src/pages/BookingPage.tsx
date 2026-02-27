import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Calendar, Clock } from 'lucide-react'; 

const TIMES = ["12:00-12:45", "13:00-13:45", "14:00-14:45", "15:00-15:45", "16:00-16:45"];
const DATES = Array(7).fill("12/02/2026"); 

export default function BookingPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [selectedSlot, setSelectedSlot] = useState<{col: number, row: number} | null>(null);

  const getSlotStatus = (colIndex: number, rowIndex: number) => {
    if (colIndex === 0 && rowIndex === 0) return 'occupied'; 
    // if (colIndex === 0 && rowIndex === 0) return 'occupied';
    if (selectedSlot?.col === colIndex && selectedSlot?.row === rowIndex) return 'selected';
    return 'free';
  };

  const handleSlotClick = (col: number, row: number) => {
    if (getSlotStatus(col, row) === 'occupied') return;
    setSelectedSlot({ col, row });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-200 hover:bg-gray-50 transition text-gray-700 font-medium"
        >
          <ChevronLeft size={20} />
          Назад
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Бронювання аудиторії {roomId}</h1>
      </div>

      <div className="bg-gray-400/40 rounded-3xl p-8 shadow-inner backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-6">
            <Clock className="text-gray-700" />
            <h3 className="text-2xl text-gray-800 font-medium">Оберіть час</h3>
        </div>
        
        <div className="overflow-x-auto pb-4 custom-scrollbar">
          <div className="grid grid-flow-col auto-cols-max gap-4 min-w-max">
            {DATES.map((date, colIndex) => (
              <div key={colIndex} className="flex flex-col gap-3 w-32">
                <div className="bg-slate-700 text-white text-center font-medium py-2 rounded-lg shadow-sm text-sm flex items-center justify-center gap-1">
                  <Calendar size={14} /> {date}
                </div>
                {TIMES.map((time, rowIndex) => {
                  const status = getSlotStatus(colIndex, rowIndex);
                  let btnClass = 'bg-green-400 hover:bg-green-500 text-gray-900';
                  
                  if (status === 'occupied') btnClass = 'bg-red-400 text-white/50 cursor-not-allowed';
                  if (status === 'selected') btnClass = 'bg-yellow-300 ring-4 ring-yellow-200 text-black font-bold transform scale-105 z-10';

                  return (
                    <button
                      key={rowIndex}
                      disabled={status === 'occupied'}
                      onClick={() => handleSlotClick(colIndex, rowIndex)}
                      className={`
                        ${btnClass} 
                        py-3 px-1 rounded-lg text-xs font-medium transition-all shadow-sm 
                        border border-black/5 flex items-center justify-center h-12
                      `}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button 
            disabled={!selectedSlot}
            onClick={() => navigate('/profile')}
            className={`
              px-8 py-3 rounded-xl font-bold text-lg shadow-lg transition-all
              ${selectedSlot 
                ? 'bg-green-500 hover:bg-green-600 text-white hover:-translate-y-1' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
            `}
          >
            {selectedSlot ? 'Підтвердити бронювання' : 'Оберіть слот'}
          </button>
        </div>
      </div>
    </div>
  );
}