import { View, Text,StyleSheet,ScrollView,Image, TouchableOpacity} from 'react-native'
import React from 'react'

const CategoryList = ({navigation}) => {
    const goToCategory = (categoryName)=>{
        return navigation.navigate("ExerciseStack",{
            categoryName:categoryName
        })
    }
    return (
        <View style = {styles.container}>
          <ScrollView>
            <View style = {styles.exerciseContainer}>
              <Text style = {styles.heading}>Chest Exercises</Text>
              <TouchableOpacity style = {styles.shadow} onPress = {(e)=>goToCategory("Chest")}>
                <Image
                  style = {styles.img} 
                  source={require("../../assets/Exercisepics/chest.jpg")}/>     
              </TouchableOpacity>
            </View>
            <View style = {styles.exerciseContainer}>
              <Text style = {styles.heading}>Arm Exercises</Text>
              <TouchableOpacity style = {styles.shadow} onPress = {(e)=>goToCategory("Arm")}>
                <Image
                  style = {styles.img} 
                  source={require("../../assets/Exercisepics/arm.jpg")}/> 
              </TouchableOpacity>    
            </View>
            <View style = {styles.exerciseContainer}>
              <Text style = {styles.heading}>Shoulder Exercises</Text>
              <TouchableOpacity style = {styles.shadow} onPress = {(e)=>goToCategory("Shoulder")}>
                <Image
                  style = {styles.img} 
                  source={require("../../assets/Exercisepics/shoulder.jpg")}/>     
              </TouchableOpacity>
            </View>
            <View style = {styles.exerciseContainer}>
              <Text style = {styles.heading}>Back Exercises</Text>
              <TouchableOpacity style = {styles.shadow} onPress = {(e)=>goToCategory("Back")}>
                <Image
                  style = {styles.img} 
                  source={require("../../assets/Exercisepics/back.jpg")}/>     
              </TouchableOpacity>
            </View>
            <View style = {styles.exerciseContainer}>
              <Text style = {styles.heading}>Stomach Exercises</Text>
              <TouchableOpacity style = {styles.shadow} onPress = {(e)=>goToCategory("Stomach")}>
                <Image
                  style = {styles.img} 
                  source={require("../../assets/Exercisepics/stomach.jpg")}/>     
              </TouchableOpacity>
            </View>
            <View style = {styles.exerciseContainer}>
              <Text style = {styles.heading}>Leg Exercises</Text>
              <TouchableOpacity style = {styles.shadow} onPress = {(e)=>goToCategory("Leg")}>
                <Image
                  style = {styles.img} 
                  source={require("../../assets/Exercisepics/leg.jpg")}/> 
              </TouchableOpacity>    
            </View>
          </ScrollView>
        </View>
      )
}
const styles = StyleSheet.create({
  container:{
    paddingTop:40,
    flex:1,
  },
  exerciseContainer:{
    width:"100%",
    padding:20,
    backgroundColor:"white"
  },
  heading:{
    fontSize:20,
    paddingBottom:10,
  },
  img:{
    width:"100%",
    height:170,
  },
  shadow:{
    width:"100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    
    elevation: 18,
  }
})
export default CategoryList