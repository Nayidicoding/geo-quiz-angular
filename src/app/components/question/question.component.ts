import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { GeoQuestion } from '../../models/geography-quiz.interface';
import { CommonModule } from '@angular/common';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [CommonModule, MapComponent],
  template: `
    <div class="question-container" *ngIf="question">
      <app-map
        *ngIf="question.type === 'location'"
        [coordinates]="question.mapCoordinates"
        class="map"
      ></app-map>

      <h2 class="question-text">
        <ng-container *ngIf="question.type === 'location'">
          Imagine you're standing at this map location. What country are you in?
        </ng-container>
        <ng-container *ngIf="question.type !== 'location'">
          {{ question.type | titlecase }} Question on {{ question.country | uppercase }}
        </ng-container>
      </h2>

      <ul class="options">
        <li
          *ngFor="let option of question.options; let i = index"
          (click)="selectAnswer(i)"
          [ngClass]="{
            'selected': i === selectedAnswer,
            'correct': isCorrectAnswer(i),
            'wrong': isWrongAnswer(i)
          }"
        >
          <img
            *ngIf="question.type === 'flag'"
            [src]="'assets/flags/' + option"
            alt="Flag"
            width="80"
            height="50"
            class="flag-img"
          />
          <span *ngIf="question.type !== 'flag'" class="option-text">
            {{ option | titlecase }}
          </span>
        </li>
      </ul>

      <div class="answer-result" *ngIf="selectedAnswer !== null">
        You answered:
        <ng-container *ngIf="question.type === 'flag'; else textAnswer">
          <img
            [src]="'assets/flags/' + question.options[selectedAnswer!]"
            alt="Selected Flag"
            width="80"
            height="50"
            class="flag-img"
          />
        </ng-container>
        <ng-template #textAnswer>
          <strong>{{ question.options[selectedAnswer!] | titlecase }}</strong>
        </ng-template>
        –
        <span
          [ngClass]="{
            'text-success': isCorrectAnswer(selectedAnswer!),
            'text-danger': isWrongAnswer(selectedAnswer!)
          }"
        >
          {{ isCorrectAnswer(selectedAnswer!) ? 'Correct!' : 'Wrong!' }}
        </span>
      </div>
    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

    * {
      font-family: 'Poppins', sans-serif;
    }

    .question-container {
      max-width: 700px;
      margin: 30px auto;
      background-color: #f9f9f9;
      padding: 25px;
      border-radius: 15px;
      box-shadow: 0 6px 18px rgba(0,0,0,0.1);
    }

    .question-text {
      font-size: 1.3rem;
      margin-bottom: 20px;
      text-align: center;
      color: #333;
    }

    .options {
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    li {
      list-style: none;
      cursor: pointer;
      padding: 12px 16px;
      background-color: #ffffff;
      border: 2px solid #e0e0e0;
      border-radius: 10px;
      display: flex;
      align-items: center;
      gap: 15px;
      transition: all 0.3s ease;
    }

    li:hover {
      background-color: #f0f0f0;
      transform: scale(1.01);
    }

    .flag-img {
      border: 1px solid #ccc;
      border-radius: 5px;
    }

    .option-text {
      font-weight: 500;
    }

    .selected {
      border-color: #007bff;
    }

    .correct {
      background-color: #d4edda;
      border-color: #28a745;
      color: #155724;
    }

    .wrong {
      background-color: #f8d7da;
      border-color: #dc3545;
      color: #721c24;
    }

    .answer-result {
      margin-top: 20px;
      font-size: 1rem;
      text-align: center;
    }

    .text-success {
      color: #28a745;
      font-weight: bold;
    }

    .text-danger {
      color: #dc3545;
      font-weight: bold;
    }
  `]
})
export class QuestionComponent implements OnInit, OnChanges {
  @Input() question!: GeoQuestion;
  @Output() answerSelected = new EventEmitter<number>();

  selectedAnswer: number | null = null;

  ngOnInit(): void {
    this.selectedAnswer = null;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['question']) {
      this.selectedAnswer = null;
    }
  }

  selectAnswer(index: number): void {
    if (this.selectedAnswer !== null) return;
    this.selectedAnswer = index;
    this.answerSelected.emit(index);
  }

  isCorrectAnswer(index: number): boolean {
    return this.selectedAnswer !== null && index === this.question.correctAnswer;
  }

  isWrongAnswer(index: number): boolean {
    return this.selectedAnswer !== null &&
           index === this.selectedAnswer &&
           index !== this.question.correctAnswer;
  }
}
