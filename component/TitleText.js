import React from 'react'
import {Text,StyleSheet} from 'react-native'

const TitleText= props=>  <Text style={{...styles.body,...props.style}}>{props.children}</Text>

const styles=StyleSheet.create({
    body:{
        fontFamily:'open-sans-bold',
        fontSize:20
    }
})

export default TitleText