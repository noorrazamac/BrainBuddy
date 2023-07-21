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
  const [hasAnswered, setHasAnswered] = useState(false); // Track whether the user has answered the current question

  const handleOptionSelection = (selectedAnswer) => {
    if (!hasAnswered) {
      setSelectedOption(selectedAnswer);

      const currentQuestion = questions[currentQuestionIndex];
      const isCorrectAnswer = Array.isArray(currentQuestion.correctAnswer)
        ? currentQuestion.correctAnswer.some((item) => item.answer === selectedAnswer)
        : currentQuestion.correctAnswer === selectedAnswer;
      setIsCorrect(isCorrectAnswer);
      setHasAnswered(true);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsCorrect(false); // Reset to false
    setHasAnswered(false); // Allow the user to answer the next question

    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const renderMatchingQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    return (
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
        <View style={styles.matchingContainer}>
          {currentQuestion.options.map((item, index) => (
            <View key={index} style={styles.matchingItem}>
              <Text style={styles.matchingQuestion}>{item.question}</Text>
              <Text style={styles.matchingAnswer}>{item.answer}</Text>
            </View>
          ))}
        </View>
        {selectedOption !== null && (
          <View style={styles.feedbackContainer}>
            <Text style={[styles.feedbackText, isCorrect ? styles.correctFeedbackText : styles.incorrectFeedbackText]}>
              {isCorrect ? 'Correct! 🎉' : 'Incorrect! 😞 The correct answer is ' + currentQuestion.correctAnswer[0].answer + '.'}
            </Text>
            <TouchableOpacity style={styles.nextButton} onPress={handleNextQuestion}>
              <Text style={styles.nextButtonText}>Next Question</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
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
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#ec5252',
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  questionContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  optionButton: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
  },
  selectedOptionButton: {
    borderColor: 'blue',
  },
  optionText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
  matchingContainer: {
    marginVertical: 10,
  },
  matchingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  matchingQuestion: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  matchingAnswer: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  feedbackContainer: {
    marginTop: 20,
  },
  feedbackText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
  correctFeedbackText: {
    color: 'green',
  },
  incorrectFeedbackText: {
    color: 'red',
  },
  nextButton: {
    backgroundColor: '#ec5252',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  quizCompletedText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Quiz;
