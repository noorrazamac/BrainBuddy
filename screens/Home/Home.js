import React, { useState, useEffect } from 'react';
import { View, FlatList, TextInput,Image, StyleSheet, Text, TouchableOpacity, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Amplify, API } from 'aws-amplify';
import { AntDesign } from '@expo/vector-icons'; // Import AntDesign from the Expo library (if available) or use a different icon library



// const coursesJava = [
//   {
//     id: 1,
//     title: 'Core Java',
//     category: 'Programming Java',
//     instructor: 'Online',
//     duration: '2 hours',
//     rating: 4.5,
//     image: require('../../images/Java.png'),
//   },
//   {
//     id: 2,
//     title: 'Java 8',
//     category: 'Programming Java',
//     instructor: 'Online',
//     duration: '2 hours',
//     rating: 4.5,
//     image: require('../../images/Java.png'),
//   },  {
//     id: 3,
//     title: 'Advanced Java',
//     category: 'Programming Java',
//     instructor: 'Online',
//     duration: '2 hours',
//     rating: 4.5,
//     image: require('../../images/Java.png'),
//   },
//   // Add more courses as needed
// ];
//   const coursesMusic = [
//     {
//       id: 1,
//       title: 'Indian Classical Music',
//       category: 'Vocal Music',
//       instructor: 'Sudha Raghunadhan',
//       rating: 4.5,
//       image: require('../../images/classical.jpg'),
//     },
//     {
//       id: 2,
//       title: 'Indian Hindustani Music',
//       category: 'Vocal Music',
//       instructor: 'Hari Haran',
//       rating: 4.5,
//       image: require('../../images/hindustani.jpg'),
//     },
//     {
//       id: 3,
//       title: 'Arabic Music',
//       category: 'Vocal Music',
//       instructor: 'Mohammed Rafi',
//       rating: 4.5,
//       image: require('../../images/arabic.webp'),
//     },
//     // Add more course objects...
//   ];

  
//   const coursesKeyBoard = [
//     {
//       id: 1,
//       title: 'Trinity Music',
//       category: 'Instrument- KeyBoard',
//       instructor: 'Brocket Parsons',
//       rating: 4.5,
//       image: require('../../images/trinityKeyboard.webp'),
//     },
//     {
//       id: 2,
//       title: 'KM Music Conservatory',
//       category: 'Instrument- KeyBoard',
//       instructor: 'A R Rahman',
//       rating: 4.5,
//       image: require('../../images/kmKeyboard.jpg'),
//     },
//     // Add more course objects...
//   ];

//   const coursesEnglish = [
//     {
//       id: 1,
//       title: 'British Council',
//       category: 'Communicative English',
//       instructor: 'Parth Patel',
//       rating: 4.5,
//       image: require('../../images/BCEnglish.jpg'),
//     },
//     {
//       id: 2,
//       title: 'Cambridge Academy',
//       category: 'Communicative English',
//       instructor: 'Mary Rose',
//       rating: 4.5,
//       image: require('../../images/cambridgeEnglish.jpg'),
//     },
//     // Add more course objects...
//   ];

    
// const coursesPython = [
//   {
//     id: 1,
//     title: 'Introduction to Python',
//     category: 'Programming Python',
//     instructor: 'Online',
//     duration: '2.5 hours',
//     rating: 4.5,
//     image: require('../../images/python.png'),
//   },
//   {
//     id: 2,
//     title: 'Python Types',
//     category: 'Programming Python',
//     instructor: 'Online',
//     duration: '3 hours',
//     rating: 4.5,
//     image: require('../../images/python.png'),
//   },  {
//     id: 3,
//     title: 'Programming in Python',
//     category: 'Programming Python',
//     instructor: 'Online',
//     duration: '7 hours',
//     rating: 4.5,
//     image: require('../../images/python.png'),
//   },
//   // Add more courses as needed
// ];

// const coursesMaths = [
//   {
//     id: 1,
//     title: 'Introduction to Maths',
//     category: 'Mathematics',
//     instructor: 'Online',
//     duration: '2.5 hours',
//     rating: 4.5,
//     image: require('../../images/IntroMaths.jpg'),
//   },
//   {
//     id: 2,
//     title: 'Basics of Mathematics',
//     category: 'Mathematics',
//     instructor: 'Online',
//     duration: '3 hours',
//     rating: 4.5,
//     image: require('../../images/midschoolMaths.jpg'),
//   },  {
//     id: 3,
//     title: 'Advanced Mathematics',
//     category: 'Mathematics',
//     instructor: 'Online',
//     duration: '7 hours',
//     rating: 4.5,
//     image: require('../../images/highschoolMaths.jpg'),
//   },
// ];


// const SearchBar = ({ onChangeText , onClearText}) => {
//   return (
//     <View style={styles.searchContainer}>
//       <TextInput
//         style={styles.input}
//         placeholder="Search......"
//         onChangeText={onChangeText}
//         onClearText={onClearText}
//       />
//     </View>
//   );
// };

const SearchBar = ({ onChangeText, onClearText }) => {
  console.log("caling on changetext/onkeypress ");
  const handleKeyPress = ({ nativeEvent }) => {
    const { key } = nativeEvent;
    if (key === 'Backspace' && onClearText) {
      // Check if the Backspace key was pressed and the onClearText prop is provided
      onClearText();
    }
  };

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.input}
        placeholder="Search......"
        onChangeText={onChangeText}
        onKeyPress={handleKeyPress} // Add the onKeyPress prop to handle Backspace key press
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
  const [refreshing, setRefreshing] = React.useState(false);
  const [isDataLoaded, setDataLoaded] = React.useState(false);

  const [searchText, setSearchText] = useState('');
  const [courseData1, setCourseData1] = useState([]);
  const [courseDatasearch1, setCourseDatasearch1] = useState([]);
  const [courseData2, setCourseData2] = useState([]);
  const [courseDatasearch2, setcourseDatasearch2] = useState([]);
  const [courseData3, setCourseData3] = useState([]);
  const [courseDatasearch3, setcourseDatasearch3] = useState([]);
  const [courseData4, setCourseData4] = useState([]);
  const [courseDatasearch4, setcourseDatasearch4] = useState([]);
  const [courseData5, setCourseData5] = useState([]);
  const [courseDatasearch5, setcourseDatasearch5] = useState([]);
  const [courseData6, setCourseData6] = useState([]);
  const [courseDatasearch6, setcourseDatasearch6] = useState([]);
  const [isSearchEmpty, setIsSearchEmpty] = useState(true);

  const onRefresh = React.useCallback(() => {
    console.log("usecallback called");
    setRefreshing(true);
    setDataLoaded(false);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
    fetchData();
  }, []);


const fetchData = async () => {
  try {
    console.log("fetchData first line" ,isDataLoaded );
    if(!isDataLoaded){

    console.log("fetchData inside");
    const coursesMusic = await getData("Music");
    const coursesJava = await getData("Java");
  
    const coursesKeyBoard = await getData("Instrumental Music");
    const coursesEnglish = await getData("English");
    const coursesPython = await getData("Python");
    const coursesMaths = await getData("Mathematics");

    setCourseData1(coursesMusic);
    setCourseDatasearch1(coursesMusic);
    setCourseData2(coursesJava);
    setcourseDatasearch2(coursesJava);
    setCourseData3(coursesKeyBoard);
    setcourseDatasearch3(coursesKeyBoard);
    setCourseData4(coursesEnglish);
    setcourseDatasearch4(coursesEnglish);
    setCourseData5(coursesPython);
    setcourseDatasearch5(coursesPython);
    setCourseData6(coursesMaths);
    setcourseDatasearch6(coursesMaths);
    setDataLoaded(true);
}
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

useEffect(() => {
  setDataLoaded(false); // Set it to false initially to fetch the data

  // Fetch data when the component mounts
  console.log("useefect is calling fetchdata");
  fetchData();
}, []);

const handleSearch = text => {
  setSearchText(text);

  if (text.trim() === '') {
    setDataLoaded(false);
    console.log("search text made empty");
    // If the search text is empty, use the original data without refetching    
    fetchData();
    setIsSearchEmpty(true);
  } else {
    console.log("search text is not empty");
    // If the search text is not empty, filter the data based on the search text
    const filteredData1 = courseDatasearch1.filter(course =>
      course.title.toLowerCase().includes(text.toLowerCase())
    );
    const filteredData2 = courseDatasearch2.filter(course =>
      course.title.toLowerCase().includes(text.toLowerCase())
    );
    const filteredData3 = courseDatasearch3.filter(course =>
      course.title.toLowerCase().includes(text.toLowerCase())
    );
    const filteredData4 = courseDatasearch4.filter(course =>
      course.title.toLowerCase().includes(text.toLowerCase())
    );
    const filteredData5 = courseDatasearch5.filter(course =>
      course.title.toLowerCase().includes(text.toLowerCase())
    );
    const filteredData6 = courseDatasearch6.filter(course =>
      course.title.toLowerCase().includes(text.toLowerCase())
    );

    setCourseData1(filteredData1);
    setCourseData2(filteredData2);
    setCourseData3(filteredData3);
    setCourseData4(filteredData4);
    setCourseData5(filteredData5);
    setCourseData6(filteredData6);
    setIsSearchEmpty(false);
  }
};
  
  const CourseItem = ({ course }) => { 
    return (
      <View style={styles.courseItem}>
       
        <Image source={course.image} style={styles.courseImage} />
        <View style={styles.courseInfo}>
          <Text style={styles.courseTitle}>{course.title}</Text>
          <Text style={styles.courseInstructor}>{course.instructor}</Text>
          <Text style={styles.courseRating}>{course.rating} stars</Text>
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

  const SubscribeButton = () => {
    const handleSubscribe = () => {
      // Implement the logic for handling the subscription process here
      // For example, navigate to the subscription screen or display a payment gateway
      console.log('Subscribing now...');
    };
  
    return (
      <TouchableOpacity style={styles.button} onPress={handleSubscribe}>
        <Text style={styles.buttonText}>Subscribe Now</Text>
      </TouchableOpacity>
    );
  };
  
  
  return (
   <View style={styles.container}>

        <SearchBar onChangeText={handleSearch}/>
        <SubscribeButton />
        <ScrollView  contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>

          <FlatList
            data={courseData1}
            keyExtractor={item => item.id}
            renderItem={renderCourseView}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            pagingEnabled={true}
            horizontal={true} />

          <FlatList
            data={courseData2}
            keyExtractor={item => item.id}
            renderItem={renderCourseView}
            pagingEnabled={true}
            horizontal={true} />

          <FlatList
            data={courseData3}
            keyExtractor={item => item.id}
            renderItem={renderCourseView}
            pagingEnabled={true}
            horizontal={true} />

          <FlatList
            data={courseData4}
            keyExtractor={item => item.id}
            renderItem={renderCourseView}
            pagingEnabled={true}
            horizontal={true} />

          <FlatList
            data={courseData5}
            keyExtractor={item => item.id}
            renderItem={renderCourseView}
            pagingEnabled={true}
            horizontal={true} />

          <FlatList
            data={courseData6}
            keyExtractor={item => item.id}
            renderItem={renderCourseView}
            pagingEnabled={true}
            horizontal={true} />

          {/* Add more FlatLists here if needed */}
        </ScrollView>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
   // padding: 1,
  },
  containerbutton: {
    alignItems: 'center',
    justifyContent: 'center',
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
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey',
    padding: 15,
    borderRadius: 4,
    marginRight: 1,
    textAlign: 'right',
    width: 120,
    height: 50,
  },
  button: {
    backgroundColor: 'green', // Customize the button color as needed
    paddingVertical: 12,
    paddingHorizontal: 15,
    widht: 120,
    borderRadius: 58,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  enrollButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  clearIcon: {
    padding: 5,
  },
  
});

export default Home;    