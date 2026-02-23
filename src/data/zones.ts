import type { RoomZone } from '../types';

// Генератор для коридорів (2, 3, 4 поверхи)
const generateCorridorZones = (floorPrefix: string): RoomZone[] => {
  const zones: RoomZone[] = [];
  const startX = 60; // Відступ зліва
  const gap = 135;   // Відстань між кімнатами
  
  // Верхній ряд (парні/непарні залежить від корпусу, тут просто приклад)
  for (let i = 0; i < 18; i++) {
    if (i === 6 || i === 14) continue; // Пропуски (сходи, переходи)
    zones.push({
      id: `${floorPrefix}2${i < 9 ? '0' : ''}${i + 1}`,
      x: startX + (i * gap),
      y: 70, // Y верхнього ряду
      width: 125,
      height: 110
    });
  }

  // Нижній ряд
  for (let i = 0; i < 18; i++) {
    if (i === 7 || i === 13) continue;
    zones.push({
      id: `${floorPrefix}2${i < 9 ? '0' : ''}${i + 2}`,
      x: startX + (i * gap),
      y: 260, // Y нижнього ряду
      width: 125,
      height: 170
    });
  }
  return zones;
};

// Зони для 1 поверху (велика карта) - ТУТ ТРЕБА РУЧКАМИ ДОДАТИ ІНШІ
const ZONES_FLOOR_1: RoomZone[] = [
  { id: '1101', x: 50, y: 380, width: 120, height: 120 },
  { id: '1102', x: 180, y: 380, width: 120, height: 120 },
  // ... додай сюди інші, використовуючи MapFloor debug режим
];

export const ZONES: Record<string, RoomZone[]> = {
  '1': ZONES_FLOOR_1,
  '2': generateCorridorZones('1'), // 1201, 1202...
  '3': generateCorridorZones('2'), // 2201, 2202...
  '4': generateCorridorZones('3'), // 3201, 3202...
};