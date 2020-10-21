import React from 'react'
import {View,StyleSheet,Keyboard,Text,Alert, Button,TouchableWithoutFeedback} from 'react-native'
import colours from '../constants/colours'


const NumberContainer=props=>{
    return(

<View style={{...styles.numberContainer,...props.styles}}>
    <Text style={{...styles.number,...props.styles}}>
    {props.children}
    </Text>
    
    </View>
    )

}


const styles =StyleSheet.create({
 numberContainer:{
     borderColor:'purple',
     backgroundColor:colours.primary,
     borderWidth:10,
     padding:30,
     margin:30,
     borderRadius:100
 },
 number:{
     fontSize:22,
 }
})

export default NumberContainer