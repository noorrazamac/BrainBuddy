import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const Home = () => {
  
const coursesJava = [
  {
    id: 1,
    title: 'Core Java',
    instructor: 'Online',
    duration: '2 hours',
    rating: 4.5,
    image: require('../../images/Java.png'),
  },
  {
    id: 2,
    title: 'Java 8',
    instructor: 'Online',
    duration: '2 hours',
    rating: 4.5,
    image: require('../../images/Java.png'),
  },  {
    id: 3,
    title: 'Advanced Java',
    instructor: 'Online',
    duration: '2 hours',
    rating: 4.5,
    image: require('../../images/Java.png'),
  },
  // Add more courses as needed
];
  const coursesMusic = [
    {
      id: 1,
      title: 'Indian Classical Music',
      instructor: 'Sudha Raghunadhan',
      rating: 4.5,
      image: require('../../images/classical.jpg'),
    },
    {
      id: 2,
      title: 'Indian Hindustani Music',
      instructor: 'Hari Haran',
      rating: 4.5,
      image: require('../../images/hindustani.jpg'),
    },
    {
      id: 3,
      title: 'Arabic Music',
      instructor: 'Mohammed Rafi',
      rating: 4.5,
      image: require('../../images/arabic.webp'),
    },
    // Add more course objects...
  ];

  const coursesKeyBoard = [
    {
      id: 1,
      title: 'Trinity Music',
      instructor: 'Brocket Parsons',
      rating: 4.5,
      image: require('../../images/trinityKeyboard.webp'),
    },
    {
      id: 2,
      title: 'KM Music Conservatory',
      instructor: 'A R Rahman',
      rating: 4.5,
      image: require('../../images/kmKeyboard.jpg'),
    },
    // Add more course objects...
  ];

  const coursesEnglish = [
    {
      id: 1,
      title: 'British Council',
      instructor: 'Parth Patel',
      rating: 4.5,
      image: require('../../images/BCEnglish.jpg'),
    },
    {
      id: 2,
      title: 'Cambridge Academy',
      instructor: 'Mary Rose',
      rating: 4.5,
      image: require('../../images/cambridgeEnglish.jpg'),
    },
    // Add more course objects...
  ];

    
const coursesPython = [
  {
    id: 1,
    title: 'Introduction to Python',
    instructor: 'Online',
    duration: '2.5 hours',
    rating: 4.5,
    image: require('../../images/python.png'),
  },
  {
    id: 2,
    title: 'Python Types',
    instructor: 'Online',
    duration: '3 hours',
    rating: 4.5,
    image: require('../../images/python.png'),
  },  {
    id: 3,
    title: 'Programming in Python',
    instructor: 'Online',
    duration: '7 hours',
    rating: 4.5,
    image: require('../../images/python.png'),
  },
  // Add more courses as needed
];

const coursesMaths = [
  {
    id: 1,
    title: 'Introduction to Maths',
    instructor: 'Online',
    duration: '2.5 hours',
    rating: 4.5,
    image: require('../../images/IntroMaths.jpg'),
  },
  {
    id: 2,
    title: 'Basics of Mathematics',
    instructor: 'Online',
    duration: '3 hours',
    rating: 4.5,
    image: require('../../images/midschoolMaths.jpg'),
  },  {
    id: 3,
    title: 'Advanced Mathematics',
    instructor: 'Online',
    duration: '7 hours',
    rating: 4.5,
    image: require('../../images/highschoolMaths.jpg'),
  },
  // Add more courses as needed
];
  const chunkSize = 10; // Number of courses to display in each horizontal view
  const chunkedCoursesJava = [];
  const chunkedCoursesMusic = [];
  const chunkedCoursesKeyBoard = [];
  const chunkedCoursesEnglish = [];
  const chunkedCoursesPython = [];
  const chunkedCoursesMaths = [];

    // Split the courses into chunks
    for (let i = 0; i < coursesJava.length; i += chunkSize) {
      chunkedCoursesJava.push(coursesJava.slice(i, i + chunkSize));
    }

  // Split the courses into chunks
  for (let i = 0; i < coursesMusic.length; i += chunkSize) {
    chunkedCoursesMusic.push(coursesMusic.slice(i, i + chunkSize));
  }

   // Split the courses into chunks
   for (let i = 0; i < coursesKeyBoard.length; i += chunkSize) {
    chunkedCoursesKeyBoard.push(coursesKeyBoard.slice(i, i + chunkSize));
  }

     // Split the courses into chunks
     for (let i = 0; i < coursesEnglish.length; i += chunkSize) {
      chunkedCoursesEnglish.push(coursesEnglish.slice(i, i + chunkSize));
    }
  
    // Split the courses into chunks
     for (let i = 0; i < coursesPython.length; i += chunkSize) {
      chunkedCoursesPython.push(coursesPython.slice(i, i + chunkSize));
    }

    // Split the courses into chunks
      for (let i = 0; i < coursesMaths.length; i += chunkSize) {
       chunkedCoursesMaths.push(coursesMaths.slice(i, i + chunkSize));
    }
  const renderCourseItem = ({ item }) => (
    <View style={styles.courseItem}>
      <Image source={item.image} style={styles.courseImage} />
      <View style={styles.courseInfo}>
        <Text style={styles.courseTitle}>{item.title}</Text>
        <Text style={styles.courseInstructor}>{item.instructor}</Text>
        <Text style={styles.courseRating}>{item.rating} stars</Text>
       <Text> <TouchableOpacity style={styles.enrollButton} onPress={() => enrollCourse(item)}>
        <Text style={styles.enrollButtonText}>Enroll</Text>
      </TouchableOpacity></Text>
      </View>
    
    </View>
  );

  const enrollCourse = (course) => {
    // Handle course enrollment logic here
    console.log('Enrolling in course:', course.title);
  };

  const renderCourseView = ({ item }) => (
    <View style={styles.courseView}>
      <FlatList
        data={item}
        renderItem={renderCourseItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal={true}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
      <Text style={styles.sectionTitle}>Java</Text>
       <FlatList
        data={chunkedCoursesJava}
        renderItem={renderCourseView}
        keyExtractor={(item, index) => index.toString()}
        pagingEnabled={true}
      />
       <Text style={styles.sectionTitle}>Music</Text>
      <FlatList
        data={chunkedCoursesMusic}
        renderItem={renderCourseView}
        keyExtractor={(item, index) => index.toString()}
        pagingEnabled={true}
      />
       <Text style={styles.sectionTitle}>KeyBoard</Text>
       <FlatList
        data={chunkedCoursesKeyBoard}
        renderItem={renderCourseView}
        keyExtractor={(item, index) => index.toString()}
        pagingEnabled={true}
      />
      <Text style={styles.sectionTitle}>English</Text>
       <FlatList
        data={chunkedCoursesEnglish}
        renderItem={renderCourseView}
        keyExtractor={(item, index) => index.toString()}
        pagingEnabled={true}
      />
       <Text style={styles.sectionTitle}>Python</Text>
       <FlatList
        data={chunkedCoursesPython}
        renderItem={renderCourseView}
        keyExtractor={(item, index) => index.toString()}
        pagingEnabled={true}
      />
       <Text style={styles.sectionTitle}>Maths</Text>
       <FlatList
        data={chunkedCoursesMaths}
        renderItem={renderCourseView}
        keyExtractor={(item, index) => index.toString()}
        pagingEnabled={true}
      />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
   // padding: 40,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    color: '#333',
  },
  courseView: {
    marginBottom: 10,
  },
  courseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  courseImage: {
    width: 90,
    height: 90,
    marginRight: 10,
    borderRadius: 8,
    marginBottom: 10
  },
  courseInfo: {
    flex: 1,
    marginBottom: 10
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  courseInstructor: {
    fontSize: 16,
    color: '#888',
    marginBottom: 3,
  },
  courseRating: {
    fontSize: 14,
    color: '#444',
    textAlign: 'left',
  },
  enrollButton: {
    backgroundColor: 'green',
    padding: 6,
    borderRadius: 4,
    marginRight: 10,
    textAlign: 'right',
  },
  enrollButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  
});

export default Home;
