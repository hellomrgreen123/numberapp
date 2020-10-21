import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './component/Header'
import StartGameScreen from './screens/StartGameScreen'
import GameScreen from './screens/GameScreen';
import GameOver from './screens/GameOver'
import * as Font from 'expo-font'
import {AppLoading} from 'expo'
import {NativeRouter,Redirect,Route} from "react-router-native"
const fethcFonts=()=>{
 return Font.loadAsync({
   'open-sans':require('./assets/fonts/OpenSans-Regular.ttf'),
   'open-sans-bold':require('./assets/fonts/OpenSans-Bold.ttf')
 })
}
export default function App() {
  const [userNumber, setUserNumber] =useState()
  const [guesses, setGuesses]= useState(0)
  const [dataLoaded,setDataLoaded]= useState(false)

  if(!dataLoaded){
    return  <AppLoading
     startAsync={fethcFonts}
    onFinish={()=>setDataLoaded(true)}
    onError={(err)=>console.log(err)}
    />
  }
  const restartGame=()=>{
    setGuesses(0)
    setUserNumber(null)
  }
  const startGameHandler=(selectedNumber)=>{
    setUserNumber(selectedNumber)
    setGuesses(0)
    console.log(selectedNumber)
    console.log(userNumber)

  }
  const gameOverHandler = numofRounds=>{
    setGuesses(numofRounds)
  }

  let content=<StartGameScreen  startGame={startGameHandler}/>
  if(userNumber&& guesses<=0){
    content=<GameScreen onGameover={gameOverHandler}selectedNumber={userNumber}/>
  }else if(guesses>0){
     content = <GameOver guesses={guesses} selectedNumber={userNumber} restartGame={restartGame}/>
  }


  return (

    <View style={styles.container}>
      <Header title="Guess a number"/>
     {content}
         </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
})