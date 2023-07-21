import React, { useState } from 'react';
import { View, FlatList, TextInput,Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';


// courses= ( async function() {
//   const courses = await getData(course_id);
//   console.log(JSON.stringify(courses));
//   return courses();
// })();
 
const coursesJava = [
  {
    id: 1,
    title: 'Core Java',
    category: 'Programming Java',
    instructor: 'Online',
    duration: '2 hours',
    rating: 4.5,
    image: require('../../images/Java.png'),
  },
  {
    id: 2,
    title: 'Java 8',
    category: 'Programming Java',
    instructor: 'Online',
    duration: '2 hours',
    rating: 4.5,
    image: require('../../images/Java.png'),
  },  {
    id: 3,
    title: 'Advanced Java',
    category: 'Programming Java',
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
      category: 'Vocal Music',
      instructor: 'Sudha Raghunadhan',
      rating: 4.5,
      image: require('../../images/classical.jpg'),
    },
    {
      id: 2,
      title: 'Indian Hindustani Music',
      category: 'Vocal Music',
      instructor: 'Hari Haran',
      rating: 4.5,
      image: require('../../images/hindustani.jpg'),
    },
    {
      id: 3,
      title: 'Arabic Music',
      category: 'Vocal Music',
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
      category: 'Instrument- KeyBoard',
      instructor: 'Brocket Parsons',
      rating: 4.5,
      image: require('../../images/trinityKeyboard.webp'),
    },
    {
      id: 2,
      title: 'KM Music Conservatory',
      category: 'Instrument- KeyBoard',
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
      category: 'Communicative English',
      instructor: 'Parth Patel',
      rating: 4.5,
      image: require('../../images/BCEnglish.jpg'),
    },
    {
      id: 2,
      title: 'Cambridge Academy',
      category: 'Communicative English',
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
    category: 'Programming Python',
    instructor: 'Online',
    duration: '2.5 hours',
    rating: 4.5,
    image: require('../../images/python.png'),
  },
  {
    id: 2,
    title: 'Python Types',
    category: 'Programming Python',
    instructor: 'Online',
    duration: '3 hours',
    rating: 4.5,
    image: require('../../images/python.png'),
  },  {
    id: 3,
    title: 'Programming in Python',
    category: 'Programming Python',
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
    category: 'Mathematics',
    instructor: 'Online',
    duration: '2.5 hours',
    rating: 4.5,
    image: require('../../images/IntroMaths.jpg'),
  },
  {
    id: 2,
    title: 'Basics of Mathematics',
    category: 'Mathematics',
    instructor: 'Online',
    duration: '3 hours',
    rating: 4.5,
    image: require('../../images/midschoolMaths.jpg'),
  },  {
    id: 3,
    title: 'Advanced Mathematics',
    category: 'Mathematics',
    instructor: 'Online',
    duration: '7 hours',
    rating: 4.5,
    image: require('../../images/highschoolMaths.jpg'),
  },
];


const SearchBar = ({ onChangeText }) => {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.input}
        placeholder="Search......"
        onChangeText={onChangeText}
      />
    </View>
  );
};

async function getData(course_category) {
  const apiName = 'coursesbyCategory';
  const path = '/coursesbyCategory';
  const myInit = {
    headers: {} // OPTIONAL
  };

  return await API.get(apiName, path, {
    queryStringParameters: {
      course_category: course_category
    }
  });
}

const Home = () => {
  const [searchText, setSearchText] = useState('');
  const [courseData1, setCourseData1] = useState(coursesMusic);
  const [courseData2, setCourseData2] = useState(coursesJava);
  const [courseData3, setCourseData3] = useState(coursesKeyBoard);
  const [courseData4, setCourseData4] = useState(coursesEnglish);
  const [courseData5, setCourseData5] = useState(coursesPython);
  const [courseData6, setCourseData6] = useState(coursesMaths);


  const handleSearch = text => {
    setSearchText(text);

    const filteredData1 = coursesMusic.filter(course =>
      course.title.toLowerCase().includes(text.toLowerCase())
    );
    const filteredData2 = coursesJava.filter(course =>
      course.title.toLowerCase().includes(text.toLowerCase())
    );
    const filteredData3 = coursesKeyBoard.filter(course =>
      course.title.toLowerCase().includes(text.toLowerCase())
    );
    const filteredData4 = coursesEnglish.filter(course =>
      course.title.toLowerCase().includes(text.toLowerCase())
    );
    const filteredData5 = coursesPython.filter(course =>
      course.title.toLowerCase().includes(text.toLowerCase())
    );
    const filteredData6 = coursesMaths.filter(course =>
      course.title.toLowerCase().includes(text.toLowerCase())
    );

    setCourseData1(filteredData1);
    setCourseData2(filteredData2);
    setCourseData3(filteredData3);
    setCourseData4(filteredData4);
    setCourseData5(filteredData5);
    setCourseData6(filteredData6);
  };

  const enrollCourse = (course) => {
    // Handle course enrollment logic here
    console.log('Enrolling in course:', course.title);
  };
  
  const CourseItem = ({ course }) => { 
    return (
      <View style={styles.courseItem}>
       
        <Image source={course.image} style={styles.courseImage} />
        <View style={styles.courseInfo}>
          <Text style={styles.courseTitle}>{course.title}</Text>
          <Text style={styles.courseInstructor}>{course.instructor}</Text>
          <Text style={styles.courseRating}>{course.rating} stars</Text>
          <TouchableOpacity style={styles.enrollButton} onPress={() => enrollCourse(course)}>
            <Text style={styles.enrollButtonText}>Enroll</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  const Title = ({ text }) => {
    return (
      <View style={styles.titleContainer}>
        <Text style={styles.sectionTitle}>{text}</Text>
      </View>
    );
  };
  

  const renderCourseView = ({ item }) => {
    return (
      <Text>
        <CourseItem course={item} /> {/* Directly render the CourseItem with the item data */}
      </Text>
    );
  };
  
  return (
    <View style={styles.container}>
      <SearchBar onChangeText={handleSearch} />
      <ScrollView>
     
      <FlatList
        data={courseData1}
        keyExtractor={item => item.id}
      renderItem={renderCourseView}
      pagingEnabled={true}
      horizontal={true}
      />
  
      <FlatList
        data={courseData2}
        keyExtractor={item => item.id}
        renderItem={renderCourseView}
        pagingEnabled={true}
        horizontal={true}
      />

<FlatList
        data={courseData3}
        keyExtractor={item => item.id}
        renderItem={renderCourseView}
        pagingEnabled={true}
        horizontal={true}
      />
 
<FlatList
        data={courseData4}
        keyExtractor={item => item.id}
        renderItem={renderCourseView}
        pagingEnabled={true}
        horizontal={true}
      />
       
      <FlatList
        data={courseData5}
        keyExtractor={item => item.id}
        renderItem={renderCourseView}
        pagingEnabled={true}
        horizontal={true}
      />
      
      <FlatList
        data={courseData6}
        keyExtractor={item => item.id}
        renderItem={renderCourseView}
        pagingEnabled={true}
        horizontal={true}
      />

      {/* Add more FlatLists here if needed */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 1,
  },
  titleContainer: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchContainer: {
    padding: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
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
    marginRight: 5,
    borderRadius: 8,
    marginBottom: 10
  },
  courseInfo: {
    flex: 1,
    marginBottom: 25,
    marginRight: 1,
  },
  courseTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  courseInstructor: {
    fontSize: 14,
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
    padding: 15,
    borderRadius: 4,
    marginRight: 1,
    textAlign: 'right',
    width: 70,
    height: 50,
  },
  enrollButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  
});

export default Home;    