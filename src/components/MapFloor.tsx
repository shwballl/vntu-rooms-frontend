import React from 'react';
import type { Room, RoomZone } from '../types';

interface MapFloorProps {
  rooms: Room[];
  zones: RoomZone[];
  svgContent: string;
  viewBox: string;
  onRoomSelect: (roomId: string) => void;
  selectedRoomId?: string;
}

export default function MapFloor({ rooms, zones, svgContent, viewBox, onRoomSelect, selectedRoomId }: MapFloorProps) {
  
  const getZoneClass = (roomId: string) => {
    const room = rooms.find(r => r.id === roomId);
    if (selectedRoomId === roomId) return 'fill-yellow-400/60 stroke-yellow-600 stroke-[4px]';
    if (room?.status === 'occupied') return 'fill-red-400/50 stroke-red-600';
    return 'fill-green-400/30 stroke-green-700 hover:fill-green-400/60';
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-lg border border-gray-300 overflow-hidden relative">
      <svg 
        viewBox={viewBox} 
        className="w-full h-auto select-none"
        preserveAspectRatio="xMidYMid meet"
      >
        <g 
          className="pointer-events-none opacity-90" 
          dangerouslySetInnerHTML={{ __html: svgContent }} 
        />

        {zones.map((zone) => (
          <g 
            key={zone.id} 
            onClick={() => onRoomSelect(zone.id)}
            className="cursor-pointer group"
          >
            <rect
              x={zone.x}
              y={zone.y}
              width={zone.width}
              height={zone.height}
              className={`transition-all duration-200 ${getZoneClass(zone.id)} stroke-2`}
            />
            <text
              x={zone.x + zone.width / 2}
              y={zone.y + zone.height / 2}
              textAnchor="middle"
              dominantBaseline="middle"
              className="font-bold fill-slate-800 pointer-events-none text-[32px]"
            >
              {zone.id}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}