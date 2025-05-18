// src/app/models/geography-quiz.interface.ts
export interface GeoQuestion {
  id: number;
  type: 'capital' | 'flag' | 'location';
  country: string;
  options: string[];
  correctAnswer: number;
  mapCoordinates?: [number, number];
}
