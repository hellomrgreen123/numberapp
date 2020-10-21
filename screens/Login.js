import React,{useState} from 'react'
import {View,StyleSheet, TextInput} from 'react-native'
import TitleText from '../component/TitleText'
import BodyText from '../component/BodyText'
import MainButton from '../component/MainButton.ios'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const Login = (props) =>{

    const [errors,setErrors] = useState({})

    const [username,setUsername] = useState('')
    const [password,setPassword]= useState('')
    const [confirmPassword,setConfirmPassword]=useState('')

    const [loginUser] = useMutation(LOGIN_USER, {
        onError(error){
            setErrors(error.graphQLErrors[0].extensions.exception.errors)
        }
    })

    function login(){
        loginUser()
    }
    const [addUser] =useMutation(REGISTER_USER,{
        
        onError(err){
            setErrors(err.graphQLErrors[0].extensions.exception.errors)
        }
    })
    function registerUser(){
        addUser()
    }
    return (<View style={styles.screen}>

        <TitleText>
            Please login below
        </TitleText>
        <BodyText>Username</BodyText>
        <TextInput placeholder="Username"onChange={e=>setUsername(e.target.value)}  style={styles.inputContainer} />
        
        <BodyText>Password</BodyText>
        <TextInput placeholder="Password" onChange={e=>setPassword(e.target.value)} style={styles.inputContainer} />
         <MainButton onPress={login}>Login </MainButton>
        <TitleText>
        Please Register 
        </TitleText>
        <BodyText>Username</BodyText>
        <TextInput placeholder="Username" onChange={e=>setUsername(e.target.value)} style={styles.inputContainer} />
        
        <BodyText>Password</BodyText>
        <TextInput placeholder="Password"  onChange={e=>setPassword(e.target.value)} style={styles.inputContainer} />
        <BodyText> Confirm Password</BodyText>
        <TextInput placeholder="Confirm password" onChange={e=>setConfirmPassword(e.target.value)} style={styles.inputContainer} />
        <MainButton onPress={registerUser}> Register</MainButton>
    </View>
    )


}


const styles=StyleSheet.create({

    screen:{
        justifyContent:"center",
        flexDirection:"column"
    },
    inputContainer:{

        width:'80%',
        borderColor:'black',
        borderWidth:2,
        padding:1

    }




})

const LOGIN_USER=gql`
    mutation login($username:String!,$password:String!){
        login(username:$username, password:$password){
            id
            username
            createdAt
            token
        }
    }`
const REGISTER_USER= gql`
    mutation register($username:String!,$password:String!,$confirmPassword:String!){
        register(registerInput:{
            username:$username
            password:$password
            confirmPassword:$confirmPassword
        }){
            id
            username
            createdAt
            token
        }
    }`
export default Login