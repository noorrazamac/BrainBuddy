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
  const [isCorrect, setIsCorrect] = useState(null); // Updated to null to show feedback only after selecting an option
  const [totalScore, setTotalScore] = useState(0);

  const handleOptionSelection = (selectedAnswer) => {
    setSelectedOption(selectedAnswer);

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrectAnswer = Array.isArray(currentQuestion.correctAnswer)
      ? currentQuestion.correctAnswer.some((item) => item.answer === selectedAnswer)
      : currentQuestion.correctAnswer === selectedAnswer;

    setIsCorrect(isCorrectAnswer);

    // Increment the total score if the answer is correct
    if (isCorrectAnswer) {
      setTotalScore((prevScore) => prevScore + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsCorrect(null); // Reset feedback to null
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
          <View style={styles.feedbackContainer}>
            <Text style={styles.quizCompletedText}>Congratulations! You have completed the quiz.</Text>
            <Text style={styles.totalScoreText}>Your Total Score: {totalScore}/{questions.length}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    backgroundColor: '#ec5252',
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 10,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 20,
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  optionButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#000000',
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
    color: '#000000',
    textAlign: 'center',
  },
  matchingContainer: {
    marginBottom: 10,
  },
  matchingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  matchingQuestion: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
  },
  matchingAnswer: {
    flex: 1,
    fontSize: 16,
    color: '#666',
    textAlign: 'right',
  },
  feedbackContainer: {
    marginTop: 10,
  },
  feedbackText: {
    fontSize: 18,
    color: '#000000',
    textAlign: 'center',
  },
  correctFeedbackText: {
    color: 'green',
  },
  incorrectFeedbackText: {
    color: 'red',
  },
  nextButton: {
    backgroundColor: '#8BC34A',
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
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  totalScoreText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
  },
});

export default Quiz;
