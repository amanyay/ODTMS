/* eslint-disable react-hooks/rules-of-hooks */
import baseUrl from "@/src/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, ImageBackground, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Feather from '@expo/vector-icons/Feather';


const login = () => {
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState('');
    const [loading, setIsLoading] = useState(false);
    const [secureText, setSecureText] = useState(true);
    function toSignupPage() {
        router.replace("/signup");
    }


    const submit = async () => {
        try {
            if (phoneNumber === "" || password === "") {
                setError("Please fill all field !!!");
            }
            else {
                setIsLoading(true);
                const request = await axios.post(`${baseUrl}/login`, { phoneNumber, password });
                setIsLoading(false);
                setError("");

                // console.log(request)

                if (request.status === 200) {
                    AsyncStorage.setItem('token', request.data.token)
                    router.replace('/(tabs)/home')
                }
                else if (request.status === 201) {
                    setError(request.data.message)
                }
                else if (request.status === 202) {
                    setError(request.data.message)
                }
            }


        }

        catch (error: any) {
            console.log(error)
            if (error) {
                setError("Network error")
                setIsLoading(false)
            } else if (error.response.data.err) {

                setError(error.response.data.err)
                setIsLoading(false)
            }

        }
    }




    return (
        <ImageBackground
            source={require('../Desgin Templete and Docmentation/background 2.jpg')}
            style={styles.box}
            resizeMode="cover"
        >

            <View style={styles.box2}>
                <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>

                    <ScrollView >
                        <View style={styles.box1}>
                            <Text style={styles.title}>Welcome back</Text>
                        </View>
                        <View style={styles.inputBox}><View style={styles.inputIcons}><Feather name="phone" size={24} color="black" /></View><TextInput placeholder='Enter your phone number' keyboardType={"number-pad"} placeholderTextColor={'black'} style={styles.input} onChangeText={setPhoneNumber} /></View>
                        <View style={styles.inputBox}><View style={styles.inputIcons}><Feather name="key" size={24} color="black" /></View><TextInput placeholder='Enter your password' secureTextEntry={secureText} placeholderTextColor={'black'} style={styles.input} onChangeText={setPassword} /><TouchableOpacity style={styles.hiddenPassBox} onPress={() => { setSecureText(!secureText) }}>{secureText ? (<Text><Feather name="eye" size={24} color="black" /></Text>) : (<Text><Feather name="eye-off" size={24} color="black" /></Text>)}</TouchableOpacity></View>
                        <TouchableOpacity style={styles.forgetAccountBox} onPress={() => { router.push('/ForgetPassword/forget') }}>
                            <Text style={styles.forgetAccountText}>Forget Password ?</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn} onPress={submit}><Text style={styles.btnText}>Login</Text></TouchableOpacity>
                        <Text style={styles.errorMessage}>{error}</Text>
                        <Text style={styles.signUpBox}>Don{"'"}t have an account ? <TouchableOpacity onPress={toSignupPage}><Text style={styles.commonText}> sign up</Text></TouchableOpacity></Text>
                        {loading ? (<ActivityIndicator size="large" color="#0000ff" />) : (<Text></Text>)}

                    </ScrollView>
                </KeyboardAvoidingView>
            </View>

        </ImageBackground >

    )

}

export default login

const styles = StyleSheet.create({

    box: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',

    },
    box1: {
        // backgroundColor: 'red',
        width: '100%',
        height: '18%',
        marginBottom: "2%",
        justifyContent: 'flex-end'
    },
    box2: {
        backgroundColor: '#cdd5de',
        width: '100%',
        margin: '0%',
        height: '70%',
        borderTopRightRadius: '8%',
        borderTopLeftRadius: '8%'

    },
    title: {
        fontSize: 35,
        fontWeight: '600',
        marginBottom: '3%',
        color: 'black',
        letterSpacing: 1,
        marginLeft: "10%",

    },
    commonText: {
        color: 'blue',
        fontSize: 18
    },
    inputBox: {
        // backgroundColor: 'red',
        textAlign: 'center',
        margin: 9,
        borderBottomWidth: 1,
        borderTopColor: 'black',
        width: '90%',
        alignSelf: 'center',
        height: 50,
        flexDirection: 'row',
        flexWrap: 'wrap',
        overflow: 'hidden'
    },
    inputIcons: {
        // backgroundColor: 'yellow',
        height: '100%',
        width: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        borderRadius: 3,
        marginTop: '0%',
        marginLeft: '3%',
        width: "70%",
        textAlign: 'left',
        height: '100%',
        color: 'black',
        fontSize: 13,
        letterSpacing: 0.5,
        // backgroundColor: 'blue'
    },
    hiddenPassBox: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    errorMessage: {
        color: 'red',
        marginTop: '1%',
        alignSelf: 'center',
        fontSize: 15,
        letterSpacing: 1,
        marginBottom: '5%'
    },
    btn: {
        backgroundColor: "#231650",
        width: '80%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        borderRadius: 8,
        marginTop: '3%',
        marginBottom: '4%',
        marginRight: '10%'
    },
    btnText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 17
    },
    forgetAccountBox: {
        // backgroundColor: 'blue',
        marginTop: '5%',
        alignItems: 'flex-end',
        marginRight: '8%',
        marginBottom: '2%'
    },
    forgetAccountText: {
        fontSize: 16,
        color: 'black'
    },
    signUpBox: {
        // backgroundColor: 'red',
        marginLeft: '6%',
        color: 'black',
        alignSelf: 'center',
        marginBottom: "5%"
    },
    asAdminBox: {
        // backgroundColor: 'red',
        marginTop: '2%',
        width: '70%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 8,
        marginBottom: '5%',
    },
    asAdmin: {
        backgroundColor: '#D3AF37',
        padding: '4%',
        height: 50,
        width: '70%',
        justifyContent: 'center',
        textAlign: 'center'
    },
    asAdminText: {

    }
})