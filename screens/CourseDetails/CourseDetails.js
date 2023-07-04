import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';

const course = [
{
  title: 'React Native 101',
  description: 'Learn the basics of React Native development',
  additionalDescription:
    'This course covers topics such as UI development, state management, navigation, and more. By the end of the course, you will have the skills to build mobile apps with React Native.',
  instructors: ['John Doe', 'Jane Smith', 'Mike Johnson'],
  duration: '4 weeks',
},
{
  title: 'Advanced React Native',
  description: 'Take your React Native skills to the next level',
  additionalDescription:
    'This course dives deep into advanced topics in React Native development, including performance optimization, native module integration, and advanced UI techniques. By the end of the course, you will be equipped to build complex and high-performance mobile apps with React Native.',
  instructors: ['Sarah Johnson', 'Michael Smith', 'Emily Davis'],
  duration: '6 weeks',
},
{
  title: 'React Native for Redux Enthusiasts',
  description: 'Learn how to leverage Redux in React Native apps',
  additionalDescription:
    'This course is designed for developers familiar with Redux who want to integrate it with React Native. You will learn how to manage complex application state and data flow effectively.',
  instructors: ['Alex Brown', 'Jessica Lee'],
  duration: '5 weeks',
},
];

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

        <View style={styles.imageContainer}>
          <Image
            source={require('./assets/reactCourse.jpg')}
            style={{ ...styles.image, width: imageWidth, height: imageHeight }}
          />
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.label}>Course Description:</Text>
          <Text style={styles.description}>{course.description}</Text>

          <Text style={styles.label}>Course Details:</Text>
          <Text style={styles.additionalDescription}>
            {course.additionalDescription}
          </Text>

          <Text style={styles.label}>Course Instructors:</Text>
          <View style={styles.instructorContainer}>
            {course.instructors.map((instructor, index) => (
              <View key={index} style={styles.inlineContainer}>
                <Image
                  source={require('./assets/humanIcon.png')}
                  style={styles.instructorIcon}
                />
                <Text style={styles.instructor}>{instructor}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.label}>Course Duration:</Text>
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
  imageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  image: {
    resizeMode: 'cover',
  },
  detailsContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  additionalDescription: {
    fontSize: 18,
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    marginBottom: 10,
  },
  instructorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  inlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 8,
  },
  instructorIcon: {
    width: 35,
    height: 35,
    marginRight: 8,
  },
  instructor: {
    fontSize: 16,
  },
  duration: {
    fontSize: 16,
  },
});

export default CourseDetails;
