// Successive ionisation energies (kJ/mol), from the Wikipedia data page "Ionization energies of the elements".
// IE1 is the first electron removed, IE2 the second, and so on. Only elements whose jump falls within IE1 to IE8 are used.
export interface SuccessiveIE {
  z: number;
  symbol: string;
  nameEn: string;
  nameMn: string;
  ie: number[];
}

export const SUCCESSIVE_IE: SuccessiveIE[] = [
  { z: 11, symbol: 'Na', nameEn: 'Sodium', nameMn: 'Натри', ie: [495.8, 4562, 6910.3, 9543, 13354, 16613, 20117, 25496] },
  { z: 12, symbol: 'Mg', nameEn: 'Magnesium', nameMn: 'Магни', ie: [737.7, 1450.7, 7732.7, 10542.5, 13630, 18020, 21711, 25661] },
  { z: 13, symbol: 'Al', nameEn: 'Aluminium', nameMn: 'Хөнгөнцагаан', ie: [577.5, 1816.7, 2744.8, 11577, 14842, 18379, 23326, 27465] },
  { z: 15, symbol: 'P', nameEn: 'Phosphorus', nameMn: 'Фосфор', ie: [1011.8, 1907, 2914.1, 4963.6, 6273.9, 21267, 25431, 29872] },
  { z: 16, symbol: 'S', nameEn: 'Sulfur', nameMn: 'Хүхэр', ie: [999.6, 2252, 3357, 4556, 7004.3, 8495.8, 27107, 31719] },
  { z: 17, symbol: 'Cl', nameEn: 'Chlorine', nameMn: 'Хлор', ie: [1251.2, 2298, 3822, 5158.6, 6542, 9362, 11018, 33604] }
];
