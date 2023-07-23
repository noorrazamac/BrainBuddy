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
import VideoScreen from "./screens/Content/VideoScreen";
const Tab = createBottomTabNavigator();
import { AntDesign } from '@expo/vector-icons';
// import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import ChangePassword from "./screens/Profile/ChangePassword";
import ChatSupport from "./screens/ChatSupport/ChatSupport";
import { Entypo } from '@expo/vector-icons';
import PDFScreen from "./screens/Content/PDFScreen";import PaymentMethodScreen from './screens/CourseEnrollmentPayment/PaymentMethodScreen';

const LearningStack = createNativeStackNavigator();
function LearningStackGroup () {
  return (
    <LearningStack.Navigator>
      <LearningStack.Screen name="MyLearningScreen" component={MyLearningScreen} options={{headerShown:false}}/>
      <LearningStack.Screen name="CourseDetails" component={CourseDetails} options={{headerShown:false}}/>
      <LearningStack.Screen name="Quiz" component={Quiz}options={{headerShown:false}} />
      <LearningStack.Screen name="VideoScreen" component={VideoScreen}options={{headerShown:false}} />
      {/* <LearningStack.Screen name="PDFScreen" component={PDFScreen}options={{headerShown:false}} /> */}
    </LearningStack.Navigator>
  );
}

const ProfileStack = createNativeStackNavigator();
function ProfileStackGroup () {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={Profile} options={{headerShown:true}}/>
      <ProfileStack.Screen name="ChangePassword" component={ChangePassword} options={{headerShown:true}}/>
    </ProfileStack.Navigator>
  );
}


const HomeStack = createNativeStackNavigator();
function HomeStackGroup () {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={Home} options={{headerShown:true}}/>
      <HomeStack.Screen name="PaymentMethodScreen" component={PaymentMethodScreen}  options={{headerShown:true, headerTitle: 'Payment Method', headerStyle: {elevation: 20}}}/>
    </HomeStack.Navigator>
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
      <Tab.Screen name="HomeStackGroup" component={HomeStackGroup}
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
      <Tab.Screen name="ProfileStackGroup" component={ProfileStackGroup}
      options={{
        tabBarIcon: ({ color, size }) => (<AntDesign name="user" size={24} color="black" />),
        headerShown: false,
        tabBarLabel: 'My Learning'
      }} />

<Tab.Screen name="Chat Support" component={ChatSupport} 
      options={{
        tabBarIcon: ({ color, size }) => (<Entypo name="chat" size={24} color="black" />)
      }}
      />
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

 