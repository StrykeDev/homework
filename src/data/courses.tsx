import React from 'react';
import { v4 as uuid } from 'uuid';

// Local storage entries
const PROGRESS = 'progress';

// Courses
// '/learn/advanced_types';
// '/learn/bitwise_operators';
// '/learn/objects';

export interface ICourse {
   id: string;
   category: string;
   name: string;
   title: string;
   description: string;
   sections: ICourseSection[];
}

export interface ICourseSection {
   title: string;
   description: string;
   example?: string;
}

export const courses = [
   {
      id: 'primitive-types',
      category: 'Types',
      name: 'Primitive types',
      title: 'Primitive types',
      description: `Primitive types are the most basic types.`,
      sections: [
         {
            title: 'bool',
            description: `bool(Boolean) is the smallest type, it has only 2 possible states: True or False.
               Booleans are mainly used in comparison operations.`,
            example: `// Declaration and usage
   bool isOnline = true;

   if (isOnline) {
      Console.WriteLine("Connection established!");
   }`,
         },
         {
            title: `int, float and double`,
            description: `int(integer), float, and double are numerical types, they represent numbers.
               Each one has it's use case, typically we want to use the smallest type possible.
      
               int is the smallest one, it can hold only whole numbers.
               Mainly use for counting stuff, like days, age, number of objects, indexes, etc..
      
               float is in the middle, it can hold decimal numbers, it's much lighter than double but less accurate.
               Mainly use for stuff that doesn't require great precision and simple math.
               Input number MUST use one of this formats: 0f, 0.0f
      
               double is the largest one, it can hold decimal numbers, it's heavy but accurate.
               Mainly use for stuff that requires great precision like balance and currency.`,
            example: `// Declaration
   int age = 30;
   float distance = 450.562f;
   double balance1 = 1115313.315134d; // the d at the end is optional`,
         },
         {
            title: `char and string`,
            description: `char and strings types used for representing letter or text.
      
               char can hold only 1 letter which make it the smaller one.
               Mainly used for storing letters and symbols, useful when dealing with ASCII.
               Input letter MUST use this format: 'x'
               
               string can hold from 1 letter to full sentences, it's much larger and it grow by the amount of text that it's storing.
               Mainly used for text.
               Input text MUST use this format: "Text"`,
            example: `// Declaration
   char theLetterB = 'B';
   string message = "Oh no we are out of milk!";`,
         },
      ],
   },
   {
      id: 'math-operators',
      category: 'Operators',
      name: 'Math operators',
      title: 'Math operators',
      description: `Math operators allow us to preform math operations.`,
      sections: [
         {
            title: 'Basic math operators',
            description: `Their soul purpose is to do basic math operations.`,
            example: `// Usage
   double result = 0;
   
   result = 5 + 10;\t// result = 15
   result = 5 - 10;\t// result = -5
   result = 5 * 10;\t// result = 50
   result = 5 / 10;\t// result = 0.5
   result = 5 % 10;\t// result = 5`,
         },
         {
            title: `Setter math operators`,
            description: `Those operators work the same as the basic ones, the only different is that they use the variable value and then set the variable value to the result.
            Essentially "x += y" is the same as "x = x + y".`,
            example: `// Usage
   double result = 10;
   
   result += 5;\t\t// result = 15
   result -= 5;\t\t// result = 5
   result *= 5;\t\t// result = 50
   result /= 5;\t\t// result = 2
   result %= 5;\t\t// result = 0`,
         },
         {
            title: `Shortcut math operators`,
            description: `There are shortcuts to save us some time and to help us with cleaner code.
            The 2 main ones are "++" and "--" they are used to add or subtract 1 from from the givin variable and set its value to the result.
            Essentially "x++" is the same as "x = x + 1".

            In most cases we write them after the variable name like that: index++, in this case the returned value will be the original value before adding 1.
            If we want to return the value after adding 1 we will write them before the variable name like that: ++index.
            
            Note: They will always add 1 even if the variable type is float or double.

            Note: The can be chained but it's highly not recommended, you should use setter math operators instead.`,
            example: `// Usage
   int x = 0;
   int result = 0;

   result = x++\t\t// result = 0, x = 1
   result = x--\t\t// result = 0, x = -1
   result = ++x\t\t// result = 1, x = 1
   result = --x\t\t// result = -1, x = -1
   
// Other types
   double myDouble = 0.0
   myDouble++\t\t// myDouble = 1.0

   float myFloat = 0.0f
   myFloat++\t\t// myFloat = 1.0f

// Chaining
   y = x++++\t\t// y = 0, x = 2, Use x+=2 instead!
   y = x++++++\t\t// y = 0, x = 3, Use x+=3 instead!`,
         },
      ],
   },
   {
      id: 'condition-operators',
      category: 'Operators',
      name: 'Condition operators',
      title: 'Condition operators',
      description: `Condition operators the values and return a bool.`,
      sections: [
         {
            title: 'Basic condition operators',
            description: `Those operators take 2 values and test them.
            
            ">" and "<" Check if the value is greater than or less than.
            ">=" and "<=" Check if the value is greater than or less than or equal(same as "==").
            "==" return true if both values are the same, else false.
            "!=" return false if both values are the same, else true.`,
            example: `// Usage
   bool result = false;
   
// With numbers
   result = 5 > 10;\t\t// result = false
   result = 5 < 10;\t\t// result = true
   result = 5 >= 10;\t\t// result = false
   result = 5 <= 10;\t\t// result = true
   result = 5 == 10;\t\t// result = false
   result = 5 != 10;\t\t// result = true
   
// With text
   result = "Hello" == "World";\t// result = false
   result = 'A' != 'B';\t\t// result = true`,
         },
         {
            title: `&& operator`,
            description: `The AND operator return true if BOTH conditions are true.`,
            example: `// Usage
   bool result = false;
   
   result = true && true;\t// result = true
   result = true && false;\t// result = false
   result = false && true;\t// result = false
   result = false && false;\t// result = false`,
         },
         {
            title: `|| operator`,
            description: `The OR operator return true if ONE of the conditions is true.`,
            example: `// Usage
   bool result = false;
   
   result = true || true;\t// result = true
   result = true || false;\t// result = true
   result = false || true;\t// result = true
   result = false || false;\t// result = false`,
         },
         {
            title: `^^ operator`,
            description: `The XOR operator return true if ONE of the conditions is true but NOT BOTH.`,
            example: `// Usage
   bool result = false;
   
   result = true ^^ true;\t// result = true
   result = true ^^ false;\t// result = false
   result = false ^^ true;\t// result = false
   result = false ^^ false;\t// result = false`,
         },
         {
            title: `! operator`,
            description: `The NOT operator return true if the condition is false.`,
            example: `// Usage
   bool result = false;
   
   result = !true;\t\t// result = false
   result = !false;\t\t// result = true`,
         },
      ],
   },
];

export function getCourseIndex(id: string) {
   return courses.findIndex((course) => course.id === id);
}

// Tests
export interface ITest {
   id: string;
   category: string;
   name: string;
   title: string;
   description: string;
   questions: ITestQuestion[];
}

export interface ITestQuestion {
   question: string;
   description: string;
   options: string[];
   hint?: string;
   answer: number;
}

export const tests = [
   {
      id: 'variables-types',
      category: 'Type',
      name: 'Variables declaration',
      title: 'Variables declaration',
      description: '',
      questions: [
         {
            question:
               'Which variable declaration is most suited for counting whole apples?',
            description: '',
            options: [
               'double apples = 3;',
               'apples = 3;',
               'int apples = 3;',
               'apples = 3.0;',
            ],
            answer: 2,
            hint: 'We want to declare a variable that store whole numbers.',
         },
         {
            question:
               'Which variable declaration is most suited for an account balance?',
            description: '',
            options: [
               'balance = 32,163.51;',
               'int balance = 32,163.51;',
               'float balance = 32,163.51;',
               'double balance = 32,163.51;',
            ],
            answer: 3,
            hint: 'We want to declare a variable that can hold large decimal numbers.',
         },
         {
            question: 'Which variable declaration is correct for type int?',
            description: '',
            options: [
               'int dogs = 2;',
               'int dogs = 2i;',
               'int dogs = 2f;',
               'int dogs = 2d;',
            ],
            answer: 0,
         },
         {
            question: 'Which variable declaration is correct for type float?',
            description: '',
            options: [
               'float lengthInMeters = 2.0;',
               'float lengthInMeters = 2.0i;',
               'float lengthInMeters = 2.0f;',
               'float lengthInMeters = 2.0d;',
            ],
            answer: 2,
         },
         {
            question: 'Which variable declaration is correct for type double?',
            description: '',
            options: [
               "float coinValue = '0.00005649';",
               'float coinValue = 0.00005649i;',
               'float coinValue = 0.00005649f;',
               'float coinValue = 0.00005649d;',
            ],
            answer: 3,
         },
         {
            question: 'Which variable declaration is correct for type char?',
            description: '',
            options: [
               'char letter = A;',
               'char letter = "A";',
               "char letter = 'A';",
               'char letter = `A`;',
            ],
            answer: 2,
         },
         {
            question: 'Which variable declaration is correct for type string?',
            description: '',
            options: [
               'string msg = Hello world!;',
               'string msg = "Hello world!";',
               "string msg = 'Hello world!';",
               'string msg = `Hello world!`;',
            ],
            answer: 1,
         },
         {
            question: 'Which variable declaration is incorrect?',
            description: '',
            options: [
               'string greeting = "Welcome!";',
               "char grade = 'C';",
               'int flightNumber = 526EB01;',
               'double pie = 3.14;',
            ],
            answer: 2,
            hint: 'Look at the values.',
         },
      ],
   },
   {
      id: 'operators-usage',
      category: 'Operators',
      name: 'Operators',
      title: 'Operators',
      description: '',
      questions: [
         {
            question: 'Which statement will increase x by 5?',
            description: '',
            options: [
               'double x = 5;',
               'double x = x + 5;',
               'double x = y + 5;',
               'double x = +5;',
            ],
            answer: 1,
         },
         {
            question: 'Which shortest statement will multiply x by 5?',
            description: '',
            options: [
               'double x = 5;',
               'double x = x * 5;',
               'double x *= 5;',
               'double x++++++++++;',
            ],
            answer: 2,
         },
         {
            question:
               'Which statement will result in "x = y + 1" AND "y = y + 1"?',
            description: '',
            options: [
               'double x = y;',
               'double x = y + 1;',
               'double x = y++;',
               'double x = ++y;',
            ],
            answer: 3,
            hint: 'We want to increase "y" by 1 and pass it to "x".',
         },
         {
            question:
               'Which statement will NOT give us the message "Hello world"?',
            description: '',
            options: [
               'Console.WriteLine("Hello world");',
               'Console.WriteLine("Hello " + "world");',
               'Console.WriteLine("Hello" + " world");',
               'Console.WriteLine("Hello" + "world");',
            ],
            answer: 3,
            hint: 'Pay attention to the spaces.',
         },
         {
            question:
               'Which add operation will give us the message "Hello world"?',
            description: '',
            options: [
               'Console.WriteLine("Hello world");',
               'Console.WriteLine("Hello" + "world");',
               'Console.WriteLine("Hello " + "world");',
               'Console.WriteLine("Hello " + " world");',
            ],
            answer: 3,
            hint: 'We need to use the + operator and pay attention to the spaces.',
         },
         {
            question: 'Which statement is true?',
            description: '',
            options: ['true < false;', '5 > 10;', '5 != 10;', "'A' == 'B';"],
            answer: 2,
         },
         {
            question: 'Which statement is true?',
            description: '',
            options: [
               'true && false;',
               'false || false;',
               'true ^^ true;',
               '!false;',
            ],
            answer: 3,
         },
         {
            question: 'Which statement is true?',
            description: '',
            options: [
               'true != true',
               'true == false',
               'true != !true',
               'false == !false',
            ],
            answer: 2,
         },
      ],
   },
];

export function getTestIndex(id: string) {
   return tests.findIndex((test) => test.id === id);
}

// Score
export interface IScore {
   id: string;
   category: string;
   value: number;
}

export function initProgress() {
   const rawProgress = window.localStorage.getItem(PROGRESS);
   if (rawProgress) {
      const progress = JSON.parse(rawProgress);
      const fillerProgress = courses.map((course: ICourse) => {
         const res = progress.indexOf((data: IScore) => {
            return data.id == course.id;
         });
         if (res === -1) {
            return {
               id: course.id,
               category: course.category,
               value: 0,
            };
         }
      });
      const newProgress = [...progress, ...fillerProgress];
      window.localStorage.setItem(PROGRESS, JSON.stringify(newProgress));
   } else {
      const newProgress = courses.map((course: ICourse) => {
         return {
            id: course.id,
            category: course.category,
            value: 0,
         };
      });
      window.localStorage.setItem(PROGRESS, JSON.stringify(newProgress));
   }
}

export function updateScore(newScore: IScore) {
   const rawProgress = window.localStorage.getItem(PROGRESS);
   if (rawProgress) {
      const progress = JSON.parse(rawProgress).filter((score: IScore) => {
         return score.id != newScore.id;
      });
      window.localStorage.setItem(
         PROGRESS,
         JSON.stringify([...progress, newScore]),
      );
   } else {
      window.localStorage.setItem(PROGRESS, JSON.stringify([newScore]));
   }
}

export function getProgress(): IScore[] {
   const data = window.localStorage.getItem(PROGRESS);
   return data ? JSON.parse(data) : [];
}

export interface IScoreSummery {
   category: string;
   score: number;
}

export function getProgressSummery(): IScoreSummery[] {
   const progress = getProgress();
   const progressSummery: { category: string; scores: number[] }[] = [];

   progress.forEach((item: IScore) => {
      const scoreIndex = progressSummery.findIndex(
         (score) => score.category === item.category,
      );

      if (scoreIndex === -1) {
         progressSummery.push({
            category: item.category,
            scores: [item.value],
         });
      } else {
         progressSummery[scoreIndex].scores.push(item.value);
      }
   });

   const avgSummery = progressSummery.map((item) => {
      const avgScore =
         item.scores.reduce((total, curr) => total + curr) / item.scores.length;
      return { category: item.category, score: avgScore };
   });

   const sortedSummery = avgSummery.sort((x, y) =>
      x.category.localeCompare(y.category),
   );

   let overall = 0;
   sortedSummery.forEach((item) => {
      overall += item.score;
   });

   overall = overall / sortedSummery.length;

   return [{ category: 'Overall', score: overall }, ...sortedSummery];
}

export function textToParagraph(text: string): React.ReactElement[] {
   const lines = text.split('\n');
   return lines.map((line) => {
      return (
         <span key={uuid()}>
            {line}
            <br />
         </span>
      );
   });
}
