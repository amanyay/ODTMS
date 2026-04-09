/* eslint-disable react-hooks/rules-of-hooks */
import baseUrl from '@/src/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, ImageBackground, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function verifyFayda() {

    const [faydaNumber, setFaydaNumber] = useState("");
    const [error, setError] = useState("");
    const [loading, setIsLoading] = useState(false);
    const faydaNumberRegx = /^[0-9]{16}$/;


    async function faydaVerification() {

        setIsLoading(true)

        try {

            // console.log(faydaNumber)

            if (faydaNumber === "") {
                setIsLoading(false)
                setError("Please enter fayda number")
            }
            else if (!faydaNumberRegx.test(faydaNumber)) {
                setIsLoading(false)
                setError("Fayda number must be only 16 digit number")
            }
            else if (faydaNumberRegx.test(faydaNumber)) {

                const token = await AsyncStorage.getItem('token');
                const response = await axios.post(`${baseUrl}/faydaVerification`, { token, faydaNumber });
                if (response.status === 200) {
                    setIsLoading(false)
                    setError(response.data.message)
                    router.replace('/(tabs)/home')
                }

            }
        } catch (error: any) {
            setError(error.response.data.err)
        }

    }




    return (
        <View style={style.mainBox}>
            <KeyboardAvoidingView
                style={style.keybordAvoiding}
                behavior='padding' >
                <ScrollView>
                    <ImageBackground
                        source={require('../../Desgin Templete and Docmentation/nationaldigitalID.jpg')}
                        style={style.image} >
                    </ImageBackground>


                    <Text style={style.title}>Verify Your Account With Fayda Number</Text>
                    <View style={style.inputBox}>
                        <TextInput style={style.input} placeholder='Enter Your FAN number' textAlign='center' keyboardType='numeric' onChangeText={setFaydaNumber} />
                    </View>
                    <Text style={style.error}>{loading ? (<ActivityIndicator size={25} color={'blue'} />) : (error)}</Text>
                    <TouchableOpacity style={style.btn} onPress={faydaVerification}>
                        <Text style={style.btnText}>Verify</Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>

        </View>
    )
}
const style = StyleSheet.create({
    mainBox: {
        flex: 1,

    },
    image: {
        height: 200,
        width: '100%',
        marginTop: '30%'
    },
    keybordAvoiding: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',

    },
    title: {
        marginTop: '10%',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16
    },
    inputBox: {
        // backgroundColor: 'red',
        marginTop: '5%',
        marginLeft: '1%'
    },
    input: {
        borderWidth: 2,
        width: '100%'
    },
    btn: {
        backgroundColor: '#231650',
        marginTop: '5%',
        color: 'white',
        width: '40%',
        padding: '1%',
        height: 40,
        alignSelf: 'flex-end',
        marginRight: '0%',
        justifyContent: 'center',
        borderRadius: 7
    },
    btnText: {
        color: 'white',
        textAlign: 'center'
    },
    error: {
        marginTop: '3%',
        justifyContent: 'center',
        textAlign: 'center',
        color: 'red'
    }
})