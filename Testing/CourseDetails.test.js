import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CourseDetails from "../screens/CourseDetails/CourseDetails";

describe('CourseDetails', () => {
  const course = {
    title: 'React Native 101',
    description: 'Learn the basics of React Native development',
    additionalDescription:
      'This course covers topics such as UI development, state management, navigation, and more. By the end of the course, you will have the skills to build mobile apps with React Native.',
    instructors: ['John Doe', 'Jane Smith', 'Mike Johnson'],
    duration: '4 weeks',
    modules: [
      {
        name: 'Module 1: Introduction to React Native',
        contents: [
          { order: 1, content: { description: 'Introduction to React Native and its key concepts' } },
          { order: 2, content: { description: 'Setting up the development environment' } },
          { order: 3, content: { description: 'Creating your first React Native app' } },
        ],
      },
      {
        name: 'Module 2: UI Development with React Native',
        contents: [
          { order: 1, content: { description: 'Building user interfaces using React Native components' } },
          { order: 2, content: { description: 'Styling components with CSS-in-JS' } },
          { order: 3, content: { description: 'Handling user input and touch events' } },
        ],
      },
      {
        name: 'Module 3: State Management in React Native',
        contents: [
          { order: 1, content: { description: 'Understanding state and props in React Native' } },
          { order: 2, content: { description: 'Managing state with React Hooks' } },
          { order: 3, content: { description: 'Implementing Redux for state management' } },
        ],
      },
    ],
  };

  
});