import React, { useState } from 'react';
import { View, FlatList, TextInput,Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Amplify, API, Storage} from 'aws-amplify';
import { AntDesign } from '@expo/vector-icons'; // Import AntDesign from the Expo library (if available) or use a different icon library
import awsconfig from '../../src/aws-exports';
import { useNavigation } from '@react-navigation/native';

import PaymentMethodScreen from '../CourseEnrollmentPayment/PaymentMethodScreen';
Amplify.configure(awsconfig);



const enrollCourse = (course) => {
      const navigation = useNavigation();
  // Handle course enrollment logic here
  navigation.navigate('PaymentMethodScreen')
  console.log('Enrolling in course:', course.title);
  
};

async function postData() {
  const apiName = 'student';
  const path = '/progress';
  const myInit = {
    body: {}, // replace this with attributes you need
    headers: {} // OPTIONAL
  };

  return await API.post(apiName, path, myInit);
}

postData();
 
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
];


const SearchBar = ({ onChangeText }) => {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        onChangeText={onChangeText}
      />
    </View>
  );
};


async function getData(category) {
  const apiName = 'course';
  const path = '/courseByCategory';
  const myInit = {
    headers: {} // OPTIONAL
  };

  return await API.get(apiName, path, {
    queryStringParameters: {
      category: category
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


  
  const CourseItem = ({ course }) => { 
    const [isLogoLoaded, setLogoLoaded] = React.useState(false);

    if(!isLogoLoaded){
      
        Storage.get(course.image.split("/")[3],  {
          level: 'public', // defaults to `public`
          
          expires: 3600, // validity of the URL, in seconds. defaults to 900 (15 minutes) and maxes at 3600 (1 hour)
          // contentType: 'string', // set return content type, eg "text/html"
          validateObjectExistence: true, // defaults to false
          // cacheControl?: string, // Specifies caching behavior along the request/reply chain
        }).then(result => {
       
          course.image=result
          setLogoLoaded(true)
          console.log("logo loaded")
        
      }).catch((err) => {console.log(err)});
      // course.map(c=>{
      //   Storage.get(c.image.split("/")[3],  {
      //     level: 'public', // defaults to `public`
          
      //     expires: 3600, // validity of the URL, in seconds. defaults to 900 (15 minutes) and maxes at 3600 (1 hour)
      //     // contentType: 'string', // set return content type, eg "text/html"
      //     validateObjectExistence: true, // defaults to false
      //     // cacheControl?: string, // Specifies caching behavior along the request/reply chain
      //   })
      // }).all.then(result => {
       
      //     c.image=result
      //     setLogoLoaded(true)
      //     console.log("logo loaded")
        
      // }).catch((err) => {console.log(err)});
    }
    return (
      <View style={styles.courseItem}>
       
        <Image source={{ uri: course.image }} style={styles.courseImage} />
        <View style={styles.courseInfo}>
          <Text style={styles.courseTitle}>{course.title}</Text>
          <Text style={styles.courseInstructor}>{course.instructor}</Text>
          <Text style={styles.courseRating}>{course.rating} stars</Text>
          <TouchableOpacity style={styles.enrollButton}
          onPress={() =>
              navigation.navigate('PaymentMethodScreen')
            }>
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