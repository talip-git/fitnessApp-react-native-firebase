import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CategoryList from '../screens/CategoryList'
import ExerciseStack from './ExerciseStack'
const Stack = createNativeStackNavigator()

const CategoryeStack = () => {
    return (
        <Stack.Navigator
          screenOptions={{
            headerShown:false,
          }}>
          <Stack.Screen
            name = "CategoryList"
            component={CategoryList}/>
          <Stack.Screen
            name="ExerciseStack"
            component={ExerciseStack}/>
        </Stack.Navigator>
      )
}

export default CategoryeStack