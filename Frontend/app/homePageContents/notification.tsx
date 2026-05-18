/* eslint-disable react-hooks/rules-of-hooks */
import baseUrl from '@/src/api';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function notification() {

    const [approvedData, setApprovedData] = useState<any>([])
    const [notFound, setNotFound] = useState('');
    const [arrow, setArrow] = useState('')
    const [notificationContent, setNotificationContent] = useState('')


    async function getNotificationdata() {

        // setNotFound("")

        try {
            const token = await AsyncStorage.getItem('token');
            const request = await axios.post(`${baseUrl}/userNotification`, { token })

            if (request.status === 200) {
                if (request.data.message[0].status === 'Pending') {
                    setApprovedData(request.data.message)
                    setArrow(request.data.arrow)
                    setNotificationContent(`We are excited to inform you that a suitable organ match has been found for you and you're added to waitinglist. The system found compatible organ for you with your blood type and organ type. `)
                }
                else if (request.data.message[0].status === 'Approved') {
                    setApprovedData(request.data.message)
                    setArrow(request.data.arrow)
                    setNotificationContent(`We are excited to inform you that you're ready for transplant please visit medical center within two weeks.  `)
                }
                else if (request.data.message[0].status === 'Completed') {
                    setApprovedData(request.data.message)
                    setArrow(request.data.arrow)
                    setNotificationContent(`The transplant has been finalized successfully. The process is complete. Please proceed with post‑care monitoring. `)
                }

            }
            else if (request.status === 201) {
                setNotFound('Empty Notification');
            } else {
                setNotFound(request.data.message)
            }

        } catch (error: any) {
            setNotFound(error.response.data.err)

        }

    }

    useEffect(() => {
        getNotificationdata()
    }, [])






    return (
        <View style={styless.box}>
            <ImageBackground
                source={require('../../Desgin Templete and Docmentation/background 3.jpg')}
                style={{ flex: 1 }} >

                <View style={styless.box1}>
                    <TouchableOpacity style={styless.box2BtnRefresh} onPress={getNotificationdata}>
                        <Text style={styless.box2BtnText}><AntDesign name="reload" size={35} color="black" /></Text>
                    </TouchableOpacity>
                </View>

                <View style={{ height: 35 }}>
                    <Text style={{ textAlign: 'center', fontSize: 21, color: 'blue', fontWeight: 'bold', marginTop: "2%" }}>{notFound}</Text>
                </View>

                <FlatList
                    data={approvedData}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styless.eachNotificationBox}>
                            <Text style={{ fontWeight: 'bold', fontFamily: 'fantasy' }}>   Date : {new Date(item.date).toLocaleDateString()}</Text>
                            <Text style={styless.texts}>Dear, <Text style={styless.userName}>{item.rec_name} </Text>
                                <Text>
                                    {notificationContent}{item.status === 'Pending' && 'Please wait until admin approved. '}
                                    <Text style={styless.texts1}>{item.status} </Text>
                                </Text>
                            </Text>
                            <Text style={styless.texts1}>{item.rec_name} {arrow}  {item.don_name}  </Text>
                            <Text style={styless.texts}>Call 900 for more information</Text>
                            <TouchableOpacity style={styless.freeCallCenterBox}>
                                <Text>900</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                />



            </ImageBackground>
        </View>

    )
}

const styless = StyleSheet.create({
    box: {
        flex: 1
    },
    box1: {
        width: '100%',
        paddingBottom: '1%',
        marginTop: '0%',
        // backgroundColor:'darkgray',
        height: '7%',
        alignItems: 'flex-end',
        borderBottomWidth: 1.2
    },
    notification: {
        marginLeft: '32%',
        fontSize: 22,
        fontWeight: 'bold'
    },
    box2BtnText: {
        // backgroundColor:'red',
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    },
    box2BtnRefresh: {
        marginRight: '8%',
        // backgroundColor: "rgba(42, 146, 201, 0.7)",
        width: '10%',
        marginTop: '1.5%',
        alignSelf: 'flex-end',
        justifyContent: 'center',
    },
    eachNotificationBox: {
        height: 285,
        width: '95%',
        backgroundColor: '#8f9396',
        opacity: 0.6,
        marginTop: '1%',
        marginLeft: '2%',
        borderRadius: 10,
        overflow: 'hidden'
    },
    texts: {
        fontSize: 16,
        padding: 10
    },
    texts1: {
        fontWeight: 'bold',
        fontSize: 16,
        margin: '1%',
        color: 'red',
        marginLeft: '2%'
    },
    userName: {
        color: 'black',
        fontWeight: '900'
    },
    freeCallCenterBox: {
        backgroundColor: '#f7c600',
        width: '35%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        height: 40,
        marginLeft: '4%'
    }
})