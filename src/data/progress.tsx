import { LocalStorage } from '../services/LocalStorage';

import { PROGRESS, TESTS } from '../utils/constants';

import { ECourseType, getCourses, ICourse } from './courses';

export type TProgress = Map<string, number>;

export function getProgress(): TProgress {
   return LocalStorage.getMap(PROGRESS);
}

export function getScore(id: string): number {
   const progress = getProgress();
   return progress.get(id) || 0;
}

export function updateScore(id: string, value: number): void {
   const progress = getProgress();
   progress.set(id, value);
   LocalStorage.setMap(PROGRESS, progress);
}

export function getProgressSummary(): TProgress {
   const progress = getProgress();
   const courses = getCourses();
   const summary = new Map();

   Object.values(ECourseType).forEach((type: string) => {
      let score = 0;
      let divider = 0;
      courses.forEach((course: ICourse) => {
         if (course.category === type) {
            score += progress.get(course.id) || 0;
            divider++;
         }
      });
      summary.set(type, score / divider);
   });

   return summary;
}

export function getProgressOverall(): number {
   const summary = getProgressSummary();
   const scores = summary.values();

   let done = undefined;
   let value = 0;
   let sum = 0;

   do {
      ({ value, done } = scores.next());
      sum += value || 0;
   } while (!done);

   return sum / summary.size;
}

export interface ITestScore {
   value: number;
   best: number;
   last: number;
}

export type TTestScore = Map<string, ITestScore>;

export function getTestsScores(): TTestScore {
   return LocalStorage.getMap(TESTS);
}

export function getTestScore(id: string): ITestScore | null {
   const scores = getTestsScores();
   return scores.get(id) || null;
}

export function updateTestScore(id: string, value: number): void {
   const scores = getTestsScores();
   let score = scores.get(id);
   if (score) {
      score.last = score.value;
      score.value = value;
      if (score.best < value) {
         score.best = value;
      }
   } else {
      score = {
         value: value,
         best: value,
         last: 0,
      };
   }
   scores.set(id, score);
   LocalStorage.setMap(TESTS, scores);
}
