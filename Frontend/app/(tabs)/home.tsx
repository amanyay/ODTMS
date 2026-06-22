/* eslint-disable react-hooks/rules-of-hooks */
import baseUrl from '@/src/api';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, ImageBackground, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function home() {
    const [userNameDisplay, setUserNameDisplay] = useState('');
    const [bloodType, setBloodType] = useState('')
    const [role, setRole] = useState('');
    const [faydaNo, setFaydaNo] = useState();
    const [organs, setOrgans] = useState<any>([]);
    const [hidden, setHidden] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState("")
    const [faydaVerifaction, setFaydaVerifaction] = useState("")

    async function getData() {

        setError('');
        setRefreshing(false)
        try {
            const token = await AsyncStorage.getItem("token");

            if (!token) {
                router.push('/login')
            } else {
                const request = await axios.post(`${baseUrl}/home`, { token }, { headers: { Authorization: token } });


                setFaydaNo(request.data.message.fayda_no);
                setFaydaVerifaction(request.data.faydaVerfication)
                setUserNameDisplay(request.data.message.first_name);
                setBloodType(request.data.message.blood_type);
                setRole(request.data.message.role);
                if (request.data.joinMessage.length > 0) {
                    setOrgans(request.data.joinMessage[0].organ_name);
                } else if (request.data.joinMessage.length < 1) {
                    setOrgans('')
                }


            }
        } catch (error: any) {
            if (error.status === 401) {
                AsyncStorage.removeItem('token', () => {
                    router.push('/login')
                })
            }
            setError(error.response.data.err)

        }



    }

    useEffect(() => {
        getData();
    }, []);


    // page to page functions 

    function toNotification() {
        router.push('/homePageContents/notification')
    }

    async function toDonorForm() {

        try {
            const token = await AsyncStorage.getItem('token');
            const request = await axios.post(`${baseUrl}/home`, { token }, { headers: { Authorization: token } });
            const userRole = request.data.message.role;
            const length = request.data.joinMessage;
            const userBloodType = request.data.message.blood_type;

            // console.log(recAge)

            if (userRole === 'recipents') {

                Alert.alert("You are recipents not allowed")

            }
            else if (faydaNo === null || faydaNo === 0) {
                Alert.alert("Verify Account First", "Use fayda number to verify your account",
                    [
                        {
                            style: 'cancel',
                            text: 'Cancel'
                        },
                        {
                            style: 'default',
                            text: 'Verify',
                            onPress: () => { router.push('/homePageContents/verifyFayda') }

                        }

                    ])
            }
            else {
                if (userBloodType === null || length.length < 1) {
                    router.push('/homePageContents/donarForm')
                }
                else if (userBloodType !== null) {
                    const donAge = request.data.message.age.toString();
                    const userOrgan = request.data.joinMessage[0].organ_id.toString();
                    AsyncStorage.setItem('donAge', donAge)
                    AsyncStorage.setItem('donBloodType', userBloodType)
                    AsyncStorage.setItem('userOrgan', userOrgan);
                    router.push('/homePageContents/organForDonor')
                }

            }
        } catch (error: any) {

            setError(error.response.data.err)

        }



    }

    async function toRecForm() {

        try {
            const token = await AsyncStorage.getItem('token');
            const request = await axios.post(`${baseUrl}/home`, { token }, { headers: { Authorization: token } });
            const userBloodType = request.data.message.blood_type;
            const userRole = request.data.message.role;
            const length = request.data.joinMessage;
            // console.log(token)
            if (userRole === 'donor') {

                Alert.alert("You are donor not allowed")

            }
            else if (faydaNo === null || faydaNo === 0) {
                Alert.alert("Verify Account First", "Use fayda number to verify your account",
                    [
                        {
                            style: 'cancel',
                            text: 'Cancel'
                        },
                        {
                            style: 'default',
                            text: 'Verify',
                            onPress: () => { router.push('/homePageContents/verifyFayda') }

                        }

                    ])
            }
            else {

                if (userBloodType === null || length.length < 1) {
                    router.push('/homePageContents/recipentsForm')
                }
                else if (userBloodType !== null) {
                    const recAge = request.data.message.age.toString();
                    const userOrgan = request.data.joinMessage[0].organ_id.toString();
                    AsyncStorage.setItem('recAge', recAge)
                    AsyncStorage.setItem('recBloodType', userBloodType)
                    AsyncStorage.setItem('userOrgan', userOrgan);
                    router.push('/homePageContents/organs')
                }
            }

        } catch (error: any) {

            setError(error.response.data.err)

        }





    }









    return (
        <View style={styless.box}>
            <ImageBackground
                source={require('../../Desgin Templete and Docmentation/background 3.jpg')}
                style={{ flex: 1 }} >

                <View style={styless.box1}>
                    <TouchableOpacity style={styless.headerProfile}>
                        <Text style={styless.headerText}>Hello , {userNameDisplay} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styless.headerIcons} onPress={toNotification}>
                        <Text><Ionicons name="notifications-outline" size={30} color="black" /></Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styless.headerIcons} onPress={() => { router.push('/homePageContents/qr') }}>
                        <Text><MaterialIcons name="qr-code-scanner" size={36} color="black" /></Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styless.headerIcons} onPress={getData}>
                        <Text><AntDesign name="reload" size={30} color="black" /></Text>
                    </TouchableOpacity>
                </View>

                <View style={styless.box2}>
                    <ImageBackground style={styless.boxImage} imageStyle={styless.boxImage}
                        source={require('../../Desgin Templete and Docmentation/home backgorund 1.jpg')}
                    >
                        <Text style={styless.orderNumber}>{hidden ? ('*****') : (bloodType)}  <TouchableOpacity onPress={() => { setHidden(!hidden) }}>
                            <Feather name="eye" size={20} color="white" />
                        </TouchableOpacity>  </Text>
                        <View style={styless.text}>
                            <Text style={styless.statusText}>Name  :  {hidden ? ('*****') : (userNameDisplay)} </Text>
                            <Text style={styless.statusText}>Role    :  {hidden ? ('*****') : (role)} </Text>
                            <Text style={styless.statusText}>Organ :  {hidden ? ('*****') : (organs)}</Text>
                            <Text style={styless.statusTextVerify}>{faydaVerifaction}</Text>
                        </View>


                    </ImageBackground>
                </View>
                <View style={styless.error}>
                    <Text style={styless.errorText}>{error}</Text>
                </View>
                <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 50 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getData} />}>
                    <View style={styless.box3}>
                        <Text style={styless.box3Title}>Top services</Text>
                        <View style={styless.items}>
                            <TouchableOpacity style={styless.servicesBtn1} onPress={toDonorForm}>
                                <Text><AntDesign name="form" size={24} color="black" /></Text>
                                <Text style={styless.logoTitiles}>Donate</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styless.servicesBtn1} onPress={toRecForm}>
                                <Text><MaterialIcons name="healing" size={24} color="black" /></Text>
                                <Text style={styless.logoTitiles}>Organs</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styless.servicesBtn1} onPress={() => { router.push('/homePageContents/help') }}>
                                <Text><Feather name="help-circle" size={24} color="black" /></Text>
                                <Text style={styless.logoTitiles}>Help</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styless.servicesBtn1} onPress={() => { router.push('/homePageContents/calculator') }}>
                                <Text><AntDesign name="calculator" size={24} color="black" /></Text>
                                <Text style={styless.logoTitiles}>BMI Calculator</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styless.servicesBtn1} onPress={() => { router.push('/homePageContents/chatBot') }}>
                                <Text><Ionicons name="chatbubble-ellipses-outline" size={24} color="black" /></Text>
                                <Text style={styless.logoTitiles}>Chat bot</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styless.servicesBtn1} onPress={() => { router.push('/homePageContents/foods') }}>
                                <Text><MaterialCommunityIcons name="food-fork-drink" size={24} color="black" /></Text>
                                <Text style={styless.logoTitiles}>Foods</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styless.box4}>
                        <Text style={styless.box3Title}>Blood Compatibility Guide</Text>
                        <TouchableOpacity style={styless.box4Btn}>
                            <Text style={styless.text1}>
                                🩸 O− Universal Donor
                                Can donate to everyone because it has no A, B, or Rh antigens.{'\n'}
                            </Text>
                            <Text style={styless.text1}>
                                🩸 AB+ Universal Recipient
                                Can receive blood from all blood types because it has all antigens. {'\n'}
                            </Text>
                            <Text style={styless.text1}>
                                🩸 Rh Factor (+ / −)
                                Rh positive can receive from both Rh+ and Rh−. Rh negative can receive only from Rh negative.

                            </Text>

                        </TouchableOpacity>
                        <TouchableOpacity style={styless.box4Btn2}>
                            <Text style={styless.text2}>O+ →Donates to O+,A+,B+,AB+| Receives from O+,O−</Text>
                            <Text style={styless.text2}>A− →Donates to A−,A+,AB−,AB+ | Receives from A−,O−</Text>
                            <Text style={styless.text2}>A+ →Donates to A+,AB+ | Receives from A+, A−,O+,O−</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styless.box4Btn2}>
                            <Text style={styless.text2}>B− →Donates to B−,B+,AB−,AB+ | Receives from B−,O−</Text>
                            <Text style={styless.text2}>B+ →Donates to B+,AB+ | Receives from B+,B−,O+,O−</Text>
                            <Text style={styless.text2}>AB− →Donates to AB−,AB+ | Receives from AB−,B−O−</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
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
        height: '15%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        // backgroundColor: 'red'
    },
    headerProfile: {
        marginRight: '13%',
        marginLeft: '4%',
        // backgroundColor: 'blue',
        width: '43%'
    },
    headerIcons: {
        marginRight: '6%',
        // backgroundColor: 'yellow'
    },
    headerText: {
        color: 'black',
        fontSize: 17,
        fontWeight: '300',
        fontFamily: 'arial',
    },
    box2: {
        width: '91%',
        height: '27%',
        alignSelf: 'center',
        backgroundColor: 'red',
        marginTop: '5%',
        marginLeft: '0%',
        borderRadius: 10,
        boxShadow: '0px 10px 10px 1px rgba(4, 4, 10, 0.45)',
    },
    boxImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10
    },
    orderNumber: {
        color: '#F3742B',
        letterSpacing: 4,
        margin: '4%',
        marginBottom: '3%',
        marginLeft: '7%',
        fontSize: 25,
        fontFamily: 'monospace',
        fontWeight: 'heavy'
    },
    statusText: {
        color: 'white',
        margin: '0%',
        marginLeft: '-3%',
        marginBottom: '5%',
        fontSize: 15,
        fontFamily: 'monospace',
    },
    statusTextVerify: {
        color: 'white',
        margin: '0%',
        marginLeft: '-4%',
        marginBottom: '5%',
        fontSize: 15,
        fontFamily: 'monospace',
        backgroundColor: 'red',
        width: '29%',
        textAlign: 'center',
        borderRadius: 50
    },
    text: {
        color: 'white',
        margin: '0%',
        marginLeft: '8%',
        marginBottom: '2%',
        fontSize: 15,
        fontFamily: 'monospace',
        flexDirection: 'column'
    },
    error: {
        // backgroundColor: 'red',
        marginTop: 10,
        marginBottom: '0%',
        alignItems: 'center'
    },
    errorText: {
        color: 'red',
        fontSize: 14
    },
    box3: {
        // backgroundColor: 'yellow',
        marginLeft: '0%',
        marginTop: '0%',
        width: '98%'
    },
    box3Title: {
        fontSize: 22,
        fontFamily: 'arial',
        fontWeight: 'bold',
        textAlign: 'center',
        margin: '3%',
        marginLeft: '5%',
        letterSpacing: 0.3,
    },
    items: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        textAlign: 'center',
        alignItems: 'center',
        alignContent: 'center',
        // backgroundColor: 'red'
    },
    servicesBtn: {
        height: 150,
        width: '21%',
        backgroundColor: "rgba(42, 146, 201, 0.1)",
        opacity: 1,
        marginLeft: 7,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 7
    },
    servicesBtn1: {
        height: 100,
        width: '35%',
        backgroundColor: "#F5f5f5",
        opacity: 0.8,
        margin: 14,
        marginLeft: '10%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        boxShadow: '0px 0px 10px 0.2px '
    },
    logoTitiles: {
        marginTop: 8,
        fontSize: 15,
        fontWeight: '600',
        letterSpacing: 0.2,
        color: 'black'
    },
    box4: {
        // backgroundColor: 'red',
        marginLeft: '2%',
        marginTop: '7%',
        width: '97%'
    },
    box4Btn: {
        height: 210,
        // width: '19%',
        backgroundColor: "rgba(42, 146, 201, 0.7)",
        opacity: 1,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
        overflow: 'hidden'
    },
    box4Btn2: {
        height: 150,
        // width: '19%',
        backgroundColor: "rgba(42, 146, 201, 0.7)",
        opacity: 1,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7
    },
    text1: {
        fontSize: 14,
        padding: 1,
        height: '27%',
        fontFamily: 'arial',
        fontWeight: '600',
        // backgroundColor: 'red',
        marginTop: 1
    },
    text2: {
        fontSize: 12,
        marginTop: 8,
        fontFamily: 'serif',
        width: '95%',

    }
})