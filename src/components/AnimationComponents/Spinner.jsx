import { useEffect,useRef} from 'react';
import { Animated } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';

const Spinner = ({isFetching,marginBottom})=>{
  const rotate = useRef(new Animated.Value(0)).current
  const handleRotation = ()=>{
    Animated.timing(
      rotate,
      {
        toValue:1,
        duration:4000,
        useNativeDriver:true
      }
    ).start()
  }
  useEffect(()=>{
    if(isFetching){
        handleRotation()
    }
  },[isFetching])
  return(
    <Animated.Text style = {{transform:[
      {
        rotate:rotate.interpolate({
          inputRange:[0,1],
          outputRange:['0deg','360deg']
        })
      },
    ],marginBottom:marginBottom}}>
      <EvilIcons name="spinner-3" size={40} color="#e33d5e" />
    </Animated.Text>
  )
}

export default Spinner