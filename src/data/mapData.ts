import type { FloorData, Room } from "../types";

export const BUILDINGS = [{ id: "1", name: "Корпус 1 (Головний)" }];

const generateMockCoords = (index: number) => ({
  x: 100 + (index % 10) * 160,
  y: 150 + Math.floor(index / 10) * 220,
  width: 150,
  height: 200,
});

export const MAP_DATA: Record<string, Record<string, FloorData>> = {
  "1": {
    "1": {
      id: "1",
      name: "1 Поверх",
      viewBox: "0 0 2600 1734",
      svgBase: "",
      zones: [
        { id: "1101", x: 4, y: 10, width: 150, height: 186, type: "room" },
        { id: "1104", x: 154, y: 10, width: 150, height: 186, type: "room" },
        { id: "1106", x: 308, y: 10, width: 150, height: 186, type: "room" },
        { id: "1110", x: 462, y: 10, width: 150, height: 186, type: "room" },
        { id: "1112", x: 616, y: 10, width: 150, height: 186, type: "room" },
        { id: "1114a", x: 770, y: 10, width: 150, height: 186, type: "room" },
        { id: "1114", x: 924, y: 10, width: 150, height: 186, type: "room" },
        { id: "1116", x: 1078, y: 10, width: 150, height: 186, type: "room" },

        { id: "1103", x: 4, y: 206, width: 150, height: 186, type: "room" },
        { id: "1105", x: 154, y: 206, width: 150, height: 186, type: "room" },
        { id: "1107a", x: 308, y: 206, width: 150, height: 186, type: "room" },
        { id: "1107", x: 462, y: 206, width: 150, height: 186, type: "room" },
        { id: "1111", x: 616, y: 206, width: 150, height: 186, type: "room" },
        { id: "1113", x: 770, y: 206, width: 150, height: 186, type: "room" },
        { id: "1115", x: 924, y: 206, width: 150, height: 186, type: "room" },
        { id: "1117", x: 1078, y: 206, width: 150, height: 186, type: "room" },

        { id: "1120", x: 4, y: 10, width: 150, height: 186, type: "room" },
        { id: "1121", x: 4, y: 10, width: 150, height: 186, type: "room" },
      ],
    },
    "2": {
      id: "2",
      name: "2 Поверх",

      viewBox: "0 0 2615 446",

      svgBase: "",

      zones: [
        { id: "1201", x: 4, y: 10, width: 150, height: 186, type: "room" },
        { id: "1203", x: 152, y: 10, width: 162, height: 186, type: "room" },
        { id: "1205", x: 539, y: 10, width: 221, height: 186, type: "room" },
        { id: "1209", x: 832, y: 10, width: 671, height: 186, type: "room" },
        { id: "1217", x: 1573, y: 10, width: 67, height: 186, type: "room" },
        { id: "1219", x: 1707, y: 10, width: 67, height: 186, type: "room" },
        { id: "1221", x: 1774, y: 10, width: 198, height: 186, type: "room" },
        { id: "1223", x: 1974, y: 10, width: 175, height: 186, type: "room" },
        { id: "1225", x: 2150, y: 10, width: 232, height: 186, type: "room" },
        { id: "1227", x: 2383, y: 10, width: 232, height: 186, type: "room" },

        { id: "1202", x: 4, y: 259, width: 146, height: 181, type: "room" },
        { id: "1204", x: 154, y: 259, width: 67, height: 181, type: "room" },
        { id: "1206", x: 222, y: 259, width: 204, height: 181, type: "room" },
        { id: "1208", x: 426, y: 259, width: 266, height: 181, type: "room" },
        { id: "WC Ж", x: 693, y: 259, width: 67, height: 181, type: "service" },
        { id: "1210", x: 943, y: 259, width: 67, height: 181, type: "room" },
        { id: "1212", x: 1010, y: 259, width: 67, height: 181, type: "room" },
        { id: "1214", x: 1079, y: 259, width: 67, height: 181, type: "room" },
        { id: "1216", x: 1146, y: 259, width: 177, height: 181, type: "room" },
        { id: "1218", x: 1326, y: 259, width: 177, height: 181, type: "room" },
        { id: "1220", x: 1504, y: 259, width: 271, height: 181, type: "room" },
        { id: "1223а", x: 2150, y: 259, width: 175, height: 181, type: "room" },
        { id: "1224", x: 2326, y: 259, width: 207, height: 181, type: "room" },
        { id: "1226", x: 2533, y: 259, width: 67, height: 181, type: "room" },
      ],
    },
    "3": {
      id: "3",
      name: "3 Поверх",
      viewBox: "0 0 2600 1734",
      svgBase: "",
      zones: [
        { id: "1302", x: 4, y: 10, width: 150, height: 186, type: "room" },
        { id: "1304", x: 154, y: 10, width: 150, height: 186, type: "room" },
        { id: "1306", x: 308, y: 10, width: 150, height: 186, type: "room" },
        { id: "1308", x: 462, y: 10, width: 150, height: 186, type: "room" },
        { id: "1310", x: 616, y: 10, width: 150, height: 186, type: "room" },
        { id: "1312", x: 770, y: 10, width: 150, height: 186, type: "room" },
        { id: "1314", x: 924, y: 10, width: 150, height: 186, type: "room" },
        { id: "1316", x: 1078, y: 10, width: 150, height: 186, type: "room" },
        { id: "1318a", x: 1232, y: 10, width: 150, height: 186, type: "room" },
        { id: "1318", x: 1386, y: 10, width: 150, height: 186, type: "room" },

        { id: "1301", x: 4, y: 200, width: 150, height: 186, type: "room" },
        { id: "1303", x: 154, y: 200, width: 150, height: 186, type: "room" },
        { id: "1305", x: 308, y: 200, width: 150, height: 186, type: "room" },
        { id: "1307", x: 462, y: 200, width: 150, height: 186, type: "room" },
        { id: "1309", x: 616, y: 200, width: 150, height: 186, type: "room" },
        { id: "1309a", x: 770, y: 200, width: 150, height: 186, type: "room" },
        { id: "1311", x: 924, y: 200, width: 150, height: 186, type: "room" },
        { id: "1313", x: 4, y: 444, width: 75, height: 93, type: "room" },
        { id: "1315", x: 79, y: 444, width: 75, height: 93, type: "room" },
        { id: "1317", x: 79, y: 537, width: 75, height: 93, type: "room" },
        { id: "1319", x: 154, y: 444, width: 75, height: 93, type: "room" },
        { id: "1321", x: 154, y: 537, width: 75, height: 93, type: "room" },
      ],
    },
    "4": {
      id: "4",
      name: "4 Поверх",
      viewBox: "0 0 2600 1734",
      svgBase: "",
      zones: [
        { id: "1402a", x: 1386, y: 10, width: 150, height: 186, type: "room" },
        { id: "1402", x: 1536, y: 10, width: 150, height: 186, type: "room" },
        { id: "1404", x: 1686, y: 10, width: 150, height: 186, type: "room" },
        { id: "1404a", x: 1836, y: 10, width: 150, height: 186, type: "room" },
        { id: "1408", x: 4, y: 200, width: 150, height: 186, type: "room" },
        { id: "1410", x: 154, y: 200, width: 150, height: 186, type: "room" },
        { id: "1412", x: 308, y: 200, width: 150, height: 186, type: "room" },
        { id: "1414", x: 462, y: 200, width: 150, height: 186, type: "room" },
        { id: "1418", x: 616, y: 200, width: 150, height: 186, type: "room" },
        { id: "1416", x: 770, y: 200, width: 150, height: 186, type: "room" },

        { id: "1401", x: 308, y: 200, width: 150, height: 186, type: "room" },
        { id: "1403", x: 462, y: 200, width: 150, height: 186, type: "room" },
        { id: "1405", x: 616, y: 200, width: 150, height: 186, type: "room" },
        { id: "1417", x: 770, y: 200, width: 150, height: 186, type: "room" },
        { id: "1409a", x: 924, y: 200, width: 150, height: 186, type: "room" },
        { id: "1409", x: 1078, y: 200, width: 150, height: 186, type: "room" },
        { id: "1411", x: 1232, y: 200, width: 150, height: 186, type: "room" },
        { id: "1413", x: 1386, y: 200, width: 150, height: 186, type: "room" },
        { id: "1415", x: 4, y: 444, width: 75, height: 93, type: "room" },
        { id: "1419", x: 79, y: 444, width: 75, height: 93, type: "room" },
        { id: "1421", x: 79, y: 537, width: 75, height: 93, type: "room" },
        {
          id: "1422",
          x: 79 + 75 * Math.floor(2 / 2),
          y:
            Math.floor(2 / 2) * (93 + Math.floor(2 / 2) * -93) +
            Math.floor(2 / 2) * -93,
          width: 75,
          height: 93,
          type: "room",
        },
      ],
    },
  },
};

// Мокові дані для перевірки відображення статусів (зайнято/вільно)
export const MOCK_ROOMS_STATUS: Room[] = [
  // { id: "1203", status: "occupied" },
  // { id: "1209", status: "occupied" },
  // { id: "1310", status: "maintenance" },
  // { id: "1421", status: "occupied" },
  // { id: "1106", status: "maintenance" },
];
