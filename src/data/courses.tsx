import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
   faAddressCard,
   faCode,
   faFont,
   faHandPointLeft,
   faSitemap,
   faStream,
   faWrench,
} from '@fortawesome/free-solid-svg-icons';

export enum ECourseType {
   Types = 'Types',
   Operators = 'Operators',
   Pointers = 'Pointers',
   Objects = 'Objects',
   Functions = 'Functions',
   Classes = 'Classes',
   // WinForm = 'WinForm',
}

export function getIconByType(type: ECourseType | string): IconProp {
   switch (type) {
      case ECourseType.Types:
         return faFont;
      case ECourseType.Operators:
         return faWrench;
      case ECourseType.Pointers:
         return faHandPointLeft;
      case ECourseType.Objects:
         return faSitemap;
      case ECourseType.Functions:
         return faStream;
      case ECourseType.Classes:
         return faAddressCard;
      // case ECourseType.WinForm:
      //    return faWindowMaximize;
      default:
         return faCode;
   }
}

export interface ICourse {
   id: string;
   category: ECourseType;
   name: string;
}

export interface ICourseDetails extends ICourse {
   title: string;
   description: string;
   sections: ICourseSection[];
}

export interface ICourseSection {
   title: string;
   description: string;
   example?: string;
}

const courses: ICourseDetails[] = [
   {
      id: 'primitive-types',
      category: ECourseType.Types,
      name: 'Primitive types',
      title: 'Primitive types overview',
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
      id: 'complex-types',
      category: ECourseType.Types,
      name: 'Complex types',
      title: 'Complex types overview',
      description: `This course is under construction.`,
      sections: [],
   },
   {
      id: 'math-operators',
      category: ECourseType.Operators,
      name: 'Math operators',
      title: 'Math operators overview',
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

            Note: They can be chained but it's highly not recommended, you should use setter math operators instead.`,
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
   result = x++++\t\t// result = 0, x = 2, Use x+=2 instead!
   result = ++++++x\t\t// result = 3, x = 3, Use x+=3 instead!`,
         },
      ],
   },
   {
      id: 'condition-operators',
      category: ECourseType.Operators,
      name: 'Condition operators',
      title: 'Condition operators overview',
      description: `Condition operators test the values and return a bool.`,
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
   {
      id: 'basic-pointers',
      category: ECourseType.Pointers,
      name: 'Basic poiners',
      title: 'Basic poiners overview',
      description: `This course is under construction.`,
      sections: [],
   },
   {
      id: 'pointer-to-pointer',
      category: ECourseType.Pointers,
      name: 'Pointer to Pointer',
      title: 'Pointer to Pointer',
      description: `This course is under construction.`,
      sections: [],
   },
   {
      id: 'objects-overview',
      category: ECourseType.Objects,
      name: 'Objects overview',
      title: 'Objects overview',
      description: `This course is under construction.`,
      sections: [],
   },
   {
      id: 'objects-inheritance',
      category: ECourseType.Objects,
      name: 'Object inheritance',
      title: 'Object inheritance',
      description: `This course is under construction.`,
      sections: [],
   },
   {
      id: 'functions-overview',
      category: ECourseType.Functions,
      name: 'Functions overview',
      title: 'Functions overview',
      description: `This course is under construction.`,
      sections: [],
   },
   {
      id: 'recursive-functions',
      category: ECourseType.Functions,
      name: 'Recursive functions',
      title: 'Recursive functions',
      description: `This course is under construction.`,
      sections: [],
   },
   {
      id: 'classes-overview',
      category: ECourseType.Classes,
      name: 'Classes overview',
      title: 'Classes overview',
      description: `This course is under construction.`,
      sections: [],
   },
   {
      id: 'class-inheritance',
      category: ECourseType.Classes,
      name: 'Class inheritance',
      title: 'Class inheritance',
      description: `This course is under construction.`,
      sections: [],
   },
];

export function getCourses(): ICourse[] {
   return courses;
}

export function getCourse(id: string): ICourse {
   const course = courses.find((course: ICourse) => {
      return course.id === id;
   });

   if (course) {
      return course;
   } else {
      throw new Error(`Invalid course requested id: '${id}'.`);
   }
}

export function getCourseDetails(id: string): ICourseDetails {
   const course = courses.find((course: ICourse) => {
      return course.id === id;
   });

   if (course) {
      return course;
   } else {
      throw new Error(`Invalid course requested id: '${id}'.`);
   }
}
