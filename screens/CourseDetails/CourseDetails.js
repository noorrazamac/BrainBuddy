import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView, Button } from 'react-native';
import { TouchableOpacity } from 'react-native';


const course = 
{
  title: 'React Native 101',
  description: 'Learn the basics of React Native development',
  additionalDescription:
    'This course covers topics such as UI development, state management, navigation, and more. By the end of the course, you will have the skills to build mobile apps with React Native.',
  instructors: ['John Doe', 'Jane Smith', 'Mike Johnson'],
  duration: '4 weeks',
};

const CourseDetails = ({navigation}) => {
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
           <AppButton
           onPress={() =>
                   navigation.navigate('CourseEnrollmentPayment')
                 }
           title="Enroll Now" size="sm" backgroundColor="#007bff" />




        </View>
      </View>
    </ScrollView>
  );
};

const AppButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
    <Text style={styles.appButtonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({

  screenContainer: {
      flex: 1,
      justifyContent: "center",
      padding: 16
    },
    appButtonContainer: {
      elevation: 8,
      backgroundColor: "#009688",
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 12
    },
    appButtonText: {
      fontSize: 18,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase"
    },
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  additionalDescription: {
    fontSize: 17,
    marginBottom: 8,
  },
  description: {
    fontSize: 17,
    marginBottom: 8,
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
    fontSize: 17,
  },
  duration: {
    fontSize: 17,
  },
});

export default CourseDetails;
