import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const courses = [
  { id: 1, title: 'Introduction to React Native', duration: '2 hours' },
  { id: 2, title: 'Advanced JavaScript Concepts', duration: '3.5 hours' },
  { id: 3, title: 'User Interface Design Principles', duration: '1.5 hours' },
  // Add more courses as needed
];

const MyLearningScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Learning</Text>
      <Text style={styles.subtitle}>Welcome to My Learning Module!</Text>

      {courses.map(course => (
        <View key={course.id} style={styles.courseBox}>
          <Text style={styles.courseTitle}>{course.title}</Text>
          <Text style={styles.courseDuration}>{course.duration}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  courseBox: {
    backgroundColor: '#ebebeb',
    padding: 16,
    marginBottom: 10,
    borderRadius: 8,
    width: '100%',
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  courseDuration: {
    fontSize: 14,
    marginTop: 5,
  },
});

export default MyLearningScreen;
``
