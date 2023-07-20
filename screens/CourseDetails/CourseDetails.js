import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

const course = {
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

const CourseDetails = () => {
  const screenWidth = Dimensions.get('window').width;
  const imageWidth = screenWidth - 32;
  const imageHeight = (imageWidth * 9) / 16;

  const [expandedModuleIndex, setExpandedModuleIndex] = useState(null);

  const toggleModule = (index) => {
    if (expandedModuleIndex === index) {
      setExpandedModuleIndex(null);
    } else {
      setExpandedModuleIndex(index);
    }
  };

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
          <View style={styles.descriptionContainer}>
            <Text style={styles.label}>Course Description:</Text>
            <Text style={styles.description}>{course.description}</Text>
          </View>

          <View style={styles.additionalDescriptionContainer}>
            <Text style={styles.label}>Course Details:</Text>
            <Text style={styles.additionalDescription}>{course.additionalDescription}</Text>
          </View>

          <View style={styles.instructorsContainer}>
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
          </View>

          <View style={styles.durationContainer}>
            <Text style={styles.label}>Course Duration:</Text>
            <Text style={styles.duration}>{course.duration}</Text>
          </View>

          <View style={styles.modulesContainer}>
            <Text style={styles.label}>Course Modules:</Text>
            <View style={styles.table}>
              {course.modules.map((module, index) => (
                <TouchableOpacity
                  key={index}
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
                      <Text style={styles.moduleTitle}>{module.title}</Text>
                    </View>

                    {expandedModuleIndex === index && (
                      <View style={styles.moduleContentContainer}>
                        {module.content.map((item, i) => (
                          <View key={i} style={styles.moduleContentItem}>
                            <Feather name="chevron-right" size={14} color="#333" />
                            <Text style={styles.moduleContentText}>{item}</Text>
                          </View>
                        ))}
                      </View>
                    )}
                  </View> 
                </TouchableOpacity>
              ))}
            </View>
          </View>
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
});

export default CourseDetails;