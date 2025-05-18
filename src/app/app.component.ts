import { Component } from '@angular/core';
import { GeoQuestion } from './models/geography-quiz.interface';
import { CommonModule } from '@angular/common';
import { QuestionComponent } from './components/question/question.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, QuestionComponent],
  template: `
    <h1 class="title">Geography Quiz</h1>

    <p style="font-style: italic; color: #555; text-align: center; font-size: 1.5em;">
  Bienvenue dans le quiz de géographie ! Testez vos connaissances sur les capitales, les drapeaux et les emplacements des pays.
</p>


    <app-question
      *ngIf="currentQuestion"
      [question]="currentQuestion"
      (answerSelected)="onAnswer($event)">
    </app-question>

    <p *ngIf="answered">
      Question {{ currentIndex + 1 }} / {{ totalQuestions }}
      <button (click)="nextQuestion()" *ngIf="currentIndex < totalQuestions - 1">Next</button>
      <span *ngIf="currentIndex === totalQuestions - 1">Quiz Finished</span>
    </p>
  `,
  styles: [`
    .title {
      text-align: center;
      font-size: 3rem;
      margin: 2rem 0;
      color: #007ACC;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
    }
  `]
})

export class AppComponent {
  allQuestions: GeoQuestion[] = [
  {
    id: 1,
    type: 'capital',
    country: 'France',
    options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
    correctAnswer: 2
  },
  {
    id: 2,
    type: 'flag',
    country: 'Germany',
    options: ['france.jpg', 'germany.jpg', 'italie.jpg', 'Spain.jpg'],
    correctAnswer: 1
  },
  {
    id: 3,
    type: 'location',
    country: 'Italy',
    options: ['Germany', 'Spain', 'France', 'Italy'],
    correctAnswer: 3,
    mapCoordinates: [41.9028, 12.4964] 
  },
  {
    id: 4,
    type: 'capital',
    country: 'Spain',
    options: ['Madrid', 'Barcelona', 'Seville', 'Valencia'],
    correctAnswer: 0
  },
  {
    id: 5,
    type: 'capital',
    country: 'Canada',
    options: ['Toronto', 'Vancouver', 'Ottawa', 'Montreal'],
    correctAnswer: 2
  },
  {
    id: 6,
    type: 'capital',
    country: 'Japan',
    options: ['Kyoto', 'Tokyo', 'Osaka', 'Nagoya'],
    correctAnswer: 1
  },
  {
    id: 7,
    type: 'flag',
    country: 'Italy',
    options: ['italie.jpg', 'germany.jpg', 'france.jpg', 'usa.jpg'],
    correctAnswer: 0
  },
  {
    id: 8,
    type: 'capital',
    country: 'Australia',
    options: ['Melbourne', 'Sydney', 'Canberra', 'Brisbane'],
    correctAnswer: 2
  },
  {
    id: 9,
    type: 'capital',
    country: 'Brazil',
    options: ['Rio de Janeiro', 'São Paulo', 'Brasília', 'Salvador'],
    correctAnswer: 2
  },
  {
    id: 10,
    type: 'flag',
    country: 'France',
    options: ['bresil.jpg', 'france.jpg', 'pays-bas.jpg', 'italie.jpg'],
    correctAnswer: 1
  },
  {
    id: 11,
    type: 'capital',
    country: 'China',
    options: ['Guangzhou', 'Shanghai', 'Beijing', 'Shenzhen'],
    correctAnswer: 2
  },
  {
    id: 12,
    type: 'capital',
    country: 'United States',
    options: ['New York', 'Los Angeles', 'Washington, D.C.', 'Chicago'],
    correctAnswer: 2
  },
  {
    id: 13,
    type: 'location',
    country: 'Egypt',
    options: ['Tunisia', 'Afghanistan', 'Algeria', 'Egypt'],
    correctAnswer: 3,
    mapCoordinates: [30.0444, 31.2357]
  },
  {
    id: 14,
    type: 'capital',
    country: 'Russia',
    options: ['Moscow', 'Saint Petersburg', 'Novosibirsk', 'Kazan'],
    correctAnswer: 0
  },
  {
    id: 15,
    type: 'flag',
    country: 'Canada',
    options: ['colombie.jpg', 'canada.jpg', 'argentine.jpg', 'faso.jpg'],
    correctAnswer: 1
  },
  {
    id: 16,
    type: 'capital',
    country: 'India',
    options: ['Mumbai', 'New Delhi', 'Bangalore', 'Kolkata'],
    correctAnswer: 1
  },
  {
    id: 17,
    type: 'capital',
    country: 'Nigeria',
    options: ['Lagos', 'Abuja', 'Kano', 'Ibadan'],
    correctAnswer: 1
  },
  {
    id: 18,
    type: 'capital',
    country: 'South Africa',
    options: ['Cape Town', 'Pretoria', 'Johannesburg', 'Durban'],
    correctAnswer: 1
  },
  {
    id: 19,
    type: 'flag',
    country: 'Japan',
    options: ['australie.jpg', 'corée-du-sud.jpg', 'canada.jpg', 'japon.jpg'],
    correctAnswer: 3
  },
  {
    id: 20,
    type: 'location',
    country: 'United Kingdom',
    options: ['United Kingdom', 'Usa', 'France', 'Netherlands'],
    correctAnswer: 0,
    mapCoordinates: [51.5074, -0.1278]
  },
  {
    id: 21,
    type: 'capital',
    country: 'Mexico',
    options: ['Mexico City', 'Guadalajara', 'Monterrey', 'Cancún'],
    correctAnswer: 0
  },
  {
    id: 22,
    type: 'flag',
    country: 'Colombia',
    options: ['chine.jpg', 'colombie.jpg', 'argentine.jpg', 'canada.jpg'],
    correctAnswer: 1
  },
  {
    id: 23,
    type: 'location',
    country: 'Australia',
    options: ['Pakistan', 'Australia', 'Japan', 'South Korea'],
    correctAnswer: 1,
    mapCoordinates: [-35.2809, 149.1300]
  },
  {
    id: 24,
    type: 'capital',
    country: 'Argentina',
    options: ['Buenos Aires', 'Córdoba', 'Rosario', 'Mendoza'],
    correctAnswer: 0
  },
  {
    id: 25,
    type: 'capital',
    country: 'South Korea',
    options: ['incheon', 'Busan', 'Seoul', 'Daegu'],
    correctAnswer: 2
  },
  {
    id: 26,
    type: 'flag',
    country: 'China',
    options: ['chine.jpg', 'japon.jpg', 'corée-du-sud.jpg', 'faso.jpg'],
    correctAnswer: 0
  },
  {
    id: 27,
    type: 'capital',
    country: 'Turkey',
    options: ['Ankara', 'Istanbul', 'Izmir', 'Antalya'],
    correctAnswer: 0
  },
  {
    id: 28,
    type: 'location',
    country: 'Brazil',
    options: ['Brazil', 'Paraguay', 'Venezuela', 'Mexico'],
    correctAnswer: 0,
    mapCoordinates: [-15.8267, -47.9218]
  },
  {
    id: 29,
    type: 'flag',
    country: 'India',
    options: ['inde.jpg', 'australie.jpg', 'faso.jpg', 'italie.jpg'],
    correctAnswer: 0
  },
  {
    id: 30,
    type: 'capital',
    country: 'Kenya',
    options: ['Nairobi', 'Mombasa', 'Kisumu', 'Eldoret'],
    correctAnswer: 0
  }
];


  questions: GeoQuestion[] = [];
  totalQuestions = 20;

  currentIndex = 0;
  answered = false;

  constructor() {
    this.shuffleQuestions();
  }

  get currentQuestion(): GeoQuestion {
    return this.questions[this.currentIndex];
  }

  onAnswer(selectedIndex: number): void {
    this.answered = true;
    const correct = selectedIndex === this.currentQuestion.correctAnswer;
    console.log('Answer selected:', selectedIndex, 'Correct?', correct);
  }

  nextQuestion(): void {
    if (this.currentIndex < this.totalQuestions - 1) {
      this.currentIndex++;
      this.answered = false;
    }
  }

  private shuffleQuestions(): void {
    const shuffled = [...this.allQuestions].sort(() => Math.random() - 0.5);
    this.questions = shuffled.slice(0, this.totalQuestions);
  }
}
