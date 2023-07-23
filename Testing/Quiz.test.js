import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Quiz from '../screens/Quiz/quiz'; // Replace with the correct path to the Quiz component

// Mock questions data
const mockQuestions = [
    {
        id: 1,
        question: 'What is the capital of France?',
        options: ['Berlin', 'Paris', 'Madrid', 'Rome'],
        correctAnswer: 'Paris',
      },
      {
        id: 2,
        question: 'What is 5 x 10 + 30?',
        options: ['54', '85', '80'],
        correctAnswer: '80',
      },
      {
        id: 3,
        question: 'Which of the following is a programming language?',
        options: ['HTML', 'CSS', 'JavaScript'],
        correctAnswer: 'JavaScript',
      },
      {
        id: 4,
        question: 'What is the capital of Germany?',
        options: ['Berlin', 'Paris', 'Madrid', 'Rome'],
        correctAnswer: 'Berlin',
      },
      {
        id: 5,
        question: 'What is 8 + 5?',
        options: ['10', '12', '13'],
        correctAnswer: '13',
      },
      {
        id: 6,
        question: 'Which planet is closest to the Sun?',
        options: ['Venus', 'Mars', 'Mercury'],
        correctAnswer: 'Mercury',
      },
      {
        id: 7,
        question: 'What is the largest mammal?',
        options: ['Elephant', 'Blue Whale', 'Giraffe'],
        correctAnswer: 'Blue Whale',
      },
      {
        id: 8,
        question: 'Which gas do plants absorb from the atmosphere?',
        options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen'],
        correctAnswer: 'Carbon Dioxide',
      },
      {
        id: 9,
        question: 'What is the chemical symbol for water?',
        options: ['H2O', 'CO2', 'NaCl'],
        correctAnswer: 'H2O',
      },
      {
        id: 10,
        question: 'What is the largest ocean on Earth?',
        options: ['Indian Ocean', 'Atlantic Ocean', 'Pacific Ocean'],
        correctAnswer: 'Pacific Ocean',
      },


];

describe('Quiz', () => {
  test('should render the first question and options', async () => {
    const { getByText } = render(<Quiz />);
    const question = mockQuestions[0];
    expect(getByText(question.question)).toBeTruthy();
    question.options.forEach(option => {
      expect(getByText(option)).toBeTruthy();
    });
  });


  
});
