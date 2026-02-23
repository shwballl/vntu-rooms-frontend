import React from 'react';
import type { Room } from '../types';

interface MapSvgProps {
  rooms: Room[];
  onRoomSelect: (roomId: string) => void;
  selectedRoomId?: string;
}

const ROOM_ZONES = [
  { id: '1201', x: 55, y: 255, width: 125, height: 180 },
  { id: '1203', x: 180, y: 255, width: 125, height: 180 },
  { id: '1205', x: 305, y: 255, width: 125, height: 180 },
  { id: '1209', x: 1000, y: 255, width: 235, height: 180 },
  
];

export default function MapSvg({ rooms, onRoomSelect, selectedRoomId }: MapSvgProps) {

  const getZoneColor = (roomId: string) => {
    const isSelected = selectedRoomId === roomId;
    const room = rooms.find(r => r.id === roomId);
    
    if (isSelected) return 'rgba(250, 204, 21, 0.6)'; 
    if (room?.status === 'occupied') return 'rgba(248, 113, 113, 0.6)'; 
    return 'rgba(74, 222, 128, 0.01)'; 
  };

  const logCoordinates = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = e.currentTarget;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const svgP = pt.matrixTransform(svg.getScreenCTM()?.inverse());
    console.log(`X: ${Math.round(svgP.x)}, Y: ${Math.round(svgP.y)}`);
  };

  return (
    <div className="w-full overflow-hidden bg-white rounded-xl shadow-lg border border-gray-200">
      <svg 
        viewBox="0 0 2600 1734" 
        className="w-full h-auto cursor-crosshair" 
        onClick={logCoordinates} 
      >
        <g className="opacity-80">
            <path d="M1986.85 1298.08L1933.53 1298.08" stroke="#0D1846"/>
            <path d="M1988.16 1298.08L1934.85 1298.08" stroke="#0D1846" strokeWidth="2"/>
             <path d="M1469.48 340.242L1594.55 340.242L1594.55 255.528" stroke="#0D1846" strokeWidth="2"/>
             <path d="M304.418 437.459L304.418 254.554" stroke="#0D1846" strokeWidth="2"/>
             <path d="M179.355 437.459L179.355 254.554" stroke="#0D1846" strokeWidth="2"/>
        </g>

        {ROOM_ZONES.map((zone) => (
          <rect
            key={zone.id}
            x={zone.x}
            y={zone.y}
            width={zone.width}
            height={zone.height}
            fill={getZoneColor(zone.id)}
            className="transition-all duration-200 hover:opacity-80 cursor-pointer hover:stroke-2 hover:stroke-blue-500"
            onClick={(e) => {
              e.stopPropagation(); 
              onRoomSelect(zone.id);
            }}
          />
        ))}

        {ROOM_ZONES.map((zone) => (
           <text
             key={`text-${zone.id}`}
             x={zone.x + zone.width / 2}
             y={zone.y + zone.height / 2}
             textAnchor="middle"
             dominantBaseline="middle"
             className="text-4xl font-bold fill-slate-700 pointer-events-none opacity-0 hover:opacity-100"
             style={{ fontSize: '40px' }} 
           >
             {zone.id}
           </text>
        ))}

      </svg>
    </div>
  );
}