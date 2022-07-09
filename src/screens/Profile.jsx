import React, { useRef, useState,useEffect } from 'react'
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native'
import {signOut} from 'firebase/auth'
import auth from '../firebase/firebase'
import {useDispatch,useSelector} from 'react-redux'
import {removeUser} from '../redux/userSlice'
function Profile({navigation}) {
    const user = useSelector(state=>state.user.user)
    const dispatch = useDispatch()
    const [isFailed,setIsFailed] = useState(false);
    
    const handleSignOut = ()=>{
        signOut(auth)
        .then(()=>{
            dispatch(removeUser())
            return navigation.navigate("Login",{screen:"Login"})
        })
        .catch((error) =>{
            console.log(error)
        })
    }
    return (
        <View style = {styles.profileContainer}>
            <Text>{user ? user.email : ""}</Text>
            {
                isFailed 
                    ?
                <Text>An error happened while signing out!</Text>
                    :
                <></>    
            }
            <TouchableOpacity style = {styles.button}  onPress = {handleSignOut}>
                <Text style = {styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    profileContainer:{
        flex:1,
        alignItems:"center",
        justifyContent:"space-evenly",
        padding:20
    },
    button:{
        padding:10,
        backgroundColor:"#e33d5e",
        width:"50%",
        borderRadius:4,
    },
    buttonText:{
        color:"white",
        textAlign:"center",
    }
})
export default Profile