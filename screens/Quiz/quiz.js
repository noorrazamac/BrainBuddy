import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const questions = [
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
];

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleOptionSelection = (selectedAnswer) => {
    setSelectedOption(selectedAnswer);

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrectAnswer = Array.isArray(currentQuestion.correctAnswer)
      ? currentQuestion.correctAnswer.some((item) => item.answer === selectedAnswer)
      : currentQuestion.correctAnswer === selectedAnswer;
    setIsCorrect(isCorrectAnswer);
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsCorrect(false); // Reset to false

    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };



  const renderQuestion = () => {
   
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>BrainBuddy Quiz</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {currentQuestionIndex < questions.length ? (
          questions[currentQuestionIndex].options.length > 1 ? renderQuestion() : renderMatchingQuestion()
        ) : (
          <Text style={styles.quizCompletedText}>Congratulations! You have completed the quiz.</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  
});

export default Quiz;
