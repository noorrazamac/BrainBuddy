 import { NavigationContainer } from "@react-navigation/native";
import MyLearning from "./screens/MyLearning/MyLearning";
import Feed from "./screens/Feed";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MyLearningScreen from "./screens/MyLearning/MyLearning"; 
import Home from "./screens/Home/Home";
import Profile from "./screens/Profile/Profile";
import CourseDetails from "./screens/CourseDetails/CourseDetails";
import Quiz from "./screens/Quiz/quiz";
const Tab = createBottomTabNavigator();
import { AntDesign } from '@expo/vector-icons';
// import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const LearningStack = createNativeStackNavigator();
function LearningStackGroup () {
  return (
    <LearningStack.Navigator>
      <LearningStack.Screen name="MyLearningScreen" component={MyLearningScreen} options={{headerShown:false}}/>
      <LearningStack.Screen name="CourseDetails" component={CourseDetails} options={{headerShown:false}}/>
      <LearningStack.Screen name="Quiz" component={Quiz}options={{headerShown:false}} />
    </LearningStack.Navigator>
  );
}

function TabGroup() {
  return (
    <Tab.Navigator
      screenOptions={
        {
          headerShown: false,
          tabBarActiveTintColor: 'black',
        }
        
      }>
      <Tab.Screen name="Home" component={Home} 
      options={{
        tabBarIcon: ({ color, size }) => (<Ionicons name="home" size={24} color="black" />)
      }}
      />
      <Tab.Screen name="LearningStackGroup" component={LearningStackGroup} 
        options={{
          tabBarIcon: ({ color, size }) => (<AntDesign name="book" size={24} color="black" />),
          headerShown: false,
          tabBarLabel: 'My Learning'

        }}
      />
      <Tab.Screen name="Profile" component={Profile}
      options={{
        tabBarIcon: ({ color, size }) => (<AntDesign name="user" size={24} color="black" />)
      }} />
    </Tab.Navigator>
  );
  }
 export default function Navigation() {
    return (
      <NavigationContainer>
        <TabGroup />
      </NavigationContainer>
    );
 }

 