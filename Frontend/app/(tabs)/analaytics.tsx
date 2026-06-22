/* eslint-disable react-hooks/rules-of-hooks */
import baseUrl from '@/src/api';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function statstics() {

    // const [totalRequest, setTotalRequest] = useState("")
    // const [totalDonors, setTotalDonor] = useState('');
    const [activeRecipents, setactiveRecipents] = useState('');
    const [completedTransplant, setCompletedTransplant] = useState(Number);
    const [error, setError] = useState("")

    async function statstics() {

        try {
            const token = await AsyncStorage.getItem("token");
            const request = await axios.post(`${baseUrl}/statstics`, { token });

            // setTotalRequest(request.data.message.totalRequestPending[0].total_request_pending)
            // setTotalDonor(request.data.message.total[0].total)
            setactiveRecipents(request.data.message.totalActiveWaitingList[0].total_request_complete)
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
                    <View style={style.dataBox1}>
                        <Text style={style.dataBoxText1}>Active User Wait For Organ</Text>
                        <Text style={style.dataBoxText3}>{activeRecipents}</Text>
                    </View>
                    <View style={style.dataBox1}>
                        <Text style={style.dataBoxText1}>Successfull Transplant Win Rate</Text>
                        <Text style={style.dataBoxText3}>{isNaN(completedTransplant) ? (0) : (completedTransplant)} % </Text>
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
        width: '41%',
        margin: '4%',
        marginLeft: '5%',
        marginTop: '15%',
        height: '30%',
        alignItems: 'center',
        borderRadius: 8,
        borderColor: 'black',
        borderWidth: 1
    },
    dataBox1: {
        backgroundColor: 'rgba(255, 244, 244, 0.86)',
        width: '90%',
        margin: '4%',
        marginLeft: '5%',
        marginTop: '15%',
        height: '30%',
        alignItems: 'center',
        // justifyContent: 'center',
        borderRadius: 8,
        borderColor: 'black',
        borderWidth: 1
    },
    dataBoxText1: {
        // backgroundColor: 'red',
        marginTop: '0%',
        fontSize: 14,
        borderBottomWidth: 2,
        width: '100%',
        textAlign: 'center',
    },
    dataBoxText2: {
        backgroundColor: 'red',
        marginTop: '25%',
        fontSize: 32,
    },
    dataBoxText3: {
        // backgroundColor: 'red',
        marginTop: '10%',
        fontSize: 35,
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