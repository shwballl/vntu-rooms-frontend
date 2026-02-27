import React from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { ZoomIn, ZoomOut, Maximize } from "lucide-react"; // Іконки для кнопок керування
import type { Room, FloorData, RoomZone } from "../types";

interface MapFloorProps {
  rooms: Room[];
  floorData: FloorData;
  onRoomSelect: (roomId: string) => void;
  selectedRoomId?: string;
}

export default function MapFloor({
  rooms,
  floorData,
  onRoomSelect,
  selectedRoomId,
}: MapFloorProps) {
  const getZoneStyles = (zone: RoomZone) => {
    if (zone.type === "service") {
      return "fill-slate-200 stroke-slate-400 stroke-1 opacity-50 cursor-default";
    }

    const isSelected = selectedRoomId === zone.id;
    const roomInfo = rooms.find((r) => r.id === zone.id);

    if (isSelected)
      return "fill-yellow-400/60 stroke-yellow-500 stroke-[4px] cursor-pointer";
    if (roomInfo?.status === "occupied")
      return "fill-red-400/30 stroke-red-500 cursor-not-allowed";

    return "fill-green-400/20 stroke-green-600 hover:fill-green-400/50 cursor-pointer transition-colors";
  };

  return (
    <div className="w-full relative bg-white rounded-xl shadow-lg border border-gray-300 overflow-hidden group">
      <TransformWrapper
        initialScale={1}
        minScale={0.2}
        maxScale={4}
        limitToBounds={false}
        centerOnInit={true}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            {/* Панель кнопок керування мапою */}
            <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 bg-white/90 backdrop-blur p-2 rounded-xl shadow-md border border-gray-200 opacity-100 transition-opacity">
              <button
                onClick={() => zoomIn()}
                className="p-2 hover:bg-gray-100 rounded-lg text-gray-700 transition-colors"
                title="Наблизити"
              >
                <ZoomIn size={24} />
              </button>
              <button
                onClick={() => zoomOut()}
                className="p-2 hover:bg-gray-100 rounded-lg text-gray-700 transition-colors"
                title="Віддалити"
              >
                <ZoomOut size={24} />
              </button>
              <div className="w-full h-px bg-gray-200 my-1"></div>
              <button
                onClick={() => resetTransform()}
                className="p-2 hover:bg-gray-100 rounded-lg text-gray-700 transition-colors"
                title="Скинути масштаб"
              >
                <Maximize size={24} />
              </button>
            </div>

            {/* Контейнер, який можна тягати */}
            <TransformComponent
              wrapperClass="w-full h-[500px] bg-gray-50 cursor-grab active:cursor-grabbing"
              contentClass="flex items-center justify-center"
            >
              <svg
                viewBox={floorData.viewBox}
                style={{ width: "2615px", height: "446px" }}
                className="select-none shadow-sm bg-white"
              >
                {/* Базовий малюнок стін (неінтерактивний) */}
                <g
                  className="pointer-events-none opacity-80"
                  dangerouslySetInnerHTML={{ __html: floorData.svgBase }}
                />

                {/* Інтерактивні зони аудиторій */}
                {floorData.zones.map((zone) => (
                  <g
                    key={zone.id}
                    onClick={() =>
                      zone.type !== "service" && onRoomSelect(zone.id)
                    }
                  >
                    <rect
                      x={zone.x}
                      y={zone.y}
                      width={zone.width}
                      height={zone.height}
                      className={`transition-all duration-200 ${getZoneStyles(zone)}`}
                    />
                    <text
                      x={zone.x + zone.width / 2}
                      y={zone.y + zone.height / 2}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className={`font-bold pointer-events-none ${
                        zone.type === "service"
                          ? "fill-slate-400 text-[10px]"
                          : "fill-slate-800 text-[14px]"
                      }`}
                    >
                      {zone.id}
                    </text>
                  </g>
                ))}
              </svg>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  );
}
