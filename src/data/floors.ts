export interface FloorData {
  id: string;
  name: string;
  viewBox: string;
  svgContent: string;
}

// 1 ПОВЕРХ (Велика карта)
const SVG_FLOOR_1 = `
<path d="M1986.85 1298.08L1933.53 1298.08" stroke="#0D1846"/>
<path d="M1988.16 1298.08L1934.85 1298.08" stroke="#0D1846" stroke-width="2"/>
<path d="M1719.61 420.131L1719.61 437.459L1703.81 437.459L1703.81 420.131L1719.61 420.131Z" fill="#0D1846" stroke="#0D1846"/>
<path d="M1604.8 421L1604.8 438.328L1589 438.328L1589 421L1604.8 421Z" fill="#0D1846" stroke="#0D1846"/>
<path d="M1484.8 421L1484.8 438.328L1469 438.328L1469 421L1484.8 421Z" fill="#0D1846" stroke="#0D1846" stroke-width="2"/>
<path d="M1716.97 491.367L1716.97 508.695L1701.18 508.695L1701.18 491.367L1716.97 491.367Z" fill="#0D1846" stroke="#0D1846"/>
<path d="M1827.56 420.131L1827.56 437.459L1811.76 437.459L1811.76 420.131L1827.56 420.131Z" fill="#0D1846" stroke="#0D1846"/>
<path d="M530 502.961L6.55651e-06 502.961" stroke="#0D1846" stroke-width="4"/>
<path d="M1404.98 502.92L597.989 502.92" stroke="#0D1846" stroke-width="4"/>
<path d="M2436 1731L2434.03 1194.11" stroke="#0D1846" stroke-width="5"/>
<path d="M1418 1731L1417.89 1073.76" stroke="#0D1846" stroke-width="5"/>
<path d="M2439 1731L2161 1731" stroke="#0D1846" stroke-width="5"/>
<path d="M1691 1731H1416" stroke="#0D1846" stroke-width="5"/>
<path d="M2 373H54" stroke="#0D1846" stroke-width="2"/>
`;

// 2 ПОВЕРХ
const SVG_FLOOR_2 = `
<path d="M1145.82 147.377L1077.82 147.535" stroke="#0D1846"/>
<path d="M2611.92 188.963L2.93079 195.038" stroke="#0D1846" stroke-width="5"/>
<path d="M3.50689 443.036L2612.5 436.961" stroke="#0D1846" stroke-width="5"/>
<path d="M2325.07 253.631L2325.5 438.631" stroke="#0D1846" stroke-width="5"/>
<path d="M2149.08 255.04L2149.5 439.039" stroke="#0D1846" stroke-width="5"/>
<path d="M2148.93 192.041L2148.49 5.0419" stroke="#0D1846" stroke-width="2"/>
<path d="M1973.93 191.447L1973.49 4.44815" stroke="#0D1846" stroke-width="2"/>
<path d="M2.49722 9.03825L3.50781 443.037" stroke="#0D1846" stroke-width="5"/>
<path d="M2.49713 9.03831L2611.49 2.96289" stroke="#0D1846" stroke-width="5"/>
<path d="M1077.5 440.537L1077.08 257.538" stroke="#0D1846" stroke-width="5"/>
<path d="M941.506 440.854L941.08 257.854" stroke="#0D1846" stroke-width="5"/>
<path d="M2072.07 254.22L2612.07 252.963" stroke="#0D1846" stroke-width="5"/>
<path d="M940.075 255.856L1988.07 253.416" stroke="#0D1846" stroke-width="5"/>
`;

// 3 ПОВЕРХ
const SVG_FLOOR_3 = `
<path d="M1146 144L1078 144" stroke="#0D1846"/>
<path d="M2612 189L2.99996 189" stroke="#0D1846" stroke-width="5"/>
<path d="M2.99989 436.999L2612 437" stroke="#0D1846" stroke-width="5"/>
<path d="M2229 253L2229 438" stroke="#0D1846" stroke-width="3"/>
<path d="M2149 254L2149 438" stroke="#0D1846" stroke-width="3"/>
<path d="M2149 191L2149 4.00037" stroke="#0D1846" stroke-width="2"/>
<path d="M1962 191L1962 4.00037" stroke="#0D1846" stroke-width="2"/>
<path d="M3.00011 2.99998L3 437" stroke="#0D1846" stroke-width="5"/>
<path d="M2.9999 2.99954L2612 3" stroke="#0D1846" stroke-width="5"/>
<path d="M939 254L1987 254" stroke="#0D1846" stroke-width="5"/>
`;

// 4 ПОВЕРХ
const SVG_FLOOR_4 = `
<path d="M2612 189L2.99996 189" stroke="#0D1846" stroke-width="5"/>
<path d="M2.99989 436.999L2612 437" stroke="#0D1846" stroke-width="5"/>
<path d="M2229 256L2229 438" stroke="#0D1846" stroke-width="2"/>
<path d="M2229 3L2229 188" stroke="#0D1846" stroke-width="2"/>
<path d="M2149 254L2149 438" stroke="#0D1846" stroke-width="2"/>
<path d="M2148 191L2148 4.00037" stroke="#0D1846" stroke-width="2"/>
<path d="M1852 190L1852 4.00001" stroke="#0D1846" stroke-width="2"/>
<path d="M3.00011 2.99998L3 437" stroke="#0D1846" stroke-width="5"/>
<path d="M2.9999 2.99954L2612 3" stroke="#0D1846" stroke-width="5"/>
<path d="M2067 256L2612 256" stroke="#0D1846" stroke-width="5"/>
<path d="M940 254L1988 254" stroke="#0D1846" stroke-width="5"/>
`;

export const FLOORS: Record<string, FloorData> = {
  '1': { id: '1', name: '1 Поверх', viewBox: "0 0 2600 1734", svgContent: SVG_FLOOR_1 },
  '2': { id: '2', name: '2 Поверх', viewBox: "0 0 2615 446", svgContent: SVG_FLOOR_2 },
  '3': { id: '3', name: '3 Поверх', viewBox: "0 0 2615 440", svgContent: SVG_FLOOR_3 },
  '4': { id: '4', name: '4 Поверх', viewBox: "0 0 2615 440", svgContent: SVG_FLOOR_4 },
};