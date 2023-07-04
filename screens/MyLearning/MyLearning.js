import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';

const courses = [


];

const MyLearningScreen = () => {
  const renderCourseBoxes = () => {
    if (courses.length === 0) {
      return (
        <View style={styles.emptyCoursesContainer}>
          <Text style={styles.emptyCoursesMessage}>Seems like you have not purchased any course yet.</Text>
          <Text style={styles.sadEmoji}>😢</Text>
          <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('CourseList')}>
            <Text style={styles.buttonText}>See Courses</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return courses.map(course => (
      <View key={course.id} style={styles.courseContainer}>
        <Text style={styles.courseTitle}>{course.title}</Text>
        <Text style={styles.courseDuration}>{course.duration}</Text>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Learning</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.sectionTitle}>My Courses</Text>
        {renderCourseBoxes()}
      </View>
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
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  courseContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  courseDuration: {
    fontSize: 14,
    color: '#666',
  },
  message: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
  emptyCoursesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCoursesMessage: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#999',
    textAlign: 'center',
    marginBottom: 10,
  },
  sadEmoji: {
    fontSize: 64,
  },
  buttonContainer: {
    backgroundColor: '#8BC34A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});

export default MyLearningScreen;
