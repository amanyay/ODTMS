/* eslint-disable react-hooks/rules-of-hooks */
import baseUrl from '@/src/api';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function statstics() {

    const [totalRequest, setTotalRequest] = useState("")
    const [totalDonors, setTotalDonor] = useState('');
    const [totalRecipents, setTotalRecipents] = useState('');
    const [completedTransplant, setCompletedTransplant] = useState('');
    const [error, setError] = useState("")

    async function statstics() {

        try {
            const token = await AsyncStorage.getItem("token");
            const request = await axios.post(`${baseUrl}/statstics`, { token });

            setTotalRequest(request.data.message.totalRequestPending[0].total_request_pending)
            setTotalDonor(request.data.message.totalDonors[0].total_donors)
            setTotalRecipents(request.data.message.totalRecipents[0].total_recipents)
            setCompletedTransplant(request.data.message.percentage)

        } catch (error: any) {

            setError(error.response.data.err)

        }


    }

    useEffect(() => { statstics() }, [])







    return (
        <View style={style.box}>
            <ImageBackground
                source={require('../../Desgin Templete and Docmentation/background 3.jpg')}
                style={{ flex: 1 }} >
                <View style={style.box1}>
                    <Text style={style.title}>Statistics</Text>
                    <TouchableOpacity style={style.headerIcons} onPress={statstics} >
                        <Text><AntDesign name="reload" size={30} color="black" /></Text>
                    </TouchableOpacity>
                </View>
                <View style={style.box2}>
                    <View style={style.dataBox}>
                        <Text style={style.dataBoxText1}>Total Requests</Text>
                        <Text style={style.dataBoxText2}>{totalRequest}</Text>
                    </View>
                    <View style={style.dataBox}>
                        <Text style={style.dataBoxText1}>Total Donors</Text>
                        <Text style={style.dataBoxText2}>{totalDonors}</Text>
                    </View>
                    <View style={style.dataBox}>
                        <Text style={style.dataBoxText1}>Total Recipents</Text>
                        <Text style={style.dataBoxText2}>{totalRecipents}</Text>
                    </View>
                    <View style={style.dataBox}>
                        <Text style={style.dataBoxText1}>Completed Transplant</Text>
                        <Text style={style.dataBoxText2}>{completedTransplant} % </Text>
                    </View>
                </View>
                <Text style={style.error}>{error}</Text>
            </ImageBackground>
        </View>
    )
}
const style = StyleSheet.create({
    box: {
        flex: 1,
    },
    box1: {
        width: '100%',
        marginLeft: '0%',
        height: '15%',
        // backgroundColor: 'red',
        alignContent: 'flex-end',
        alignItems: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 23,
        marginLeft: '10%',
        fontFamily: 'arial',
        fontWeight: 'bold',
        marginTop: '7%',
    },
    headerIcons: {
        marginRight: '7%',
        // backgroundColor: 'yellow'
    },
    box2: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        // backgroundColor: 'blue'
    },
    dataBox: {
        backgroundColor: 'rgba(255, 244, 244, 0.86)',
        width: '40%',
        margin: '4%',
        marginLeft: '5%',
        marginTop: '15%',
        height: '30%',
        alignItems: 'center',
        borderRadius: 8,
    },
    dataBoxText1: {
        marginTop: '5%',
        fontSize: 14
    },
    dataBoxText2: {
        marginTop: '30%',
        fontSize: 20
    },
    error: {
        width: '100%',
        // backgroundColor: 'red',
        height: 70,
        textAlign: 'center',
        color: 'red',
        fontSize: 15
    }
})