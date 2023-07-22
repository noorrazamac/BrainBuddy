import React,{useState} from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Amplify, API } from 'aws-amplify';
import awsconfig from '../../src/aws-exports';
Amplify.configure(awsconfig);


// import { navigation } from '@react-navigation/native';

function getData() {
  const apiName = 'course';
  const path = '/course';
  const myInit = {
    headers: {} // OPTIONAL
  };

  return API.get(apiName, path, myInit);
}
function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const MyLearningScreen = ({navigation}) => {
  const [courses, setCourses] = useState([{ id: 1, title: 'Introduction to React Native', duration: '2 hours' },
      { id: 2, title: 'Advanced JavaScript Concepts', duration: '3.5 hours' },
      { id: 3, title: 'User Interface Design Principles', duration: '1.5 hours' },
      { id: 1, title: 'Introduction to React Native', duration: '2 hours' },
      { id: 2, title: 'Advanced JavaScript Concepts', duration: '3.5 hours' },
      { id: 3, title: 'User Interface Design Principles', duration: '1.5 hours' },
      { id: 1, title: 'Introduction to React Native', duration: '2 hours' },
      { id: 2, title: 'Advanced JavaScript Concepts', duration: '3.5 hours' },
      { id: 3, title: 'User Interface Design Principles', duration: '1.5 hours' },]);
      (async function() {
        const response = await getData();
        // console.log(response);
        setCourses(response);
        await timeout(10000); 
      })();
//      
// );

//  [
    
//     // Add more courses as needed
//   ];
  const renderCourseBoxes = () => {
    const navigate = useNavigation();
    if (courses.length === 0) {
      return (
        <View style={styles.emptyCoursesContainer}>
          <Text style={styles.emptyCoursesMessage}>Seems like you have not purchased any course yet.</Text>
          <Text style={styles.sadEmoji}>😢</Text>
          <TouchableOpacity style={styles.buttonContainer} onPress={() => navigate.navigate('CourseList')}>
            <Text style={styles.buttonText}>See Courses</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return courses.map(course => (
      <SafeAreaView>
      <View key={course.id} style={styles.courseContainer}>
         {/* on cluck navigate to course Details */}
            <TouchableOpacity  onPress={() => navigation.navigate('CourseDetails', { course })}>

              <Text style={styles.courseTitle}>{course.title}</Text>
              <Text style={styles.courseDuration}>{course.duration}</Text>

            </TouchableOpacity>

      </View>
      </SafeAreaView>
    ));
  };

  return (
    
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Learning</Text>
      </View>
      <ScrollView>
        <View style={styles.contentContainer}>
          <Text style={styles.sectionTitle}>My Courses</Text>
          {renderCourseBoxes(navigation)}
        </View>
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
