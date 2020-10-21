import React from 'react'
import {View, Text ,StyleSheet, TouchableOpacity,TouchableNativeFeedback,Platform, Button} from 'react-native'
import colours from '../constants/colours'

const MainButton = props=>{

   
  
    return(


    <TouchableOpacity  activeOpacity={0.6} onPress={props.onPress}>
        <View style={styles.button}>
            <Text style={styles.buttonText}>
                {props.children}
            </Text>
        </View>
    </TouchableOpacity>
    )
}

const styles =StyleSheet.create({
 button:{
     backgroundColor:colours.primary,
     paddingVertical:12,
     paddingHorizontal:32,
     borderRadius:20

 },
 buttonText:{
     color:'white',
     fontFamily:'open-sans'
 },
 buttonContainer:{
     borderRadius:20,
     overflow:'hidden'
 }
})

export default MainButton