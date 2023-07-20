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
    const currentQuestion = questions[currentQuestionIndex];
    return (
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
        {currentQuestion.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedOption === option && styles.selectedOptionButton,
            ]}
            onPress={() => handleOptionSelection(option)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
        {selectedOption !== null && (
          <View style={styles.feedbackContainer}>
            <Text style={[styles.feedbackText, isCorrect ? styles.correctFeedbackText : styles.incorrectFeedbackText]}>
              {isCorrect ? 'Correct! 🎉' : 'Incorrect! 😞 The correct answer is ' + questions[currentQuestionIndex].correctAnswer + '.'}
            </Text>
            <TouchableOpacity style={styles.nextButton} onPress={handleNextQuestion}>
              <Text style={styles.nextButtonText}>Next Question</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
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
