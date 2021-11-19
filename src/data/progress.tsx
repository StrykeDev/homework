import { storage } from '../component/Utilities';

import { ECourseType, getCourses, ICourse } from './courses';
import { getTest } from './tests';

// Local storage entries
const PROGRESS = 'progress';
const TESTS = 'tests';

export interface IProgress extends ICourse {
   value: number;
}

export function getProgress(): IProgress[] {
   return JSON.parse(storage.get(PROGRESS) || '[]');
}

export function initProgress(): void {
   const progress: IProgress[] = getProgress();
   if (progress.length) {
      const courses = getCourses().map((course: ICourse) => {
         const result = progress.findIndex((data: IProgress) => {
            return data.id === course.id;
         });
         if (result === -1) {
            return {
               id: course.id,
               category: course.category,
               name: course.name,
               value: 0,
            };
         }
      });

      const newProgress = [...progress, ...courses];
      storage.set(PROGRESS, JSON.stringify(newProgress));
   } else {
      const newProgress = getCourses().map((course: ICourse) => {
         return {
            id: course.id,
            category: course.category,
            name: course.name,
            value: 0,
         };
      });
      storage.set(PROGRESS, JSON.stringify(newProgress));
   }
}

export function updateScore(id: string, value: number): void {
   const progress = getProgress().map((data) => {
      if (data.id === id) {
         data.value = value;
      }
      return data;
   });
   storage.set(PROGRESS, JSON.stringify(progress));
}

export function updateScoreCategory(
   category: ECourseType,
   value: number,
): void {
   const progress = getProgress().map((data) => {
      if (data.category === category) {
         data.value = value;
      }
      return data;
   });
   storage.set(PROGRESS, JSON.stringify(progress));
}

export function getScore(id: string): IProgress {
   const progress = getProgress().find((data) => {
      if (data.id === id) {
         return data;
      }
   });

   if (progress) {
      return progress;
   } else {
      throw new Error(`Invalid score id: '${id}'`);
   }
}

export interface IProgressSummery {
   category: string;
   value: number;
}

export function getProgressSummery(): IProgressSummery[] {
   const progress = getProgress();
   const progressSummery: IProgressSummery[] = [];

   Object.values(ECourseType).forEach((type) => {
      const values: number[] = [];

      progress.forEach((course) => {
         if (course.category === type) {
            values.push(course.value);
         }
      });

      let value = 0;
      if (values.length) {
         value = values.reduce((total, value) => total + value) / values.length;
      }
      progressSummery.push({ category: type, value: value });
   });

   return progressSummery;
}

export function getProgressSummeryOverall(): number {
   const summery = getProgressSummery();
   let sum = 0;
   summery.forEach((item: IProgressSummery) => {
      sum += item.value;
   });
   return sum / summery.length;
}

export interface ITestScore extends ICourse {
   value: number;
   best: number;
   last: number;
}

export function getTestsScores(): ITestScore[] {
   return JSON.parse(storage.get(TESTS) || '[]');
}

export function getTestScore(id: string): ITestScore | undefined {
   const test = getTestsScores().find((test) => {
      return test.id === id;
   });
   if (test) {
      return test;
   }
   return undefined;
}

export function updateTestScore(id: string, value: number): void {
   const testsScore = getTestsScores();
   const testIndex = testsScore.findIndex((test) => {
      return test.id === id;
   });

   if (testIndex !== -1) {
      testsScore[testIndex].last = testsScore[testIndex].value;
      testsScore[testIndex].value = value;
      if (testsScore[testIndex].best < value) {
         testsScore[testIndex].best = value;
      }
   } else {
      const test = getTest(id);
      testsScore.push({ ...test, value: value, best: value, last: 0 });
   }

   storage.set(TESTS, JSON.stringify(testsScore));
}
