import { View, Text,StyleSheet, ScrollView,Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { storage } from '../firebase/firebase'
import { getDownloadURL,ref } from 'firebase/storage'
const Exercise = ({route,navigation}) => {
  const [uri,setUrI] = useState("")
  useEffect(()=>{
    const reference = ref(storage,"incline-bench.jpg")
    getDownloadURL(reference)
    .then((url)=>{
      setUrI(url)
    })
    .catch((err)=>{
      console.error(err);
    })
  },[])
  return (
    <View style = {styles.container}>
      <ScrollView>
        <Text style = {styles.heading}>{route.params.name}</Text>
        <Image style = {styles.img} source = {{
          uri:uri
        }}/>
        <Text style={{borderBottomColor:"#adadad",width:"100%",borderBottomWidth:0.7}}></Text>
        <Text style={{
          marginTop:4,
          fontSize:15,
          lineHeight:30,
        }}>{route.params.desc}</Text>
      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:20,
  },
  heading:{
    fontSize:20,
    padding:10,
    letterSpacing:2,
    borderBottomColor:"#adadad",
    width:"100%",
    borderBottomWidth:0.7
  },
  img:{
    width:"100%",
    height:300,
    marginTop:10,
  },
})

export default Exercise