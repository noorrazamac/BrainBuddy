import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ScrollView ,Button, RefreshControl} from 'react-native';
import { Amplify, API, Storage } from 'aws-amplify';
import awsconfig from '../../src/aws-exports';
import { Video, ResizeMode } from 'expo-av';
import { useRoute, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Constants } from 'expo';


Amplify.configure(awsconfig);



const PDFScreen = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [isDataLoaded, setDataLoaded] = React.useState(false);
    const [uri, setUri] = useState("../../");
    const route=useRoute();
    const {params}  = route;
    const content=params.item.content;
    console.log(content);

// Later on in your styles..
    
  if(isDataLoaded == false){
    Storage.get(content.sourse_path,  {
        level: 'public', // defaults to `public`
        
        expires: 3600, // validity of the URL, in seconds. defaults to 900 (15 minutes) and maxes at 3600 (1 hour)
        // contentType: 'string', // set return content type, eg "text/html"
        validateObjectExistence: true, // defaults to false
        // cacheControl?: string, // Specifies caching behavior along the request/reply chain
      }).then((result) => {
        setUri(result)
        setDataLoaded(true)
      }).catch((err) => {console.log(err)});
  }
    
      const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setDataLoaded(false);
        setTimeout(() => {
          setRefreshing(false);
        }, 1000);
      }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>BrainBuddy PDF</Text>
        
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer} 
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
      <View style={styles.video}>
        <SafeAreaView style={styles.questionText}>
        <Text style={styles.questionText}>{content.description}</Text>
        </SafeAreaView>
        
        <View style={styles.container}>
        {/* <Pdf source={uri} style={styles.pdf} /> */}
            </View>
        
        </View>   
      </ScrollView>
      
    </View>
  );
};

const styles = StyleSheet.create({
  
  video: {
    width: '100%',
    height: 300,
  },
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
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
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 20,
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  optionButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
  },
  selectedOptionButton: {
    borderColor: 'blue',
  },
  optionText: {
    fontSize: 18,
    color: '#000000',
    textAlign: 'center',
  },
  matchingContainer: {
    marginBottom: 10,
  },
  matchingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  matchingQuestion: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
  },
  matchingAnswer: {
    flex: 1,
    fontSize: 16,
    color: '#666',
    textAlign: 'right',
  },
  feedbackContainer: {
    marginTop: 10,
  },
  feedbackText: {
    fontSize: 18,
    color: '#000000',
    textAlign: 'center',
  },
  correctFeedbackText: {
    color: 'green',
  },
  incorrectFeedbackText: {
    color: 'red',
  },
  nextButton: {
    backgroundColor: '#8BC34A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  quizCompletedText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  scoreContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  totalScoreLabel: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  scoreInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalScore: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#00aa00',
  },
  percentageScore: {
    fontSize: 24,
    color: '#888',
  },
  
});

export default PDFScreen;
