/* eslint-disable react-hooks/rules-of-hooks */
import baseUrl from "@/src/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, ImageBackground, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";



const login = () => {
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState('');
    const [loading, setIsLoading] = useState(false);
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

                if (request.status === 200) {
                    AsyncStorage.setItem('token', request.data.token)
                    router.replace('/(tabs)/home')
                }
                else if (request.status === 201) {
                    setError(request.data.message)
                }

            }


        }

        catch (error: any) {
            setError(error.response.data.err)
        }
    }




    return (
        <ImageBackground
            source={require('../Desgin Templete and Docmentation/background 3.jpg')}
            style={styles.box}
            resizeMode="cover"
        >
            <KeyboardAvoidingView
                style={{ flex: 1, width: '100%', alignItems: 'center', }}
                behavior="padding"
            >

                <ScrollView style={{ flex: 1, width: '90%' }}>

                    <View style={styles.box1}>
                        <Text style={styles.title}>Login</Text>
                    </View>
                    <View style={styles.box2}>
                        <TextInput inputMode="numeric" placeholder='   Enter your phone number' placeholderTextColor={'white'} style={styles.input} onChangeText={setPhoneNumber} />
                        <TextInput placeholder='   Enter your password' placeholderTextColor={'white'} style={styles.input} onChangeText={setPassword} />
                        <Text style={styles.errorMessage}>{error}</Text>
                        <TouchableOpacity style={styles.btn} onPress={submit}><Text style={styles.btnText}>Login</Text></TouchableOpacity>
                        <Text style={styles.signUpBox}>Don{"'"}t have an account ? <TouchableOpacity onPress={toSignupPage}><Text style={styles.commonText}> sign up</Text></TouchableOpacity></Text>
                        {loading ? (<ActivityIndicator size="large" color="#0000ff" />) : (<Text></Text>)}
                    </View>
                    <View style={styles.asAdminBox}>
                        <TouchableOpacity style={styles.asAdmin} onPress={() => { router.replace("/AdminstratorLogin") }}>
                            <Text>Login as Administrator</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </ImageBackground>

    )

}

export default login

const styles = StyleSheet.create({

    box: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',

    },
    box1: {
        // backgroundColor: 'red',
        width: '100%',
        height: '45%',
        marginBottom: "2%",
        justifyContent: 'flex-end'
    },
    box2: {
        // backgroundColor: 'red',
        width: '100%',
        marginBottom: '18%'
    },
    title: {
        fontSize: 35,
        fontWeight: '500',
        marginBottom: '3%',
        color: 'black',
        letterSpacing: 1,
        marginLeft: "10%",

    },
    commonText: {
        color: 'blue',
        fontSize: 18
    },
    input: {
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 3,
        marginTop: '10%',
        marginLeft: '5%',
        width: "90%",
        textAlign: 'left',
        height: 55,
        color: 'white',
        fontSize: 13,
        letterSpacing: 0.5
    },
    errorMessage: {
        color: 'red',
        marginTop: '5%',
        alignSelf: 'center',
        fontSize: 15,
        letterSpacing: 1
    },
    btn: {
        backgroundColor: "#231650",
        width: '80%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        borderRadius: 8,
        marginTop: '5%',
        marginBottom: '5%',
        marginRight: '10%'
    },
    btnText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 17
    },
    signUpBox: {
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