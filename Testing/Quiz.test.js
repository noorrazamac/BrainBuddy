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

  test('should handle option selection and show correct feedback', async () => {
    const question = mockQuestions[0];
    const correctAnswer = question.correctAnswer;
    const wrongAnswer = question.options.find((option) => option !== correctAnswer);
  
    const { getByText } = render(<Quiz />);
  
    fireEvent.press(getByText(wrongAnswer));
    await waitFor(() => expect(getByText(`Incorrect! 😞 The correct answer is ${correctAnswer}.`)).toBeTruthy());
  
  });

  test('should update total score correctly when selecting correct answers', async () => {
    const { getByText } = render(<Quiz />);
    let currentQuestionIndex = 0;
  
    for (let i = 0; i < mockQuestions.length; i++) {
      const question = mockQuestions[currentQuestionIndex];
      const correctAnswer = question.correctAnswer;
  
      fireEvent.press(getByText(correctAnswer));
      await waitFor(() => expect(getByText('Correct! 🎉')).toBeTruthy());
  
      fireEvent.press(getByText('Next Question'));
      currentQuestionIndex++;
    }
  });

  
});
