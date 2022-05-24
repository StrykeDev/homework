import { Exception } from '../utils/Exception';

export enum ECourseType {
   Types = 'Types',
   Operators = 'Operators',
   Pointers = 'Pointers',
   Objects = 'Objects',
   Functions = 'Functions',
   Events = 'Events',
}

export interface ICourse {
   id: string;
   category: ECourseType;
   name: string;
   available: boolean;
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
      name: 'Primitives',
      available: true,
      title: 'Primitive types',
      description: `Primitive types are the most basic types there is, they are the building blocks of almost everything.
      They are "pass by value", meaning that when passing a primitive type the returned value will be the actual value, unlike "pass by reference" which will return the address in memory.`,
      sections: [
         {
            title: 'Boolean',
            description: `Booleans are mainly used in comparison operations.

               bool - takes 2 bytes of memory, it has only 2 possible values: true or false.`,
            example: `// Declaration and usage
   bool isOnline = true;

   if (isOnline) {
      Console.WriteLine("Connection established!");
   }`,
         },
         {
            title: `Numerical`,
            description: `int and double are the main numerical types, they represent numbers.
               Each one has it's use case, typically we want to use the smallest type possible.
      
               int - uses 4 bytes of memory, it can hold only whole numbers.
               Mainly use for counting stuff.
      
               double - uses 8 bytes of memory, it can hold decimal numbers.
               Mainly use for stuff that requires great precision.
            

               There are also less common numerical types:

               short - Same as int but smaller, uses 2 bytes.

               long - Same as int but larger, can use upto 8 bytes. (4 bytes on x86 systems, 8 bytes on x64 systems)

               float - Same as double but smaller, uses 4 bytes of memory.

               decimal - Same as double but uses base 10 and use 16 bytes of memory.
               It store the values in the same way that we humans use them, for example 0.5 is 0.1 in base 2 and 0.5 in base 10.
               Mainly use for communicating between hardware devices and for currency.
               
               char - Same as int but much smaller, uses 1 byte.
               It store whole numbers which represent ASCII characters.
               Mainly used for storing single letter.`,

            example: `// Declaration
   int      cities   = 4522;
   short    age      = 32;
   long     serial   = 42489434l;\t// The l at the end is mandatory

   float    ms       = 450.562f;\t// The F at the end is mandatory
   double   distance = 4135.33d;\t// The d at the end is optional

   decimal  balance  = 4.0m;\t\t// The M at the end is mandatory
   char     letter   = 'x';\t\t// The '' mandatory`,
         },
      ],
   },
   {
      id: 'reference-types',
      category: ECourseType.Types,
      name: 'Reference',
      available: true,
      title: 'Reference types',
      description: `Reference types are complex types that are built out of primitive types.
      They are "pass by reference", meaning that when passing a reference type the returned value will be the address in memory (reference) of the original value, unlike "pass by value" which will return the actual value.`,
      sections: [
         {
            title: 'String',
            description: `String are a collection of chars, they manly used for human readable text.`,
            example: `// Declaration and usage
   bool message = "Hello World!";\t// The "" is mandatory
   Console.WriteLine(message);\t\t// Output: Hello World!`,
         },
         {
            title: 'Class',
            description: `Class is a collection of methods(Functions) and properties(Variables)`,
            example: `// Declaration
   class MyClass {

      // This is a private property accessible only to this class
      private int myInt;

      // This is a public property which can be read and write by anything, Highly not recommended!
      public string myString;

      // This is a constructor method
      public MyClass() {
         this.Zero();
         this.myString = "nothing";
      }

      // This is a constructor method that takes arguments
      public MyClass(int number, string msg) {
         this.myInt = number;
         this.myString = msg;
      }

      // This is a private method accessible only to this class
      private void Zero() {
         myInt = 0;
      }

      // This is a public method which can be called by anything
      public int GetInt() {
         return myInt;
      }
   }`,
         },
         {
            title: 'Array',
            description: `Array is a fixed size collection of values of the same type.`,
            example: `// Declaration
   // Both [] after the type is mandatory, the number inside the second [] represent the size of the array and it's also mandatory
   int[] numbersA = new int[3];     // numbersA = 0, 0, 0

   // The optical {} allow us to initialize the array with values
   // When initializing an array with values it's not mandatory to specify the size of the array but its highly recommended.
   int[] numbersB = new int[3] { 1, 2, 3 };     // numbersB = 1, 2, 3

   // This example is the same as the one above it, though it's not recommended
   int[] numbersC = { 1, 2, 3 };    // numbersC = 1, 2, 3

   // In this example both arrays (A and D) will be the exact same, changing one will change the other
   int[] numbersD = numbersA;    // numbersD = numbersA = 0, 0, 0

   double[] moreNumbersA = new double[2];                // moreNumbersA = 0, 0
   double[] moreNumbersB = new double[2] { 0.1, 0.2 };   // moreNumbersB = 0.1, 0.2
   char[] charsA = new char[3];                          // charsA = '0', '0', '0'
   char[] charsB = new char[3] { 'A', 'B', 'C' };        // charsB = 'A', 'B', 'C'
   MyClass[] myClasses = new MyClass[3];                 // myClasses = null, null, null (The classes need to be initialize separately)

// Usage
   Console.WriteLine(numbersB[1]);     // Output: 2
   Console.WriteLine(moreNumbersB[0]); // Output: 0.1
   Console.WriteLine(charsB[2]);       // Output: C

   // MyClass implementation:
   // class MyClass {
   //    PrintHello() {
   //       Console.WriteLine("Hello");
   //    }  
   // }
   myClasses[0] = new MyClass();
   myClasses[0].PrintHello();          // Output: Hello

   myClasses[1].PrintHello();          // Error: Class MyClass isn't initialized, PrintHello doesn't exist
   `,
         },
      ],
   },
   {
      id: 'math-operators',
      category: ECourseType.Operators,
      name: 'Math',
      available: true,
      title: 'Math operators',
      description: `Math operators allow us to preform math operations.`,
      sections: [
         {
            title: 'Basic math operators',
            description: `Their soul purpose is to do basic math operations.`,
            example: `// Usage
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
   double result = 10;\t// This value will be used in the following examples
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

   result = x++;\t// result = 0, x = 1
   result = x--;\t// result = 0, x = -1
   result = ++x;\t// result = 1, x = 1
   result = --x;\t// result = -1, x = -1
   
// Other types
   double myDouble = 0.0;
   myDouble++;\t\t// myDouble = 1.0

   float myFloat = 0.0f;
   myFloat++;\t\t// myFloat = 1.0f

// Chaining
   x++++;\t\t// x = 2, Use x+=2 instead!
   x++++++;\t\t// x = 3, Use x+=3 instead!`,
         },
      ],
   },
   {
      id: 'condition-operators',
      category: ECourseType.Operators,
      name: 'Condition',
      available: true,
      title: 'Condition operators',
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
      name: 'Overview',
      available: false,
      title: 'Pointers overview',
      description: `This course is under construction.`,
      sections: [],
   },
   {
      id: 'advanced-pointers',
      category: ECourseType.Pointers,
      name: 'Advanced',
      available: false,
      title: 'Advanced overview',
      description: `This course is under construction.`,
      sections: [],
   },
   {
      id: 'objects-overview',
      category: ECourseType.Objects,
      name: 'Overview',
      available: false,
      title: 'Objects overview',
      description: `This course is under construction.`,
      sections: [],
   },
   {
      id: 'objects-inheritance',
      category: ECourseType.Objects,
      name: 'Inheritance',
      available: false,
      title: 'Object inheritance',
      description: `This course is under construction.`,
      sections: [],
   },
   {
      id: 'functions-overview',
      category: ECourseType.Functions,
      name: 'Overview',
      available: false,
      title: 'Functions overview',
      description: `This course is under construction.`,
      sections: [],
   },
   {
      id: 'recursive-functions',
      category: ECourseType.Functions,
      name: 'Recursion',
      available: false,
      title: 'Recursive functions',
      description: `This course is under construction.`,
      sections: [],
   },
   {
      id: 'events-overview',
      category: ECourseType.Events,
      name: 'Overview',
      available: false,
      title: 'Events overview',
      description: `This course is under construction.`,
      sections: [],
   },
   {
      id: 'async-events',
      category: ECourseType.Events,
      name: 'Asynchronous',
      available: false,
      title: 'Async events',
      description: `This course is under construction.`,
      sections: [],
   },
];

export function getCourses(): ICourse[] {
   return [...courses];
}

export function getCourse(id: string): ICourse {
   const course = courses.find((course: ICourse) => {
      return course.id === id;
   });

   if (course) {
      return course;
   } else {
      throw Exception.idNotFound('course', id);
   }
}

export function getCourseDetails(id: string): ICourseDetails {
   const course = courses.find((course: ICourse) => {
      return course.id === id;
   });

   if (course) {
      return course;
   } else {
      throw Exception.idNotFound('course', id);
   }
}
