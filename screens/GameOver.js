import React, { useState, useEffect } from 'react'
import {StyleSheet, View, Text, Button,Image,Dimensions, ScrollView,SafeAreaView} from 'react-native'
import BodyText from '../component/BodyText'
import TitleText from '../component/TitleText'
import colours from '../constants/colours'
import MainButton from '../component/MainButton.ios'
const GameOver=(props)=>{

    const [deviceWidth,setDeviceWidth]= useState(Dimensions.get('window').width)
    const [deviceHeight,setDeviceHeight]= useState(Dimensions.get('window').height)

    let imageContainer= styles.imageContainer
    if(deviceWidth<350|| deviceHeight<500){
        imageContainer=styles.imageContainerBig
    }

    useEffect(()=>{
        updateLayout=()=>{
            setDeviceHeight(Dimensions.get('window').height)
            setDeviceWidth(Dimensions.get('window').width)
        }
        Dimensions.addEventListener('change', updateLayout)
        return ()=>{
            Dimensions.removeEventListener('change',updateLayout)
        }

    })
    return(
    <SafeAreaView>
    <ScrollView>

        <View style={styles.screen}>
            <TitleText>
                The Game is over
            </TitleText>
            <View style={imageContainer}>
            <Image style={styles.image}
            resizeMode="cover"
            source={{uri:'https://images.unsplash.com/photo-1517021897933-0e0319cfbc28?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=838&q=80'}}/>

            </View>
            <BodyText style={styles.resultText}>
                Your phone needed <Text style={styles.highlight}>
                {props.guesses}
                </Text> number of rounds to guess the number <Text style={styles.highlight}>
                {props.selectedNumber}
                </Text>
            </BodyText>
            <BodyText>
            </BodyText>
            <MainButton onPress={props.restartGame}>
                New Game
            </MainButton>
        </View>
            </ScrollView>
            </SafeAreaView>
    )

}


const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        padding:10

    },
    image:{
        width:'100%',
        height:'100%'
    },
    imageContainer:{
        width:Dimensions.get('window').width*0.7,
        height:Dimensions.get('window').width*0.7,
        borderRadius:Dimensions.get('window').width*0.7/2 ,
        borderWidth:3,
        borderColor:'black',
        overflow:'hidden',
        marginVertical:Dimensions.get('window').height/30
    },
    imageContainerBig:{
        width:Dimensions.get('window').width*0.8,
        height:Dimensions.get('window').width*0.8,
        borderRadius:Dimensions.get('window').width*0.8/2 ,
        borderWidth:3,
        borderColor:'black',
        overflow:'hidden',
        marginVertical:Dimensions.get('window').height/30,
        padding:10
    },
    highlight:{
        color:colours.primary
    },
    resultText:{
        textAlign:'center',
        fontSize:Dimensions.get('window').height<400 ? 16 : 20, 
        marginVertical:Dimensions.get('window').height/60
    }
})

export default GameOver