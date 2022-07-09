import { View, Text,FlatList,TouchableOpacity,StyleSheet} from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import {collection,query,where,getDocs} from 'firebase/firestore'
import Spinner from '../Animations/Spinner';
import { db } from '../firebase/firebase';

const ExerciseList = ({categoryName,navigation}) => {
    const [list,setList] = useState([])
    const [isFetching,setIsFetching] = useState(false)
    useEffect(()=>{
      setIsFetching(true)
      const getExercises = async ()=>{
        try {
          const q = query(collection(db,"exercises"),where("typeOf","==",categoryName))
          const querysnapshot = await getDocs(q)
          setList(querysnapshot.docs);
          setIsFetching(false);       
        } catch (error) {
          console.log(error)
        }
      }
      getExercises()
    },[])
    const goToExercise = (item)=>{
      return navigation.navigate("Exercise",{
        categoryName:categoryName,
        ...item
      })
    }
    return(
      <View style = {styles.container}>
          {
            isFetching 
              ?
            <View style = {styles.spinner}>
              <Spinner isFetching={isFetching} marginBottom={20}/>
            </View>
              :
            <></>
          }
          <FlatList
            data={list}
            renderItem = {({item})=>{
              return(
                <View style = {styles.exerciseContainer}>
                  <Text>{item.data().name}</Text>
                  <TouchableOpacity style = {styles.shadow} onPress = {(e)=>goToExercise(item.data())}>
                    <AntDesign name="arrowright" size={24} color="#e33d5e" />  
                  </TouchableOpacity>
                </View>
              )
            }}
          />
      </View>
    )
}
const styles = StyleSheet.create({
  container:{
    margin:0,
    flex:1,
  },
  exerciseContainer:{
    width:"100%",
    padding:20,
    flex:1,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between", 
    backgroundColor:"white",
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 18,
    marginTop:3,
  },
  spinner:{
    alignItems:"center"
  }
})
export default ExerciseList