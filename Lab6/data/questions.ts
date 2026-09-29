export interface Question {
  id: number;
  question: string;
  answer: boolean;
}

export const QUESTIONS: Question[] = [
  {
    id: 1,
    question: 'React Native allows you to build mobile apps using JavaScript or TypeScript.',
    answer: true,
  },
  {
    id: 2,
    question: 'Expo requires developers to install Xcode to test an app on an Android device.',
    answer: false,
  },
  {
    id: 3,
    question: 'In React Native, the <View> component is equivalent to a <div> in web development.',
    answer: true,
  },
  {
    id: 4,
    question: 'The useState hook can only be used inside class components.',
    answer: false,
  },
  {
    id: 5,
    question: 'React Native uses Flexbox by default with flexDirection set to "column".',
    answer: true,
  },
  {
    id: 6,
    question: 'The <Text> component is optional when displaying strings inside a <View>.',
    answer: false,
  },
  {
    id: 7,
    question: 'StyleSheet.create provides performance optimizations and validates style keys.',
    answer: true,
  },
  {
    id: 8,
    question: 'React Native compiles all JavaScript directly into pure C++ machine code at runtime.',
    answer: false,
  },
  {
    id: 9,
    question: 'Expo Go allows you to run React Native applications without compiling native code locally.',
    answer: true,
  },
  {
    id: 10,
    question: 'Props in React components can be modified directly by child components.',
    answer: false,
  },
];
