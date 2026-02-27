export interface User {
  id: string;
  name: string;
  email: string;
  department: string;
}

export interface Room {
  id: string;
  status: "free" | "occupied" | "maintenance";
}

export interface RoomZone {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type?: "room" | "service";
}

export interface FloorData {
  id: string;
  name: string;
  svgBase: string; // Базовий SVG (стіни, коридори) без інтерактивних зон
  viewBox: string;
  zones: RoomZone[];
}
