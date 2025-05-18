import { Injectable } from '@angular/core';
import { GeoQuestion } from '../models/geography-quiz.interface';

@Injectable({
  providedIn: 'root',
})
export class GeoQuizService {
  private questions: GeoQuestion[] = [
    {
      id: 1,
      type: 'capital',
      country: 'France',
      options: ['Paris', 'Lyon', 'Marseille', 'Toulouse'],
      correctAnswer: 0,
    },
    {
      id: 2,
      type: 'flag',
      country: 'Japan',
      options: ['Flag of Japan', 'Flag of China', 'Flag of Korea', 'Flag of Thailand'],
      correctAnswer: 0,
    },
    {
      id: 3,
      type: 'location',
      country: 'Brazil',
      options: ['South America', 'Africa', 'Asia', 'Europe'],
      correctAnswer: 0,
      mapCoordinates: [-14.235, -51.9253],
    },
  ];

  getQuestions(): GeoQuestion[] {
    return this.questions;
  }

  getRandomQuestion(): GeoQuestion {
    const randomIndex = Math.floor(Math.random() * this.questions.length);
    return this.questions[randomIndex];
  }
}
