import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CourseDetails = ({ course }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{course.title}</Text>
      <Text style={styles.description}>{course.description}</Text>
      <Text style={styles.instructor}>Instructor: {course.instructor}</Text>
      <Text style={styles.duration}>Duration: {course.duration}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
  },
  instructor: {
    fontSize: 14,
    marginBottom: 4,
  },
  duration: {
    fontSize: 14,
  },
});

export default CourseDetails;