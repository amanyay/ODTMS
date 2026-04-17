/* eslint-disable react-hooks/rules-of-hooks */
import baseUrl from '@/src/api';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function organs() {

    const [matchedOrgans, setMatchedOrgan] = useState<any>([]);
    const [notFound, setNotFound] = useState('');
    const [eachReqError, setEachReqError] = useState('')
    const [diplayRequestBox, setDiplayRequestBox] = useState(false)

    async function getOrganForRecs() {

        try {

            const request = await axios.get(`${baseUrl}/kidneyMatchedOrgan`);

            if (request.status === 201) {
                setDiplayRequestBox(false)
                setNotFound('No match found');
            }
            else if (request.status === 200) {
                setDiplayRequestBox(true)
                setMatchedOrgan(request.data.message);
            }
        } catch (error: any) {
            setDiplayRequestBox(false)
            setNotFound(error.response.data.err)

        }
    }
    useEffect(() => {
        getOrganForRecs()
    }, [])

    async function notifyUsers(item: any) {

        setEachReqError('')

        try {
            const token = await AsyncStorage.getItem('token');
            const request = await axios.post(`${baseUrl}/kidneyAddToWaitingList`, { token, donorPhoneNumber: item.don_phone_number, organId: item.organ_id, recipentsPhoneNumber: item.rec_phone_number });

            if (request.status === 201) {

            }
            else if (request.status === 200) {
                setEachReqError("Notification already sent try to send another !!!")
            } else {
                setDiplayRequestBox(false)
                setNotFound("Server Error please try again")
            }
        } catch (error: any) {
            setDiplayRequestBox(false)
            setNotFound(error.response.data.err)

        }


    }





    return (
        <ImageBackground style={style.box}
            source={require('../../Desgin Templete and Docmentation/background 1.jpg')}
        >

            <View style={style.box2}>


                <TouchableOpacity style={style.box2Btn} onPress={getOrganForRecs}>
                    <Text style={style.box2BtnText}><AntDesign name="reload" size={30} color="black" /></Text>
                </TouchableOpacity>
            </View>
            <View style={{ height: 50, marginBottom: 10 }}>
                <Text style={style.eachReqError}>{eachReqError}</Text>
            </View>


            {diplayRequestBox ? (<FlatList
                data={matchedOrgans}
                keyExtractor={(item, index) => item.user_id + "-" + index}
                renderItem={({ item }) => (
                    <View style={style.organBox}>

                        <View style={style.organBox1}>

                            <View style={style.boxHeaderIcon}>
                                <FontAwesome5 name="briefcase-medical" size={24} color="black" />
                            </View>
                            <View style={style.boxHeaderText}>
                                <Text style={style.boxHeaderText1}>Donor to Recipents Matched Result </Text>
                                <Text style={style.boxHeaderText2}>{item.urgency_level}</Text>
                            </View>

                        </View>
                        <ScrollView style={{ flex: 1 }} nestedScrollEnabled={true}>
                            <View style={style.organBoxText}>
                                <Text style={style.organBoxText1}>Donor Info </Text><Text style={style.datas}>Recipents Info </Text>
                                <Text style={style.organBoxText1}>{item.donor_name}</Text><Text style={style.datas}>{item.recipient_name}</Text>
                                <Text style={style.organBoxText1}>{item.donor_blood_type}</Text><Text style={style.datas}>{item.recipient_blood_type}</Text>
                                <Text style={style.organBoxText1}>{item.donor_age}</Text><Text style={style.datas}>{item.recipient_age}</Text>
                                <Text style={style.organBoxText1}>{item.organ_name} </Text><Text style={style.datas}>{item.organ_name}</Text>
                            </View>
                        </ScrollView>
                        <View style={style.updateAndRemoveBtn}>
                            <TouchableOpacity style={style.requestBtnBox} onPress={() => notifyUsers(item)}>
                                <Text style={style.requestBtnText}>Notify User <FontAwesome name="send" size={20} color="black" /></Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                )}

            />) : (
                <View style={{ height: 50, marginBottom: 10 }}>
                    <Text style={{ textAlign: 'center', fontSize: 21, color: 'red' }}>{notFound}</Text>
                </View>)}

        </ImageBackground >
    )
}

const style = StyleSheet.create({
    box: {
        flex: 1,
        // backgroundColor: 'red'
    },
    box2: {
        flexDirection: 'row',
        width: '100%',
        // backgroundColor: 'blue',
        justifyContent: 'space-between',
        marginBottom: '2%',
        marginTop: '7%',
        marginRight: '5%'
    },
    box2Btn: {
        marginRight: '7%',
        backgroundColor: "rgba(42, 146, 201, 0.7)",
        width: '20%',
        marginLeft: '2%',
        justifyContent: 'center',
        height: 45
    },
    box2BtnText: {
        // backgroundColor:'red',
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    },
    box2Input: {
        fontSize: 19,
        width: '65%',
        backgroundColor: "rgba(42, 146, 201, 0.2)",
        marginRight: '5%',
        marginLeft: '3%',
        borderRadius: 5
    },
    updateRecord: {
        width: '65%',
        marginRight: '5%',
        marginBottom: '3%',
        backgroundColor: "rgba(42, 146, 201, 0.7)",
        marginLeft: '5%',
        justifyContent: 'center',
        padding: '3%'
    },
    eachReqError: {
        width: '100%',
        // backgroundColor: 'blue',
        height: 20,
        justifyContent: 'flex-start',
        alignContent: 'center',
        textAlign: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        color: 'red'
    },
    box3: {
        // backgroundColor:'red',
        flex: 1
    },

    organBox: {
        backgroundColor: '#bebaae',
        height: 350,
        margin: '3%',
        marginTop: '2%',
        borderRadius: 8,
        alignContent: 'center',
        overflow: 'hidden',
        marginBottom: '10%'
    },
    boxHeaderIcon: {
        // backgroundColor: 'red',
        width: '18%',
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center'
    },
    boxHeaderText: {
        // backgroundColor: 'blue',
        width: '100%'
    },
    boxHeaderText1: {
        // backgroundColor:'red',
        fontSize: 16,
        padding: '1%',
        fontWeight: 'bold',
        marginTop: '4%',
        marginLeft: '3%',
    },
    boxHeaderText2: {
        // backgroundColor: 'blue',
        marginLeft: '5%',
        marginTop: '1%',
        backgroundColor: 'red',
        width: '25%',
        textAlign: 'center',
        borderRadius: 10
    },
    organBox1: {
        backgroundColor: '#b9ccec',
        height: 75,
        flexDirection: 'row'
    },
    organBoxText: {
        backgroundColor: '#bebaae',
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderWidth: 0,
        // height:300
    },
    organBoxText1: {
        // backgroundColor: 'red',
        color: 'red',
        fontWeight: 'bold',
        fontSize: 15,
        marginLeft: '7%',
        marginTop: '5%',
        width: '45%',

    },
    // organBoxText3: {
    //   color: 'red',
    //   fontWeight: 'bold',
    //   fontSize: 22,
    //   marginLeft: '5%',
    //   marginTop: '5%',
    // },
    // organBoxText4: {
    //   color: 'red',
    //   fontWeight: 'bold',
    //   fontSize: 22,
    //   marginLeft: '5%',
    //   marginTop: '5%',
    // },
    datas: {
        // backgroundColor: 'yellow',
        color: '#302e2c',
        fontSize: 15,
        fontWeight: 'bold',
        width: '43%',
        alignSelf: 'flex-end'

    },
    updateAndRemoveBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#bebaae',
        borderWidth: 0,
        marginTop: '0%'
    },
    // updateBtnBox: {
    //   backgroundColor: "rgba(42, 146, 201, 0.7)",
    //   margin: '7%',
    //   width: '30%',
    //   alignItems: 'center',
    //   padding: '2%'
    // },
    updateBtnText: {
        fontFamily: 'arial',
        fontWeight: 'bold',
        fontSize: 17
    },
    requestBtnBox: {
        // backgroundColor: "red",
        marginRight: '7%',
        marginBottom: '2%',
        marginLeft: '7%',
        marginTop: '4%',
        width: '50%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    requestBtnText: {
        fontFamily: 'arial',
        fontWeight: 'bold',
        fontSize: 17,
        letterSpacing: 1,
    }
})