import React, { useEffect, useState } from "react";
import { FAB } from "react-native-paper";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { LogBox } from 'react-native';
import Home from "./screens/Home/Home";
import Profile from "./screens/Profile/Profile";
import MyLearning from "./screens/MyLearning/MyLearning";
import ChatSupport from "./screens/ChatSupport/ChatSupport";
import CourseDetails from "./screens/CourseDetails/CourseDetails";
import Quiz from "./screens/Quiz/quiz";
import "react-native-gesture-handler"; 

import Navigation from "./Navigation";


// LogBox.ignoreLogs(['Warning: ...']);
// LogBox.ignoreAllLogs();

const Tab = createMaterialBottomTabNavigator();

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  SafeAreaView,
  Modal,
  TouchableOpacity
} from "react-native";


import { Amplify } from "aws-amplify";
import awsExports from "./src/aws-exports";
import { withAuthenticator } from "@aws-amplify/ui-react-native";
Amplify.configure(awsExports);

const App = () => {
  return (
    <Navigation />
  );
}


export default withAuthenticator(App);


const styles = StyleSheet.create({
  container: { width: 400, flex: 1, padding: 20, alignSelf: "center" },
  todo: { marginBottom: 15 },
  input: {
    backgroundColor: "#ddd",
    marginBottom: 10,
    padding: 8,
    fontSize: 18,
  },
  todoName: { fontSize: 20, fontWeight: "bold" },
  buttonContainer: {
    alignSelf: "center",
    backgroundColor: "black",
    paddingHorizontal: 8,
  },
  buttonText: { color: "white", padding: 16, fontSize: 18 },
  fab: {
    position: "absolute",
    margin: 16,
    right: 16,
    bottom: 100,
  },

  modalContainer: {
    flex: 1,
  },
  headingContainer: {
    backgroundColor: '#6750A4',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headingText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  popupContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  popupText: {
    fontSize: 24,
    marginBottom: 20,
  },
  closeButton: {
    position: "absolute",
    top: -30,
    left: 5,
    backgroundColor: "#ccc",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 50,
  },
});