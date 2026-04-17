/* eslint-disable react-hooks/rules-of-hooks */
import baseUrl from '@/src/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
// import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function map() {

    const [displayName, setDisplayName] = useState('')
    const [displayEmail, setDisplayEmail] = useState('');
    const [displayPhoneNumber, setDisplayPhoneNumber] = useState('');
    const [displayAge, setDisplayage] = useState('');
    const [displayBloodType, setDisplayBloodType] = useState('');
    const [displayLocation, setDisplayLocation] = useState('');
    const [error, setError] = useState('');
    // const [profileImage, setProfileImage] = useState<string | null>(null);


    async function displayUsersData() {

        try {
            const token = await AsyncStorage.getItem('token');

            const request = await axios.post(`${baseUrl}/adminProfile`, { token });

            setDisplayName(request.data.message.first_name);
            setDisplayPhoneNumber(request.data.message.phone_number);
            setDisplayEmail(request.data.message.email);
            setDisplayage(request.data.message.age);
            setDisplayBloodType(request.data.message.blood_type);
            setDisplayLocation(request.data.message.location)
        } catch (error: any) {

            setError(error.response.data.err)

        }



    }


    // async function changeProfile() {

    //     const profileImage = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, mediaTypes: 'images' })

    //     if (profileImage.canceled === true) {
    //         setError("")
    //     } else {
    //         console.log(profileImage.assets[0].uri)
    //         setProfileImage(profileImage.assets[0].uri)
    //     }

    // }




    async function logout() {

        await AsyncStorage.removeItem('token');
        router.replace('/login')
    }
    async function deleteAccount() {

        try {
            const token = await AsyncStorage.getItem('token');
            const request = await axios.post(`${baseUrl}/deleteAccount`, { token })

            if (request.status === 200) {
                await AsyncStorage.removeItem('token');
                router.replace('/login')
            }
        } catch (error: any) {

            setError(error.response.data.err)

        }




    }

    function confirmDelete() {
        Alert.alert("Delete Account ", "Are you sure you want to delete your account?",
            [
                {
                    text: "Cancel",
                    style: 'cancel'
                },
                {
                    text: 'Delete',
                    onPress: () => { deleteAccount() },
                    style: 'destructive'
                }
            ]
        );
    }

    useEffect(() => {
        displayUsersData();
    }, [])








    return (
        <View style={style.box}>
            <ImageBackground
                source={require('../../Desgin Templete and Docmentation/background 1.jpg')}
                style={{ flex: 1 }} >
                <Text style={style.error}>{error}</Text>
                <View style={style.profileImageBox}>
                    <View style={style.profileImage}>
                        {/* {profileImage && <Image source={{ uri: profileImage }} style={{ width: 200, height: 200 }} />} */}
                    </View>
                    <TouchableOpacity style={style.changeProfile}>
                        <Text style={style.changeProfileText}>Edit Profile Picture</Text>
                    </TouchableOpacity>
                </View>
                {/* <TouchableOpacity style={style.toAdminPanel} onPress={() => { router.push("/adminsPageDrawerNavigation/editOrgans") }}>
                    <Text style={style.toAdminPanelText}>Admin Panel</Text>
                </TouchableOpacity> */}
                <ScrollView style={{ flex: 1, paddingBottom: 80, marginBottom: '9%' }}>
                    <View style={style.box3}>
                        <Text style={style.box3Text}>Name</Text>
                        <TouchableOpacity style={style.input}>
                            <Text style={style.eachDataTexts}>{displayName}</Text>
                        </TouchableOpacity>

                        <Text style={style.box3Text}>Phone Number</Text>
                        <TouchableOpacity style={style.input}>
                            <Text style={style.eachDataTexts}>{displayPhoneNumber}</Text>
                        </TouchableOpacity>

                        <Text style={style.box3Text}>Email Address</Text>
                        <TouchableOpacity style={style.input}>
                            <Text style={style.eachDataTexts}>{displayEmail}</Text>
                        </TouchableOpacity>

                        <Text style={style.box3Text}>Age</Text>
                        <TouchableOpacity style={style.input}>
                            <Text style={style.eachDataTexts}>{displayAge}</Text>
                        </TouchableOpacity>

                        <Text style={style.box3Text}>Blood Type</Text>
                        <TouchableOpacity style={style.input}>
                            <Text style={style.eachDataTexts}>{displayBloodType}</Text>
                        </TouchableOpacity>

                        <Text style={style.box3Text}>Location</Text>
                        <TouchableOpacity style={style.input}>
                            <Text style={style.eachDataTexts}>{displayLocation}</Text>
                        </TouchableOpacity>
                        <View style={style.profileBtns}>
                            <TouchableOpacity style={style.saveBtnBox} onPress={() => { router.push('/profilePageContents/updateProfile') }}>
                                <Text style={style.saveBtn}>Update Profile</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={style.saveBtnBox} onPress={logout}>
                                <Text style={style.saveBtn}>Log Out</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={style.saveBtnBox} onPress={confirmDelete}>
                                <Text style={style.saveBtn}>Delete Account</Text>
                            </TouchableOpacity>
                        </View>


                    </View>
                </ScrollView>

            </ImageBackground>

        </View>
    )
}

const style = StyleSheet.create({
    box: {
        flex: 1,
        // backgroundColor: 'red'
    },
    box1: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        // backgroundColor:'red',
        height: '15%',
        alignItems: 'flex-end',
        paddingLeft: '5%'
    },
    title: {
        marginLeft: '30%',
        fontSize: 25,
        color: 'white',
        fontWeight: 'bold'
    },
    error: {
        marginTop: 10,
        textAlign: 'center'
    },
    profileImageBox: {
        // backgroundColor:'blue',
        width: '100%',
        height: '30%',
        marginTop: '1%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '2%'
    },
    profileImage: {
        width: 150,
        height: 150,
        backgroundColor: 'yellow',
        borderRadius: 90,
        overflow: 'hidden'
    },
    changeProfile: {
        // backgroundColor:'blue',
        marginTop: '3%',
    },
    changeProfileText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        // backgroundColor: 'blue',
    },
    toAdminPanel: {
        // backgroundColor: 'red',
        alignItems: 'center',
        padding: '3%'
    },
    toAdminPanelText: {
        backgroundColor: 'red',
        color: 'black',
        padding: 7,
        fontFamily: 'arial',
        fontWeight: 'bold',
        fontSize: 15
    },
    box3: {
        // backgroundColor:'blue'
    },
    box3Text: {
        marginLeft: '6%',
        fontSize: 20,
        marginBottom: '2%',
        marginTop: '2%'
    },
    input: {
        height: 50,
        width: '90%',
        backgroundColor: "rgba(42, 146, 201, 0.3)",
        opacity: 1,
        marginTop: '2%',
        marginLeft: '5%',
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderRadius: 2,
        fontWeight: 'bold',
        fontSize: 17
    },
    eachDataTexts: {
        fontSize: 20,
        color: '#51515f',
        marginLeft: '2%'
        // font
    },
    profileBtns: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: '3%'
    },
    saveBtnBox: {
        // backgroundColor:'gray',
        marginTop: '5%',
        alignItems: 'center',
    },
    saveBtn: {
        backgroundColor: 'blue',
        color: 'white',
        padding: '3%'
    }

})