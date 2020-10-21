import React, { useState, useRef, useEffect } from 'react'
import { View, StyleSheet,Text, Button, Alert, ScrollView,FlatList, Dimensions } from 'react-native'
import NumberContainer from '../component/NumberContainer';
import Card from '../component/Card'
import MainButton from '../component/MainButton.ios';
import {Ionicons} from '@expo/vector-icons'
import BodyText from '../component/BodyText';
const generateNumber=(min, max, exclude)=>{
    min= Math.ceil(min);
    max= Math.floor(max)
    const rndNum= Math.floor(Math.random()*(max-min))+min
    if (rndNum ==exclude){
        return generateNumber=(min, max, exclude)
    }else{
        return rndNum
    }
}

 const renderListItem=(value,numOfRound)=>(
 <View  key={value}style={styles.listItem}>
     <BodyText>
         #{numOfRound}
     </BodyText>
     <BodyText>
         {value}
     </BodyText>
 </View>)
const GameScreen=(props)=>{

    const intialGuess=generateNumber(1,100,selectedNumber)
    const{ onGameover,selectedNumber}= props 
    const [currentGuess, setCurrentGuess]=useState(intialGuess)
    const [guesses,setGuesses]=useState([intialGuess])
    const [deviceWidth, setDeviceWidth] =useState(
        Dimensions.get('window').width)
    const [deviceHeight, setDeviceHeight] =useState(
        Dimensions.get('window').height)
    const currentLow = useRef(1);
    const currentHigh= useRef(100);
       
        useEffect(()=>{
            if (currentGuess == selectedNumber){
                onGameover(guesses.length)
            }
         },[currentGuess,selectedNumber,onGameover])


        useEffect(()=>{
            const updateLayout =()=>{
                setDeviceWidth(Dimensions.get('window').width)
                setDeviceHeight(Dimensions.get('window').height)
            }
            Dimensions.addEventListener('change',updateLayout)
            return ()=>{
            Dimensions.removeEventListener('change',updateLayout)    
            }
        }
        )
        const higherNumberHandler=()=>{
            if(currentGuess>selectedNumber){
                Alert.alert(
                    'Invalid number',
                    'You know this is wrong',
                    [{text:'Okay', style:'destructive'}] )
            }else{
                currentLow.current= currentGuess+1
                nextnumber=generateNumber(currentLow.current,currentHigh.current,currentGuess)
                setCurrentGuess(nextnumber)
                setGuesses(currentGuesses=>[nextnumber,...currentGuesses])
        }}
        
        const lowerNumberHandler=()=>{
            if(currentGuess<selectedNumber){
                Alert.alert(
                    'Invalid number',
                    'You know this is wrong ',
                    [{text:'Okay', style:'destructive'}] )
            }else{
                currentHigh.current= currentGuess +1
                nextnumber=generateNumber(currentLow.current,currentHigh.current,currentGuess)
                setCurrentGuess(nextnumber)
                setGuesses(currentGuesses=>[nextnumber,...currentGuesses])
            }

        }
        let listContainerStyle=styles.list
        if(deviceWidth<350){
            listContainerStyle=styles.listBig

        }
        if(deviceHeight<500 ){
            return (
                <View style={styles.screen}>
                <Text>
                    Opponents Guess
                </Text>
                <View style={styles.controls}>

                        <MainButton  onPress={lowerNumberHandler}>
                            <Ionicons name='md-remove'  size={24}/>
                            </MainButton>
                    <NumberContainer>
                        {currentGuess}
                    </NumberContainer>
                    
                        <MainButton onPress={higherNumberHandler}>
                        <Ionicons name='md-add' size={24}/>
                        </MainButton>
                </View>
                    
                    <View style={listContainerStyle}>   
                    <ScrollView contentContainerStyle={styles.listContent}>
                    {guesses.map((guess,index)=>renderListItem(guess,guesses.length-index))}
                    </ScrollView>
                    </View>

            </View>
            )
        }
        return(
            <View style={styles.screen}>
                <Text>
                    Opponents Guess
                </Text>
                    <NumberContainer>
                        {currentGuess}
                    </NumberContainer>
                    <Card style={styles.buttonContainer}>
                        <MainButton  onPress={lowerNumberHandler}>
                            <Ionicons name='md-remove'  size={24}/>
                            </MainButton>
                        <MainButton onPress={higherNumberHandler}>
                        <Ionicons name='md-add' size={24}/>
                        </MainButton>
                    </Card>
                    <View style={listContainerStyle}>   
                    <ScrollView contentContainerStyle={styles.listContent}>
                    {guesses.map((guess,index)=>renderListItem(guess,guesses.length-index))}
                    </ScrollView>
                    </View>

            </View>

        )
    
}

const styles=StyleSheet.create({
    screen:{
        flex:1,
        alignItems:'center',
        padding:10
    },
    listContent:{
        flexGrow:1,
alignItems:'center',
justifyContent:'flex-end'
    },
    buttonContainer:{
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop:Dimensions.get('window').height> 600 ? 20 : 5 ,
        width:300,
        maxWidth:'80%'
    },
    list:{
        flex:1,
        width: '60%',
    },
    listBig:{
        flex:1,
        width:'80%',
    }
    ,
    listItem:{
        borderColor:'black',
        borderWidth:1,
        padding:15,
        marginVertical:20,
        flexDirection:'row',
        width:'80%',
        justifyContent:'space-between',
        
    },
    controls:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        width:'80%'
        }
})

export default GameScreen