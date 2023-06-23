import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MyLearningScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Learning</Text>
      <Text style={styles.subtitle}>Welcome to My Learning Module!</Text>
      <Text style={styles.description}>
        This is where you can access your online courses and track your learning progress.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default MyLearningScreen;
