import { Exception } from '../utils/Exception';

import { ECourseType, ICourse } from './courses';

export interface ITestDetails extends ICourse {
   title: string;
   description: string;
   subjects: string[];
   questions: ITestQuestion[];
}

export interface ITestQuestion {
   question: string;
   description: string;
   options: string[];
   hint?: string;
   answer: number;
}

const tests: ITestDetails[] = [
   {
      id: 'types-test',
      category: ECourseType.Types,
      name: 'Declaration and usage',
      available: true,
      title: 'Types declaration and usage',
      description: 'This test focus on types declaration and usage.',
      subjects: ['primitive-types', 'complex-types'],
      questions: [
         {
            question: 'Which variable declaration is most suited for counting whole apples?',
            description: '',
            options: ['double apples = 3;', 'apples = 3;', 'int apples = 3;', 'apples = 3.0;'],
            answer: 2,
            hint: 'We want to declare a variable that store whole numbers.',
         },
         {
            question: 'Which variable declaration is most suited for an account balance?',
            description: '',
            options: [
               'balance = 32163.51;',
               'int balance = 32163.51;',
               'float balance = 32163.51;',
               'double balance = 32163.51;',
            ],
            answer: 3,
            hint: 'We want to declare a variable that can hold large decimal numbers.',
         },
         {
            question: 'Which variable declaration is correct for type int?',
            description: '',
            options: ['int dogs = 2;', 'int dogs = 2i;', 'int dogs = 2f;', 'int dogs = 2d;'],
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
               "double coinValue = '0.00005649';",
               'double coinValue = 0.00005649i;',
               'double coinValue = 0.00005649f;',
               'double coinValue = 0.00005649d;',
            ],
            answer: 3,
         },
         {
            question: 'Which variable declaration is correct for type char?',
            description: '',
            options: ['char letter = A;', 'char letter = "A";', "char letter = 'A';", 'char letter = `A`;'],
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
      id: 'operators-test',
      category: ECourseType.Operators,
      name: 'Math and condition usage',
      available: true,
      title: 'Operators usage',
      description: 'This test focus on math and condition operators.',
      subjects: ['math-operators', 'condition-operators'],
      questions: [
         {
            question: 'Which statement will result in "x = y + 1" AND "y = y + 1"?',
            description: '',
            options: ['double x = y;', 'double x = y + 1;', 'double x = y++;', 'double x = ++y;'],
            answer: 3,
            hint: 'We want to increase "y" by 1 and pass it to "x".',
         },
         {
            question: 'Which statement will NOT give us the message "Hello world"?',
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
            question: 'Which condition is true?',
            description: '',
            options: ['true != true', 'true == false', 'true != !true', 'false == !false'],
            answer: 2,
         },
         {
            question: 'Which condition is true?',
            description: '',
            options: [
               '(10 > 10) && (10 < 10)',
               '(10 > 10) || (10 < 10)',
               '(10 >= 10) == (10 <= 10)',
               '(10 >= 10) != (10 <= 10)',
            ],
            answer: 2,
         },
         {
            question: 'Which condition is true?',
            description: '',
            options: [
               '(!true) && (10 < 10)',
               '(10 > 10) || (!false)',
               '(!true) == (10 <= 10)',
               '(10 >= 10) != (!true)',
            ],
            answer: 1,
         },
         {
            question: 'Which condition is true?',
            description: '',
            options: [
               'true && false && true && false',
               'true || false || true || false',
               'true == false == true == false',
               'true == false != true == false',
            ],
            answer: 1,
         },
         {
            question: 'Which condition is true?',
            description: '',
            options: [
               '(true != true) && (true == false)',
               '(true != true) || (true == false)',
               '(true != true) == (true == false)',
               '(true != true) != (true == false)',
            ],
            answer: 2,
         },
         {
            question: 'Which condition is false?',
            description: '',
            options: [
               '(true == true) && (true != false)',
               '(true != true) || (true != false)',
               '(!true != true) == (true == !false)',
               '(true == true) != (true == !false)',
            ],
            answer: 3,
         },
         {
            question: 'Which condition is false?',
            description: '',
            options: [
               '(true ^^ !true) && (true == !false)',
               '(true == !true) || (true && !false)',
               '(true && !true) ^^ (true || !false)',
               '(true || !true) == (true ^^ !false)',
            ],
            answer: 3,
         },
         {
            question: 'Which condition is false?',
            description: '',
            options: [
               '(true || true) && !(true || true)',
               '!(true ^^ true) || (true ^^ false)',
               '(true && true) ^^ !(true || false)',
               '!(true || true) == (true && false)',
            ],
            answer: 0,
         },
      ],
   },
   {
      id: 'pointers-test',
      category: ECourseType.Pointers,
      name: 'Declaration and usage',
      available: false,
      title: 'Pointers declaration and usage',
      subjects: [],
      description: 'This test is under construction.',
      questions: [],
   },
   {
      id: 'objects-test',
      category: ECourseType.Objects,
      name: 'Declaration, usage and inheritance',
      available: false,
      title: 'Objects declaration, usage and inheritance',
      subjects: [],
      description: 'This test is under construction.',
      questions: [],
   },
   {
      id: 'functions-test',
      category: ECourseType.Functions,
      name: 'Declaration and recursion',
      available: false,
      title: 'Functions declaration and recursion',
      description: 'This test is under construction.',
      subjects: [],
      questions: [],
   },
   {
      id: 'events-test',
      category: ECourseType.Events,
      name: 'Declaration and usage',
      available: false,
      title: 'Events declaration and usage',
      description: 'This test is under construction.',
      subjects: [],
      questions: [],
   },
];

export function getTests(): ICourse[] {
   return [...tests];
}

export function getTest(id: string): ICourse {
   const course = tests.find((test: ICourse) => {
      return test.id === id;
   });

   if (course) {
      return course;
   } else {
      throw Exception.idNotFound('test', id);
   }
}

export function getTestDetails(id: string): ITestDetails {
   const test = tests.find((test: ICourse) => {
      return test.id === id;
   });

   if (test) {
      return test;
   } else {
      throw Exception.idNotFound('test', id);
   }
}
