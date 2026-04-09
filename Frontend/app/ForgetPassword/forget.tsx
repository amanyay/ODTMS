/* eslint-disable react-hooks/rules-of-hooks */
import baseUrl from "@/src/api";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, ImageBackground, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function forget() {

    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState("");
    const [loading, setIsLoading] = useState(false);
    const phoneRegx = /^[0-9]{10}$/

    async function forgetPassword() {

        if (phoneNumber === "") {
            setError("Please Enter Phone Number ")
        } else if (!phoneRegx.test(phoneNumber)) {
            setError("Please Insert only 10 digit numbers")
        } else if (phoneRegx.test(phoneNumber)) {

            setIsLoading(true);

            try {

                const response = await axios.post(`${baseUrl}/forgetPassword`, { phoneNumber })
    
                if (response.status === 200) {
                    setIsLoading(false)
                    AsyncStorage.setItem('ForgetPhoneNumberToken', response.data.message);
                    router.push('/ForgetPassword/verification')
                }
                else if (response.status === 201) {
                    setIsLoading(false);
                    setError("Account Not Found");
                }



            } catch (error: any) {
                setError(error.response.data.err)
            }
        }

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
                            <Text style={style.titleText}>Forget Your Password</Text>
                        </View>
                        <View style={style.inputBox}>
                            <TextInput style={style.input} placeholder="Enter your phone number" placeholderTextColor={'white'} onChangeText={setPhoneNumber} />
                        </View>
                        <View style={style.errorBox}>
                            <Text style={style.errorText}>{error}</Text>
                        </View>
                        <TouchableOpacity style={style.btnBox} onPress={forgetPassword}>
                            <Text style={style.btnText}>Submit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.backToLogin} onPress={() => { router.push('/login') }}>
                            <Text><FontAwesome name="long-arrow-left" size={20} color="black" /><Text style={{ fontSize: 18 }}> Back to login</Text> </Text>
                        </TouchableOpacity>
                        <View style={style.activityIndicatorBox}>
                            {loading && (<ActivityIndicator size={25} color={'blue'} />)}
                        </View>
                    </ScrollView>
                </View>

            </KeyboardAvoidingView>

        </ImageBackground >

    );
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
        height: '45%',
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
    inputBox: {
        // backgroundColor:'blue'
        marginLeft: '5%',
        marginRight: '5%',
        borderWidth: 1,
        marginTop: '10%',
        borderColor: 'white'
    },
    input: {
        height: 55,
        color: 'white',
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
        margin: '3%',
        alignItems: 'center'
    },
    errorText: {
        color: 'red'
    },
    backToLogin: {
        alignItems: 'center',
        marginTop: '4%',
    },
    activityIndicatorBox: {
        // backgroundColor:'red',
        marginTop: '4%',
        height: 40,
        justifyContent: 'center'
    }
})