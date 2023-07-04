import React, { useEffect, useState } from "react";
import { FAB } from "react-native-paper";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import Home from "./screens/Home/Home";
import Profile from "./screens/Profile/Profile";
import MyLeaning from "./screens/MyLearning/MyLearning";
import ChatSupport from "./screens/ChatSupport/ChatSupport";

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
// import {API, graphqlOperation} from 'aws-amplify';
// import {createTodo} from './src/graphql/mutations';
// import {listTodos} from './src/graphql/queries';
import {
  withAuthenticator,
  useAuthenticator,
} from "@aws-amplify/ui-react-native";

import { Amplify } from "aws-amplify";
import awsExports from "./src/aws-exports";
Amplify.configure(awsExports);

// retrieves only the current value of 'user' from 'useAuthenticator'
const userSelector = (context) => [context.user];

const HomeScreen = () => {
  return (
    <View>
      <Text>Home Screen</Text> 
      {/* Add your content here */}
    </View>
  );
};

const SettingsScreen = () => {
  return (
    <View>
      <Text>Settings Screen</Text>
      {/* Add your content here */}
    </View>
  );
};

const SignOutButton = () => {
  const { user, signOut } = useAuthenticator(userSelector);

  return (
    <Pressable onPress={signOut} style={styles.buttonContainer}>
      <Text style={styles.buttonText}>
        Hello, {user.username}! Click here to sign out!
      </Text>
    </Pressable>
  );
};
const testAPI = () => {
  const apiName = 'course';
  const path = '/course';
  const myInit = {
    headers: {}, // OPTIONAL
    response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
    queryStringParameters: {
      name: 'param' // OPTIONAL
    }
  };
}
const App = () => {

  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const openPopup = () => {
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };


  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <SafeAreaProvider>
          <Tab.Navigator>
            <Tab.Screen
              name="My Learning"
              component={MyLeaning}
              options={{
                tabBarIcon: ({ color }) => (
                  <Icon name="book" color={color} size={24} />
                ),
              }}
            />
            <Tab.Screen
              name="Home"
              component={Home}
              options={{
                tabBarIcon: ({ color }) => (
                  <Icon name="home" color={color} size={24} />
                ),
              }}
            />
            <Tab.Screen
              name="Profile"
              component={() => <Profile SignOut={SignOutButton} />}
              options={{
                tabBarIcon: ({ color }) => (
                  <Icon name="account" color={color} size={24} />
                ),
              }}
            />
          </Tab.Navigator>
        </SafeAreaProvider>
      </NavigationContainer>

      <FAB
        icon="forum"
        style={styles.fab}
        onPress={openPopup}
      />

      <Modal visible={isPopupVisible} animationType="slide">
        <SafeAreaView style={styles.modalContainer}>
            <View style={styles.headingContainer}>
              <Text style={styles.headingText}>Chat Support</Text>
            </View>
            <View style={styles.popupContainer}>

              <ChatSupport/>

              <TouchableOpacity
                style={styles.closeButton}
                onPress={closePopup}
              >
                <Icon name="arrow-left" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};
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
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headingText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
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
