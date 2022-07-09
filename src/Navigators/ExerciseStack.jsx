import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ExerciseList from '../screens/ExerciseList'
import Exercise from '../screens/Exercise'
const Stack = createNativeStackNavigator()
const ExerciseStack = ({route,navigation}) => {
    return(
        <Stack.Navigator screenOptions={{
          headerStyle:{backgroundColor:"#e33d5e",color:"white"},
          headerTintColor:"white",
        }}>
          <Stack.Screen
            name="ExerciseList" 
            component={({navigation})=>{
              return <ExerciseList categoryName={route.params.categoryName} navigation= {navigation}/>
            }}
            options={{
              title:`${route.params.categoryName} Exercises`
            }}/>
          <Stack.Screen 
            name = "Exercise"
            component={Exercise}
            options={{
              title:"How To?"
            }}/>
        </Stack.Navigator>
      )
}

export default ExerciseStack