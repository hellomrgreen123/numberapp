import React from 'react'
import {View, Text ,StyleSheet, TouchableOpacity,TouchableNativeFeedback,Platform, Button} from 'react-native'
import colours from '../constants/colours'

const MainButton = props=>{

    let ButtonComponent= TouchableOpacity;

    if (Platform.Version >=21){
        ButtonComponent= TouchableNativeFeedback;
    }
    return(
    <View style={styles.buttonContainer}>

    <ButtonComponent  activeOpacity={0.6} onPress={props.onPress}>
        <View style={styles.button}>
            <Text style={styles.buttonText}>
                {props.children}
            </Text>
        </View>
    </ButtonComponent>
    </View>)
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