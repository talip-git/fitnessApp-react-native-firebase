import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text,TextInput,View,TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Spinner from './AnimationComponents/Spinner'
import {signInWithEmailAndPassword,onAuthStateChanged} from "firebase/auth"
import auth from '../firebase/firebase'
import { useSelector,useDispatch } from 'react-redux';
import {addUser} from '../redux/userSlice'
import { useFocusEffect } from '@react-navigation/native';

function Login({navigation}) {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [isFetching,setIsFetching] = useState(false)
    const [failed,setFailed] = useState(false)
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()
    console.log(user);
    useFocusEffect(()=>{
      if(user){
        return navigation.navigate("Home",{screen:"Profile"})
      }
      return;
    })

    useEffect(()=>{
      const unsubscribe = onAuthStateChanged(auth,(userCredentials)=>{
        if(userCredentials){
          if(user === null){
            const newUser = {
              email:userCredentials.email,
              id:userCredentials.uid,
            }
            dispatch(addUser(newUser))
          }
          navigation.navigate("Home",{screen:"Profile"})
        }
      })
      return unsubscribe()
    },[])

    const handleRegister = (e)=>{
        navigation.navigate("Register")
    }

    const handleLogin = (e)=>{
      setIsFetching(true)
      signInWithEmailAndPassword(auth,email,password)
      .then((userCredentials)=>{
        const user = {
          email:email,
          id:userCredentials.user.uid,
        }
        dispatch(addUser(user))
        setIsFetching(false)
        navigation.navigate("Home",{screen:"Profile"})
      })
      .catch((error)=>{
        setIsFetching(false);
        setFailed(true)
        console.log(error)
      })
    }

    return (
      <View style={styles.container}>
        <View style = {styles.cardHeader}>
          <Text style = {styles.headerText}>Hello!</Text>
          <Text style = {{textAlign:"center"}}>Sign In To Your Account</Text>
        </View>
        <View style={styles.cardBody}>
          {
            failed 
              ? 
            <Text style = {{color:"red",width:"100%"}}>Authentication failed! Please Check Your Credentials!</Text>
              :
            <></>
          }
          <View>
            <TextInput 
              style = {styles.input} 
              placeholder = "E-mail"
              onChangeText={(e)=>setEmail(e)}/>
          </View>
          <View>
            <TextInput 
              style = {styles.input} 
              placeholder = "Password"
              onChangeText = {password => setPassword(password)}/>
          </View>
          <View>
            <TouchableOpacity style = {styles.cardButton} onPress = {handleLogin}>
                <Text style = {styles.button}>Log In</Text>  
            </TouchableOpacity>
            <TouchableOpacity style = {styles.cardButton} onPress = {handleRegister}>
                <Text style = {styles.button}>Register</Text>  
            </TouchableOpacity>
          </View>
        </View>
        <View style = {styles.footer}>
          {isFetching 
              ? 
            <Spinner isFetching={isFetching} marginBottom={0}/>
              :
            <Text style = {{textDecorationStyle:"dashed"}}>Or Login With Google</Text>  
          }
          <TouchableOpacity style = {styles.footerIcons}>
            <AntDesign name="google" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <StatusBar style="auto" />
      </View>
    );
  }
  const styles = StyleSheet.create({
    container: {
      flex:1,
      paddingTop:50,
      paddingBottom:20,
      alignItems:"center",
    },
    cardHeader:{
      flex:1,
      padding:10,
      width:"90%",
    },
    headerText:{
      fontSize:40,
      textAlign:"center"
    },
    cardBody:{
      display:"flex",
      flex:2,
      justifyContent:"space-evenly",
      margin:5,
      padding:30,
      backgroundColor:"white",
      borderRadius:10,
      width:"80%",
    },
    bodyText:{
      fontSize:15,
      marginBottom:8,
    },
    img:{
      height:300,
      width:300,
    },
    cardButton:{
      backgroundColor:"#e33d5e",
      width:"100%",
      padding:10,
      marginTop:10,
    },
    button:{
      textAlign:"center",
      color:"white"
    },
    input:{
      width:"100%",
      backgroundColor:"white",
      height:40,
      padding:10,
      color:"black",
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 5,
      },
      shadowOpacity: 0.34,
      shadowRadius: 6.27,
      elevation: 10,
    },
    footerText:{
      marginBottom:20,
    },
    footer:{
      flex:1,
      alignItems:"center",
      justifyContent:"space-around",
    },
    footerIcons:{
      padding:10,
      backgroundColor:"#e33d5e",
      borderRadius:4,
    },
  });
export default Login