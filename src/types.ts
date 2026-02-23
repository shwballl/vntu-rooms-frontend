// src/types.ts

export interface User {
  id: string;
  name: string;
  email: string;
  department: string;
}

export interface Room {
  id: string; // Номер аудиторії, напр. "1209"
  status: 'free' | 'occupied' | 'selected';
  type?: 'classroom' | 'wc' | 'stairs' | 'utility';
}

// Координати для інтерактивної зони на карті
export interface RoomZone {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface BookingSlot {
  date: string;
  time: string;
  isBooked: boolean;
}