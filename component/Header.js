import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import colours from '../constants/colours';
import TitleText from './TitleText';

const Header=(props)=> {
  return (
    <View style={{
      ...styles.headerBase,
      ...Platform.select({
        ios:styles.headerIOS,
        android:styles.headerAndroid
      })
    }}
      >
      <TitleText style={styles.title} >{props.title}</TitleText>
         </View>
  );
}

const styles = StyleSheet.create({
  headerBase: {
    width: '100%',
    height:90,
    paddingTop:36,
    alignItems:'center',
    justifyContent: 'center',
  },
  headerIOS:{
    backgroundColor:'white',
    borderBottomColor: 'black',
    borderBottomWidth:  1
    
  },
  headerAndroid:{
    backgroundColor: colours.primary ,
    borderBottomColor:'transparent',
    borderBottomWidth:0
  },
  headerTitle:{
      color:'white',
      fontSize:18,
      fontFamily:'open-sans-bold'
  },
  title:{
    color:Platform.OS === 'ios'? colours.primary: 'blue'
  }
})

export default Header