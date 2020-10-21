import React,{useState, useEffect} from 'react'
import {View,StyleSheet,Keyboard,Text,Alert, Button,TouchableWithoutFeedback, Dimensions, ScrollView,KeyboardAvoidingView} from 'react-native'
import Header from '../component/Header'
import colours from '../constants/colours'
import Card from '../component/Card'
import Input from '../component/Input'
import NumberContainer from '../component/NumberContainer'
import BodyText from '../component/BodyText'
import MainButton from '../component/MainButton.ios'


const StartGameScreen =(props)=>{

    const [enteredValue,setEnteredValue]=useState('')
    const [userConfirmation, setUserConfirmation]=useState(false)
    const [selectedNumber, setSelectedNumber] =useState()
    const [buttonWidth,setButtonWidth]= useState(Dimensions.get('window').width/4)
    
    useEffect(()=>
    {
            const updateLayout=()=>{
                setButtonWidth(Dimensions.get('window').width/4)
            }
            Dimensions.addEventListener('change', updateLayout)
            return ()=>{
                Dimensions.removeEventListener('change',updateLayout)
            }
    })
    const numberInputHandler=(inputText)=>{
        
        setEnteredValue(inputText.replace(/[^0-9]/g,''))

    }
    const resetInputHandler=()=>{
        setEnteredValue('')
        setUserConfirmation(false)
    }
    const confirmInputHandler=()=>{
        const chosenNumber =parseInt(enteredValue);
        if(isNaN(chosenNumber) || chosenNumber<=0|| chosenNumber>99){
            Alert.alert(
            'Invalid number',
            'number has to be a value between 1 and 99',
            [{text:'Okay', style:'destructive',onPress:resetInputHandler}] )
            return
        }else{
        setUserConfirmation(true)
        setSelectedNumber(enteredValue)
        setEnteredValue('')}
        Keyboard.dismiss()
    }
    let confirmedOutput
    if (userConfirmation){
    confirmedOutput=
    <Card style={styles.outputContainer}>    
    <BodyText>Chosen Number is  </BodyText>
    <NumberContainer>
    {selectedNumber}
    </NumberContainer>
    <MainButton style={styles.buttons} onPress={()=>props.startGame(selectedNumber)}>
        Start Game
    </MainButton>
    
    </Card>
    }


    return (<ScrollView>
<KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
           <TouchableWithoutFeedback onPress={()=>{
            Keyboard.dismiss()
        }}>
        <View style={styles.screen}>
           <Card style={styles.inputContainer}>
           <Text style={styles.title}>Start  a New Game</Text>
               <Text> Select a Number
               </Text>
               <Input
                style={styles.input} 
                onChangeText={numberInputHandler}
                value={enteredValue}
                blurOnSubmit 
                autoCapitalize='none' autoCorrect={false} 
                 keyboardType="number-pad"
                 maxLength={2}/>
               <View style={styles.buttonContainer}>
                   <View style={{width:buttonWidth}}>
                       <Button  title="Reset" onPress={resetInputHandler} color={colours.primary}/>
                       </View>
                       <View style={{width:buttonWidth}}>
                   <Button style={styles.buttons} title="Confirm" onPress={confirmInputHandler}/>
                       </View>
               </View>
           </Card>
                  {confirmedOutput}
        </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
 
</ScrollView>
    )
}

const styles =StyleSheet.create({
    screen:{
        flex:1,
        padding:10,
        alignItems:'center'
    },
    title:{
        fontSize:20,
    marginVertical:10,
    fontFamily:'open-sans-bold'
    },
    inputContainer:{
        minWidth:300,
        maxWidth:'95%',
    width:'80%',
        alignItems:"center",
        shadowColor:'black',
        shadowOffset:{width:0,height:2},
        shadowRadius:6,
        shadowOpacity:0.26,
        elevation:5,
        backgroundColor:'white',
        padding:2

    },
    buttonContainer:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-between',
        paddingHorizontal:15
      },
    input:{
        width:40,
        textAlign:'center'
    },
    outputContainer:{
        width:250,
            maxWidth:'80%',
            alignItems:"center",
            shadowColor:'black',
            shadowOffset:{width:0,height:2},
            shadowRadius:6,
            shadowOpacity:0.26,
            elevation:5,
            backgroundColor:'white',
            padding:2,
            margin:20,
            borderRadius:10},
    buttons:{
        width:Dimensions.get('window').width/4
    

    }
})


export default StartGameScreen
