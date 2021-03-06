import Login from './src/screens/Login';
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Profile from './src/screens/Profile';
import Register from './src/screens/Register';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Programs from './src/screens/Programs'
import store from "./src/redux/store"
import {Provider} from 'react-redux';
import CategoryStack from './src/Navigators/CategoryStack'
const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const HomeStack = ()=>{
  return(
    <Tab.Navigator
        backBehavior='history'
        screenOptions={({route})=>({
          tabBarIcon:({focused,color})=>{
            let iconColor = "#e33d5e"
            { focused ? iconColor = "#e33d5e" : iconColor ="gray"}
            if(route.name === "Programs"){
              return <AntDesign name="profile" size={24} color={iconColor}/>
            }
            if(route.name === "Caterories"){
              return <MaterialCommunityIcons name="dumbbell" size={24} color={iconColor} />
            }
            if(route.name === "Profile"){
              return <Ionicons name="person" size={24} color={iconColor} />
            }
          },
          headerShown:false,
          tabBarActiveTintColor:"#e33d5e",
          tabBarInactiveTintColor:"gray",
        })}>
      <Tab.Screen
        name='Programs'
        component={Programs}/>
      <Tab.Screen
        name="Caterories"
        component={CategoryStack}/>
      <Tab.Screen
          name='Profile' 
          component={Profile}
          />
    </Tab.Navigator>
  )
}
export default function App() {
  return(
    <Provider store={store}>
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
    </Provider>
  )
}
