/* eslint-disable react-hooks/rules-of-hooks */
import baseUrl from '@/src/api';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { router } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    ImageBackground,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet, Text, TextInput,
    TouchableOpacity, View
} from "react-native";
import Feather from '@expo/vector-icons/Feather';



const signup = () => {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState('');
    const [selectedValue, setSelectedValue] = useState('');
    const [loading, setIsLoading] = useState(false);
    const [secureText, setSecureText] = useState(true);
    const options = ['donor', 'recipents'];



    function toSignInPage() {
        router.replace("/login");
    }

    const submit = async () => {

        const phoneNumberRegex = /^[0-9]{10}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^[A-Za-z0-9?]{4,}$/;
        const IntAge = parseInt(age)
        try {

            if (firstName === "" || lastName === "" || phoneNumber === "" || email === "" || password === "" || selectedValue === "") {

                setError("Please fill all field !!!");

            }
            else if (!phoneNumberRegex.test(phoneNumber)) {
                setError("Invalid phone number");
            }
            else if (!emailRegex.test(email)) {
                setError("Invalid email");
            }
            else if (!passwordRegex.test(password)) {
                setError("Invalid password");
            }
            else if (IntAge < 18) {
                setError("Age must be > 18");
            }
            else if (phoneNumberRegex.test(phoneNumber) || emailRegex.test(email) || passwordRegex.test(password)) {

                setIsLoading(true);

                const response = await axios.post(`${baseUrl}/signUp`, { firstName, lastName, phoneNumber, email, password, selectedValue });

                if (response.status === 200) {
                    setIsLoading(false);
                    setError(response.data.message);
                    router.push('/login')
                }
                else if (response.status === 201) {
                    setError(response.data.message)
                }
                else if (response.status === 500) {
                    setError(response.data.message)
                }




            }
        } catch (error: any) {

            if (error) {
                setError("Network error")
                setIsLoading(false)
            } else if (error.response.data.err) {

                setError(error.response.data.err)
                setIsLoading(false)
            }

        }




    }



    return (
        <ImageBackground
            source={require('../Desgin Templete and Docmentation/background 2.jpg')}
            style={styles.box}
            resizeMode="cover"
        >


            <View style={styles.box2}>

                <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
                    <ScrollView >
                        <View style={styles.box1}>
                            <Text style={styles.title}>Create New Account</Text>
                        </View>
                        <View style={styles.inputBox}><View style={styles.inputIcons}><Feather name="user" size={24} color="black" /></View><TextInput placeholder='Enter your first name' placeholderTextColor={'black'} style={styles.input} onChangeText={setFirstName} /></View>
                        <View style={styles.inputBox}><View style={styles.inputIcons}><Feather name="user" size={24} color="black" /></View><TextInput placeholder='Enter your last name' placeholderTextColor={'black'} style={styles.input} onChangeText={setLastName} /></View>
                        <View style={styles.inputBox}><View style={styles.inputIcons}><Feather name="phone" size={24} color="black" /></View><TextInput placeholder='Enter your phone number' placeholderTextColor={'black'} style={styles.input} onChangeText={setPhoneNumber} /></View>
                        <View style={styles.inputBox}><View style={styles.inputIcons}><Feather name="calendar" size={24} color="black" /></View><TextInput placeholder='Enter your age' placeholderTextColor={'black'} style={styles.input} onChangeText={setAge} /></View>
                        <View style={styles.inputBox}><View style={styles.inputIcons}><Feather name="mail" size={24} color="black" /></View><TextInput placeholder='Enter your email address' placeholderTextColor={'black'} style={styles.input} onChangeText={setEmail} /></View>
                        <View style={styles.inputBox}><View style={styles.inputIcons}><Feather name="key" size={24} color="black" /></View><TextInput placeholder='Enter your password' secureTextEntry={secureText} placeholderTextColor={'black'} style={styles.input} onChangeText={setPassword} /><TouchableOpacity style={styles.hiddenPassBox} onPress={() => { setSecureText(!secureText) }}>{secureText ? (<Text><Feather name="eye" size={24} color="black" /></Text>) : (<Text><Feather name="eye-off" size={24} color="black" /></Text>)}</TouchableOpacity></View>
                        <Picker
                            selectedValue={selectedValue}
                            onValueChange={(itemValue) => setSelectedValue(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Select an option..." value="" />
                            {options.map((option, index) => (
                                <Picker.Item key={index} label={option} value={option} />
                            ))}
                        </Picker>
                        {loading && (<ActivityIndicator size="large" color="#0000ff" />)}
                        <Text style={styles.errorMessage}>{error}</Text>
                        <TouchableOpacity style={styles.btn} onPress={submit}><Text style={styles.btnText}>Sign Up</Text></TouchableOpacity>
                        <Text style={styles.signUpBox}>Already have an account ? <TouchableOpacity onPress={toSignInPage}><Text style={styles.commonText}>sign in</Text></TouchableOpacity></Text>

                    </ScrollView>
                </KeyboardAvoidingView>


            </View>


        </ImageBackground>

    )

}

export default signup

const styles = StyleSheet.create({

    box: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',

    },
    box1: {
        width: '100%',
        height: 70,
        alignItems: 'center',
        marginBottom: "2%",
        marginTop: '0%',
        justifyContent: 'center',
        // backgroundColor: 'red'
    },
    box2: {
        backgroundColor: '#cdd5de',
        width: '100%',
        margin: '0%',
        height: '85%',
        borderTopRightRadius: '8%',
        borderTopLeftRadius: '8%',
        // alignItems: 'center'

    },
    title: {
        fontSize: 32,
        fontWeight: '600',
        marginBottom: '3%',
        color: 'black',
        letterSpacing: 1,
        marginLeft: "0%",
        fontFamily: 'sans-serif-light'

    },
    commonText: {
        color: 'blue',
        fontSize: 18
    },
    inputBox: {
        // backgroundColor: 'red',
        textAlign: 'center',
        margin: 9,
        borderBottomWidth: 1,
        borderTopColor: 'black',
        width: '90%',
        alignSelf: 'center',
        height: 50,
        flexDirection: 'row',
        flexWrap: 'wrap',
        overflow: 'hidden'
    },
    inputIcons: {
        // backgroundColor: 'yellow',
        height: '100%',
        width: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        borderRadius: 3,
        marginTop: '0%',
        marginLeft: '2%',
        width: "70%",
        textAlign: 'left',
        height: '100%',
        color: 'black',
        fontSize: 13,
        letterSpacing: 0.5,
        // backgroundColor: 'blue'
    },
    hiddenPassBox: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    picker: {
        // backgroundColor: 'red',
        height: 60,
        width: '70%',
        marginLeft: '18%',
        marginRight: '5%'
    },
    errorMessage: {
        color: 'red',
        marginTop: '2%',
        alignSelf: 'center',
        fontSize: 15,
        letterSpacing: 1,
        // backgroundColor: 'red'
    },
    btn: {
        backgroundColor: "#231650",
        width: '90%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        borderRadius: 8,
        marginTop: '5%',
        marginBottom: '5%',
        marginRight: '5%'
    },
    btnText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 17
    },
    signUpBox: {
        marginLeft: '11%',
        color: 'black',
        alignSelf: 'center',
        marginBottom: '10%'
    }
})