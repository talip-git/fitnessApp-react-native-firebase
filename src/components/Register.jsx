import { View, Text,StyleSheet,TouchableOpacity,TextInput} from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import auth,{db} from '../firebase/firebase'
import { createUserWithEmailAndPassword} from 'firebase/auth';
import {doc,setDoc,query,where,collection, getDocs } from 'firebase/firestore';
import { useState } from 'react';
import Spinner from './AnimationComponents/Spinner';
import { async } from '@firebase/util';
const Register = ({navigation}) => {
    const [username,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [repass,setRepass] = useState("")
    const [failed,setFailed] = useState(null);
    const [isFetching,setIsFetching] = useState(false)

    const checkSignIn = async ()=>{
        try {
            const q = query(collection(db,"users"),where("email","==",email))
            const querySnapshot = await getDocs(q)
            if(querySnapshot){
                return true;
            }
            return false;
        } catch (error) {
            console.log(error)
            return false;
        }
    }

    const handleRegister = ()=>{   
        setIsFetching(true)

        if(password !== repass){
            setIsFetching(false)
            return setFailed("Password Needs To Be Matched!")
        }

        if(email.indexOf("@") === -1){
            setIsFetching(false);
            return setFailed("Wrong Email Format!")
        }
        const handle = async ()=>{
            try {
                const user_exists = await checkSignIn()
                if(user_exists){
                    setIsFetching(false)
                    return setFailed("User with email exists in our database! Please login.");
                }
    
                const userCredentials = await createUserWithEmailAndPassword(auth,email,password)
                if(userCredentials){
                    const docRef = doc(db,"users",userCredentials.user.uid)
                    setDoc(docRef,{
                        username:username,
                        email:email
                    })
                    .then(()=>{
                        setIsFetching(false);
                        navigation.navigate("Login")
                    })
                } 
            } catch (error) {
               console.log(error)
               return setFailed("An error happened while logging in!")    
            }
        }
        handle()
    }
  return (
    <View style = {styles.registerContainer}>
        <Text style = {styles.registerHeading}>Create Account</Text>
        <View style = {styles.card}>
            {failed 
                ?
            <Text style = {{color:"red"}}>{failed}</Text>
                :
            <></>
            }
            <TextInput
                style = {styles.textInput} 
                placeholder='username'
                onChangeText={(username)=>setUsername(username)}/>
            <TextInput
                style = {styles.textInput}  
                placeholder='E-mail'
                onChangeText={(email)=>setEmail(email)}/>
            <TextInput
                style = {styles.textInput} 
                placeholder='Password'
                onChangeText={(password)=>setPassword(password)}/>
            <TextInput
                style = {styles.textInput} 
                placeholder='Re-password'
                onChangeText={(password)=>setRepass(password)}/>
            <TouchableOpacity style = {styles.button} onPress={handleRegister}>
                <Text style = {styles.text}>Register</Text>
            </TouchableOpacity>
        </View>
        <View style = {{width:"100%",alignItems:"center",justifyContent:"space-around"}}>
            {isFetching 
                ?
            <Spinner isFetching={isFetching} marginBottom={30}/>
                :
            <Text style = {{marginBottom:20}}>Go Back!</Text>
            }
            <TouchableOpacity
            style = {{
                padding:10,
                backgroundColor:"#e33d5e",
                borderRadius:5
            }}
            onPress = {(e)=>navigation.navigate("Login")}
            >
                <AntDesign name="arrowleft" size={24} color="white" />
            </TouchableOpacity>
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
    registerContainer:{
        flex:1,
        alignItems:"center",
        padding:30,
        justifyContent:"space-around"
    },
    registerHeading:{
        textAlign:"center",
        fontSize:22,
    },
    card:{
        backgroundColor:"white",
        padding:20,
        width:"80%",
        borderRadius:5
    },
    textInput:{
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
        marginTop:15
    },
    button:{
        padding:10,
        backgroundColor:"#e33d5e",
        width:"100%",
        marginTop:20,
    },
    text:{
        color:"white",
        textAlign:"center"
    }
})
export default Register