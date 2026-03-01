/* eslint-disable react-hooks/rules-of-hooks */
import baseUrl from '@/src/api';
import Feather from '@expo/vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useState } from 'react';
import { ActivityIndicator, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function chatBot() {

    const [userQuestion, setUserQuestion] = useState("");
    const [aiResponse, setAiResponse] = useState("");
    const [responseLoading, setResponseLoading] = useState(false);

    async function chatBot() {

        setResponseLoading(true)

        try {

            const token = await AsyncStorage.getItem('token');
            const request = await axios.post(`${baseUrl}/chatBot`, { token, userQuestion });
            if (request.status === 200) {
                setResponseLoading(false);
                setAiResponse(request.data.message)
            }


        } catch (error: any) {
            setAiResponse(error.response.data.err)
        }

    }


    return (
        <ImageBackground
            source={require('../../Desgin Templete and Docmentation/background 4.jpg')}
            style={{ flex: 1, }}>

            <ImageBackground style={style.logo}
                source={require('../../Desgin Templete and Docmentation/chatboticon.jpg')}>

            </ImageBackground>

            <View style={style.box}>
                <Text style={style.boxText}>Welcome to our chatBot !</Text>
            </View>
            <View style={style.inputBox}>
                <TextInput placeholder='  Ask any health related our bot' style={style.input} placeholderTextColor={'white'} onChangeText={setUserQuestion} />
                <TouchableOpacity style={style.sendBtn} onPress={chatBot}>
                    <Text><Feather name="send" size={24} color="black" /></Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={style.responseBox}>
                <Text style={style.response}>{userQuestion} : {responseLoading ? (<ActivityIndicator size="small" color="#0000ff" />) : (<Text></Text>)}</Text>
                <Text style={style.response}>{aiResponse}</Text>
            </ScrollView>
        </ImageBackground >
    )
}
const style = StyleSheet.create({
    logo: {
        width: 100,
        height: 100,
        // backgroundColor: 'yellow',
        alignSelf: 'center',
        marginTop: '5%'
    },
    box: {
        // backgroundColor: 'blue',
        height: 120,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    boxText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white'
    },
    inputBox: {
        height: 60,
        width: '94%',
        // backgroundColor:'red',
        marginTop: 30,
        borderWidth: 1,
        borderRadius: 70,
        borderColor: 'white',
        marginLeft: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        overflow: 'hidden'
    },
    input: {
        width: '74%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingLeft: '5%',
        color: 'white'
    },
    sendBtn: {
        backgroundColor: 'gray',
        marginRight: '5%',
        justifyContent: 'center',
        width: 50,
        height: 47,
        alignItems: 'center',
        borderRadius: 70,
        marginTop: 4
    },
    responseBox: {
        // backgroundColor: 'red',
        flex: 1,
        width: '88%',
        marginTop: '6%',
        marginLeft: '5%',
        paddingBottom: 100,
        marginBottom: 50
    },
    response: {
        width: '100%',
        color:'white'
    }
})