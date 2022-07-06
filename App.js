import Login from './src/components/Login';
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Profile from './src/components/Profile';
import Register from './src/components/Register';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import auth from './src/firebase/firebase';

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()
const user = auth.currentUser;
const HomeStack = ()=>{
  return(
    <Tab.Navigator
        backBehavior='history'
        screenOptions={{
          headerShown:false
        }}>
      <Tab.Screen
          name='Profile' 
          component={Profile}/>
    </Tab.Navigator>
  )
}
export default function App() {
  return(
    <NavigationContainer>
      <Stack.Navigator 
        backBehavior='history'
        screenOptions={{
          headerShown:false
        }}>
        <Stack.Group>
          <Stack.Screen
            name='Login' 
            component={Login}/>
          <Stack.Screen
            name='Register' 
            component={Register}/>
          <Stack.Screen 
            name = "Home" 
            component={HomeStack}/>
        </Stack.Group>  
      </Stack.Navigator>
    </NavigationContainer>
  )
}
