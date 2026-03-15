/* eslint-disable react-hooks/rules-of-hooks */
// import baseUrl from '@/src/api';
import baseUrl from '@/src/api';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import QRCode from "react-native-qrcode-svg";

export default function successful() {
    const [error, setError] = useState("")
    const [firstName, setFirstName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState("")

    async function qr() {

        try {

            const token = await AsyncStorage.getItem('token');
            const request = await axios.post(`${baseUrl}/qr`, { token })

            if (request.status === 200) {
                setPhoneNumber(request.data.message.phone_number)
                setFirstName(request.data.message.first_name)
            }

        } catch (error: any) {


            setError(error.response.data.err)


        }

    }

    useEffect(() => {
        qr();
    }, [])

    return (
        <ImageBackground
            source={require('../../Desgin Templete and Docmentation/background 3.jpg')}
            style={{ flex: 1 }} >

            <TouchableOpacity style={style.box2BtnRefresh} onPress={qr}>
                <Text style={style.box2BtnText}><AntDesign name="reload" size={30} color="black" /></Text>
            </TouchableOpacity>
            <View style={style.error}>
                <Text style={style.errorText}>{error}</Text>
            </View>
            <View style={style.box2}>

                <View style={style.imageBox}>
                    {phoneNumber !== "" && (
                        <QRCode
                            value={phoneNumber}
                            size={220}
                        />
                    )}

                </View>
            </View >
        </ImageBackground>
    )
}

const style = StyleSheet.create({
    box1: {
        flex: 1,
        width: '100%',
        // backgroundColor: 'blue'
    },
    box2: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        // backgroundColor: 'blue'
    },
    imageBox: {
        // backgroundColor: 'red',
        width: '80%',
        height: '70%',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '0%'
    },
    image: {
        width: '90%',
        height: '90%'
    },
    error: {
        // backgroundColor: 'red',
        marginTop: 10,
        marginBottom: '0%',
        alignItems: 'center'
    },
    errorText: {
        color: 'red',
        fontSize: 14,
    },
    text: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: 'green',
        padding: '5%',
    },
    box2BtnText: {
        // backgroundColor: 'yellow',
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: '15%'
    },
    box2BtnRefresh: {
        marginRight: '5%',
        // backgroundColor: "rgba(42, 146, 201, 0.7)",
        width: '100%',
        marginLeft: '1%'
    }
})