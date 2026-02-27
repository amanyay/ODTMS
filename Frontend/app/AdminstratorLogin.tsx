/* eslint-disable react-hooks/rules-of-hooks */
import baseUrl from "@/src/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";



const administrator = () => {
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState('');
    const [loading, setIsLoading] = useState(false);




    const submit = async () => {
        try {
            if (phoneNumber === "" || password === "") {
                setError("Please fill all field !!!");
            }
            else {
                setIsLoading(true);
                const request = await axios.post(`${baseUrl}/adminLogin`, { phoneNumber, password });
                setIsLoading(false);
                setError("");

                if (request.status === 200) {
                    AsyncStorage.setItem('token', request.data.token)
                    router.replace('/adminsPageDrawerNavigation/editOrgans')
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
            source={require('../Desgin Templete and Docmentation/background 2.jpg')}
            style={styles.box}
            resizeMode="cover"
        >
            <View style={styles.box1}>
                <Text style={styles.title}>Administrator login</Text>
            </View>
            <View style={styles.box2}>
                <TextInput inputMode="numeric" placeholder='   Enter your phone number' placeholderTextColor={'white'} style={styles.input} onChangeText={setPhoneNumber} />
                <TextInput placeholder='   Enter your password' placeholderTextColor={'white'} style={styles.input} onChangeText={setPassword} />
                <Text style={styles.errorMessage}>{error}</Text>
                <TouchableOpacity style={styles.btn} onPress={submit}><Text style={styles.btnText}>Login as admin</Text></TouchableOpacity>
                {loading ? (<ActivityIndicator size="large" color="#0000ff" />) : (<Text></Text>)}
            </View>
            <View>
                <TouchableOpacity style={styles.asAdmin} onPress={() => { router.replace("/login") }}>
                    <Text>Login as user</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>

    )

}

export default administrator

const styles = StyleSheet.create({

    box: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',

    },
    box1: {
        width: '100%',
        height: '30%',
        marginBottom: "2%",
        justifyContent: 'flex-end'
    },
    box2: {
        width: '100%',
        height: '55%'
    },
    title: {
        fontSize: 34,
        fontWeight: '500',
        marginBottom: '3%',
        color: 'white',
        letterSpacing: 0,
        marginLeft: "10%",

    },
    commonText: {
        color: 'red',
        fontSize: 18
    },
    input: {
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 3,
        marginTop: '10%',
        marginLeft: '10%',
        width: "80%",
        textAlign: 'left',
        height: '11%',
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
        height: '11%',
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
        color: 'white',
        alignSelf: 'center',
        marginBottom: "5%"
    },
    asAdmin: {
        backgroundColor: '#D3AF37',
        padding: '4%'
    },
    asAdminText: {

    }
})