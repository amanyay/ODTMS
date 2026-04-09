/* eslint-disable react-hooks/rules-of-hooks */
import baseUrl from '@/src/api';
import axios from 'axios';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, ImageBackground, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function verification() {

    const [code1, setCode1] = useState('');
    const [code2, setCode2] = useState('');
    const [code3, setCode3] = useState('');
    const [code4, setCode4] = useState('');
    const [code5, setCode5] = useState('');
    const [code6, setCode6] = useState('');
    const [error, setError] = useState('');
    const [loading, setIsLoading] = useState(false);

    async function sendOtp() {

        if (code1 === "" || code2 === "" || code3 === "" || code4 === "" || code5 === "" || code6 === "") {
            setError("Enter your otp first")
        }
        else {
            setIsLoading(true);
            try {
                const response = await axios.post(`${baseUrl}/verification`, { code1, code2, code3, code4, code5, code6 })
                if (response.status === 200) {
                    setError(response.data.message)
                    setIsLoading(false)
                    router.push('/ForgetPassword/newPassword')
                }
                else if(response.status === 201){
                    setIsLoading(false)
                    setError("OTP Not Matched")
                    
                }
            } catch (error: any) {

                setError(error.response.data.err)

            }
        }

    }




    async function reGenerateOtp() {

        const response = await axios.post(`${baseUrl}/otpGeneration`, {})
        console.log(response)

    }


    return (
        <ImageBackground
            source={require('../../Desgin Templete and Docmentation/background 3.jpg')}
            style={style.box}
        >
            
            <KeyboardAvoidingView
                style={style.keybordAvoiding}
                behavior="padding">
                <View style={style.box1}>
                    <ScrollView>
                        <View style={style.titleBox}>
                            <Text style={style.titleText}>Verify Your phone number</Text>
                            <Text style={style.titleText1}>Enter the 6-digit verification number</Text>
                        </View>
                        <View style={style.inputBox}>
                            <TextInput style={style.input} keyboardType='numeric' placeholderTextColor={'white'} onChangeText={setCode1} maxLength={1} />
                            <TextInput style={style.input} keyboardType='numeric' placeholderTextColor={'white'} onChangeText={setCode2} maxLength={1} />
                            <TextInput style={style.input} keyboardType='numeric' placeholderTextColor={'white'} onChangeText={setCode3} maxLength={1} />
                            <TextInput style={style.input} keyboardType='numeric' placeholderTextColor={'white'} onChangeText={setCode4} maxLength={1} />
                            <TextInput style={style.input} keyboardType='numeric' placeholderTextColor={'white'} onChangeText={setCode5} maxLength={1} />
                            <TextInput style={style.input} keyboardType='numeric' placeholderTextColor={'white'} onChangeText={setCode6} maxLength={1} />
                        </View>
                        <View style={style.errorBox}>
                            <Text style={style.errorText}>{error}</Text>
                        </View>
                        
                        <TouchableOpacity style={style.btnBox} onPress={sendOtp}>
                            <Text style={style.btnText}>Verify</Text>
                        </TouchableOpacity>
                        <View style={style.resendCode}>
                            <Text> Didn{`'`}t you receive OTP code ?  </Text>
                            <TouchableOpacity onPress={reGenerateOtp}>
                                <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Resend Code</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={style.activityIndicatorBox}>
                            {loading && (<ActivityIndicator size={25} color={'blue'} />)}
                        </View>
                    </ScrollView>
                </View>

            </KeyboardAvoidingView>

        </ImageBackground >
    )
}



const style = StyleSheet.create({
    box: {
        flex: 1,
        justifyContent: 'center'
    },
    keybordAvoiding: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    box1: {
        // backgroundColor: 'red',
        width: '100%',
        height: '49%',
        justifyContent: 'center'
    },
    titleBox: {
        // backgroundColor: 'red',
        alignItems: 'center',
    },
    titleText: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    titleText1: {
        fontSize: 15,
        color: 'black'
    },
    inputBox: {
        // backgroundColor:'blue',
        marginLeft: '5%',
        flexDirection: 'row',
        paddingBottom: '3%'
    },
    input: {
        height: 55,
        color: 'white',
        width: 45,
        borderWidth: 1,
        marginLeft: '3%',
        marginTop: '10%',
        borderColor: 'white',
        borderRadius: 10,
        textAlign: 'center',
        fontSize: 25
    },
    btnBox: {
        backgroundColor: "#231650",
        alignItems: 'center',
        marginLeft: '6%',
        marginRight: '6%',
        borderRadius: 10,
        height: 50,
        justifyContent: 'center',
    },
    btnText: {
        fontSize: 18,
        color: 'white'
    },
    errorBox: {
        // backgroundColor: 'blue',
        margin: '2%',
        alignItems: 'center'
    },
    errorText: {
        color: 'red'
    },
    resendCode: {
        // backgroundColor:'red',
        marginTop: '4%',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    activityIndicatorBox: {
        // backgroundColor:'red',
        marginTop: '4%',
        height: 40,
        justifyContent: 'center'
    }
})