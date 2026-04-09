/* eslint-disable react-hooks/rules-of-hooks */
import baseUrl from "@/src/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, ImageBackground, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function newPassword() {

    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState("");
    const [loading, setIsLoading] = useState(false);
    const passwordRegX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};:'",.<>?/|\\])[A-Za-z\d!@#$%^&*()_\-+=\[\]{};:'",.<>?/|\\]{7,}$/;



    async function changePassword() {


        const forgetPasswordPhoneNumberToken = await AsyncStorage.getItem('ForgetPhoneNumberToken')



        try {

            if (password1 === "" || password2 === "") {
                setIsLoading(false);
                setError("Please Enter New Password");
            }
            else if (!passwordRegX.test(password2)) {
                setIsLoading(false);
                setError("Password must be at least 7 characters long and include uppercase, lowercase, a number, and a special character.")
            }
            else if (password1 !== password2) {
                setIsLoading(false);
                setError("Password do not match")
            }
            else if (password1 === password2) {
                setIsLoading(true);
                const response = await axios.post(`${baseUrl}/changeNewPassword`, { password1, password2, forgetPasswordPhoneNumberToken });
                if (response.status === 200) {
                    setIsLoading(false)
                    setError("Successfully Updated")
                    router.replace('/login')
                }
            }



        } catch (error: any) {

            if (error) {
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
                            <Text style={style.titleText}>Change new password</Text>
                        </View>
                        <View style={style.inputBox}>
                            <TextInput style={style.input} placeholder="Enter new password" placeholderTextColor={'white'} onChangeText={setPassword1} />
                            <TextInput style={style.input} placeholder="Confirm password" placeholderTextColor={'white'} onChangeText={setPassword2} />
                        </View>
                        <View style={style.errorBox}>
                            <Text style={style.errorText}>{error}</Text>
                        </View>
                        <TouchableOpacity style={style.btnBox} onPress={changePassword}>
                            <Text style={style.btnText}>Submit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.backToLogin} onPress={() => { router.push('/login') }}>
                            <Text>Cancel</Text>
                        </TouchableOpacity>
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
        height: '65%',
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


    },
    input: {
        height: 55,
        color: 'white',
        marginLeft: '5%',
        marginRight: '5%',
        marginTop: '6%',
        marginBottom: '3%',
        borderWidth: 1,
        borderColor: 'white'
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
        backgroundColor: "#e4e2ea",
        marginLeft: '6%',
        marginRight: '6%',
        borderRadius: 10,
        height: 50,
        justifyContent: 'center',
    },
    activityIndicatorBox: {
        // backgroundColor:'red',
        marginTop: '4%',
        height: 40,
        justifyContent: 'center'
    }
})