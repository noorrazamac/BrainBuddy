import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';

const course = {
  title: 'React Native 101',
  description: 'Learn the basics of React Native development',
  additionalDescription:
    'This course covers topics such as UI development, state management, navigation, and more. By the end of the course, you will have the skills to build mobile apps with React Native.',
  instructors: ['John Doe', 'Jane Smith', 'Mike Johnson'],
  duration: '4 weeks',
};

const CourseDetails = () => {
  const screenWidth = Dimensions.get('window').width;
  const imageWidth = screenWidth - 32;
  const imageHeight = (imageWidth * 9) / 16;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{course.title}</Text>
          <View style={styles.separator} />
        </View>

      {/* Add image here */}

        <View style={styles.detailsContainer}>
          <Text style={styles.label}>Description:</Text>
          <Text style={styles.description}>{course.description}</Text>

          <Text style={styles.label}>Course Details:</Text>
          <Text style={styles.additionalDescription}>
            {course.additionalDescription}
          </Text>

        {/* Add Instructors here */}

          <Text style={styles.label}>Duration:</Text>
          <Text style={styles.duration}>{course.duration}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#000000',
    marginTop: 8,
    marginBottom: 16,
  },
  //Add Image styling
  detailsContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
  },
  additionalDescription: {
    fontSize: 16,
    marginBottom: 8,
  },
 //Add instructor styling
  duration: {
    fontSize: 16,
  },
});

export default CourseDetails;
