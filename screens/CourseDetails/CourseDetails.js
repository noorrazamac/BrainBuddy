import React, { useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView,Button, TouchableOpacity,ActivityIndicator,RefreshControl } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Amplify, API, Storage } from 'aws-amplify';
import awsconfig from '../../src/aws-exports';
import { useRoute, useNavigation } from '@react-navigation/native';
import { set } from 'lodash';
import Quiz from '../Quiz/quiz';
import VideoScreen from '../Content/VideoScreen';
import { SafeAreaView } from 'react-navigation';
Amplify.configure(awsconfig);

let course = {
  title: 'React Native 101',
  description: 'Learn the basics of React Native development',
  additionalDescription:
    'This course covers topics such as UI development, state management, navigation, and more. By the end of the course, you will have the skills to build mobile apps with React Native.',
  instructors: ['John Doe', 'Jane Smith', 'Mike Johnson'],
  duration: '4 weeks',
  modules: [
    {
      title: 'Module 1: Introduction to React Native',
      content: [
        'Introduction to React Native and its key concepts',
        'Setting up the development environment',
        'Creating your first React Native app',
      ],
    },
    {
      title: 'Module 2: UI Development with React Native',
      content: [
        'Building user interfaces using React Native components',
        'Styling components with CSS-in-JS',
        'Handling user input and touch events',
      ],
    },
    {
      title: 'Module 3: State Management in React Native',
      content: [
        'Understanding state and props in React Native',
        'Managing state with React Hooks',
        'Implementing Redux for state management',
      ],
    },
  ],
};




function getData(course_id) {
  const apiName = 'course';
  const path = '/course';
  const myInit = {
    headers: {}, // OPTIONAL
    queryStringParameters: {
      course_id: course_id // OPTIONAL
    }
  };
  

  return API.get(apiName, path, myInit);
}
function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
const CourseDetails = (props) => {
  const route=useRoute();
  const {params}  = route;
  course=params.course;
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: course.title,
    });}
  );
  const [loading, setLoading] = React.useState(false);
  const [modules, setModules] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [isDataLoaded, setDataLoaded] = React.useState(false);
  const [uri, setUri] = useState("");
  // console.log(JSON.stringify(course));
  const screenWidth = Dimensions.get('window').width;
  const imageWidth = screenWidth - 32;
  const imageHeight = (imageWidth * 9) / 16;
  // const =Storage.get(course.image);
   Storage.get(course.image.split("/")[3],  {
    level: 'public', // defaults to `public`
    
    expires: 3600, // validity of the URL, in seconds. defaults to 900 (15 minutes) and maxes at 3600 (1 hour)
    // contentType: 'string', // set return content type, eg "text/html"
    validateObjectExistence: true, // defaults to false
    // cacheControl?: string, // Specifies caching behavior along the request/reply chain
  }).then((result) => {
    setUri(result)}).catch((err) => {console.log(err)});
  
  // console.log(JSON.stringify(courses));
  const [expandedModuleIndex, setExpandedModuleIndex] = useState(null);

  const toggleModule = (index) => {
    if (expandedModuleIndex === index) {
      setExpandedModuleIndex(null);
    } else {
      setExpandedModuleIndex(index);
    }
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setDataLoaded(false);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);
  // console.log(course)
  let course_image=course.image;
  (async function() {
    if(!isDataLoaded){
      console.log(course.id)
      const response = await getData(course.id);
      // console.log(response);
      setModules(response.modules);
      console.log("++++++++++"+JSON.stringify(response.modules));
      console.log("============="+JSON.stringify(modules))
      timeout(1000)
      setDataLoaded(true);
    }
    
  })();
  
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} 
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{course.title}</Text>
          <View style={styles.separator} />
        </View>
        <View style={styles.imageContainer}>
          {/* <Image
            source={require(uri)}
            style={{ ...styles.image, width: imageWidth, height: imageHeight }}
          /> */}
          <Image
                 source={{ uri: uri }}
                 style={[
                  //  styles.Image,
                   {
                     width: imageWidth,
                     height: imageHeight,
                   },
                 ]}
                 resizeMode="center"
                 onLoadStart={() => setLoading(true)}
                 onLoadEnd={() => setLoading(false)}
                 
               />
               {loading && <ActivityIndicator color="green" size="large" />}
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.descriptionContainer}>
            <Text style={styles.label}>Course Description:</Text>
            <Text style={styles.description}>{course.description}</Text>
          </View>

          <View style={styles.additionalDescriptionContainer}>
            <Text style={styles.label}>Course Details:</Text>
            <Text style={styles.additionalDescription}>{course.additionalDescription}</Text>
          </View>

          <View style={styles.instructorsContainer}>
            <Text style={styles.label}>Course Instructor:</Text>
            <View style={styles.instructorContainer}>
              
                <View  style={styles.inlineContainer}>
                  <Image
                    source={require('./assets/humanIcon.png')}
                    style={styles.instructorIcon}
                  />
                  <Text style={styles.instructor}>{course.instructor}</Text>
                </View>
              
            </View>
          </View>

          <View style={styles.durationContainer}>
            <Text style={styles.label}>Course Duration:</Text>
            <Text style={styles.duration}>{course.duration}</Text>
          </View>

          <View style={styles.modulesContainer}>
            <Text style={styles.label}>Course Modules:</Text>
            <View style={styles.table}>
              {modules.map((module, index) => (
                <TouchableOpacity
                  key={module.order}
                  onPress={() => toggleModule(index)}
                  activeOpacity={0.8}
                >
                  <View
                    style={[
                      styles.tableRow,
                      index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd,
                    ]}
                  >
                    <View style={styles.moduleTitleContainer}>
                      <Feather name="chevron-down" size={16} color="#333" />
                      <Text style={styles.moduleTitle}>{module.name}</Text>
                    </View>

                    {expandedModuleIndex === index && (
                      <View style={styles.moduleContentContainer}>
                        {module.contents.map((item, i) => (
                          <View key={item.order} style={styles.moduleContentItem}>
                            <Feather name="chevron-right" size={14} color="#333" />
                            <TouchableOpacity  onPress={() => {
                                    if(item.content.type=="quiz"){
                                      navigation.navigate('Quiz', { item })
                                    }else if(item.content.type=="video"){
                                      navigation.navigate('VideoScreen', { item })
                                    }
                                    else if(item.content.type=="pdf"){
                                      navigation.navigate('PDFScreen', { item })
                                    }
                                  }
                                }>

                            < Text style={styles.moduleContentText}>{item.content.description}</Text>


                                </TouchableOpacity>

                          </View>
                        ))}
                      </View>
                    )}
                  </View> 
                </TouchableOpacity>
              ))}
            </View>
            
          </View>
          <SafeAreaView style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => {console.log("Drop Course")}}>
              <Text style={styles.container}>Drop Course</Text>
            </TouchableOpacity>
            </SafeAreaView>
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
moduleContainer: {
  marginBottom: 16,
},
moduleContent: {
  fontSize: 17,
},
moduleContainer: {
  marginBottom: 16,
},
moduleHeader: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingVertical: 8,
},
moduleTitle: {
  flex: 1,
  fontSize: 18,
  fontWeight: 'bold',
},
moduleContentContainer: {
  paddingVertical: 8,
},
moduleContent: {
  fontSize: 17,
},
descriptionContainer: {
  marginBottom: 16,
},
additionalDescriptionContainer: {
  marginBottom: 16,
},
instructorsContainer: {
  marginBottom: 16,
},
durationContainer: {
  marginBottom: 16,
},
modulesContainer: {
  marginBottom: 16,
},
modulesContainer: {
  marginBottom: 16,
},
modulesBackground: {
  backgroundColor: '#F0F0F0',
  padding: 16,
  borderRadius: 8,
},
modulesContainer: {
  marginBottom: 16,
},
table: {
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 8,
  marginTop: 8,
  backgroundColor: '#f2f2f2',
},
tableRow: {
  borderBottomWidth: 1,
  borderBottomColor: '#ccc',
  padding: 8,
  backgroundColor: 'transparent',
},
tableRowEven: {
  backgroundColor: '#ebebeb',
},
tableRowOdd: {
  backgroundColor: '#f9f9f9',
},
modulesContainer: {
	marginBottom: 16,
},
  table: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginTop: 8,
    backgroundColor: '#f2f2f2',
},
  tableRow: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 8,
    backgroundColor: 'transparent',
},
  tableRowEven: {
    backgroundColor: '#ebebeb',
},
  tableRowOdd: {
    backgroundColor: '#f9f9f9',
},
  moduleTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
},
  moduleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 4,
},
  moduleContentContainer: {
    marginTop: 8,
    paddingLeft: 24,
},
  moduleContentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
},
  moduleContentText: {
    marginLeft: 4,
},
});

export default CourseDetails;