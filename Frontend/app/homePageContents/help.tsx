import Entypo from '@expo/vector-icons/Entypo';
import React, { useState } from 'react';
import { ImageBackground, LayoutAnimation, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ExpandableBox() {
    const [expanded, setExpanded] = useState(true);
    const [help, setHelp] = useState(true);

    const toggleExpand = () => {
        // Animate the transition for smooth expand/collapse
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(!expanded);
    };
    const helpExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setHelp(!help);
    }
    const verificationExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setHelp(!help);
    }
    return (
        <ImageBackground
            source={require('../../Desgin Templete and Docmentation/background 3.jpg')}
            style={{ flex: 1 }}>




            {/* <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={verificationExpand}>
                    <Text style={styles.buttonText}>
                        Verification help <Entypo name="chevron-down" size={17} color="black" />
                    </Text>
                </TouchableOpacity>

                <View style={[styles.box, help ? styles.expanded : styles.collapsed]}>
                    {help && (
                        <ScrollView style={{ paddingBottom: 30, height: 260 }}>
                            <View>
                                <Text>Verification rule </Text>
                                <View style={styles.boxs}>
                                    <Text style={styles.numbers}>1.</Text><Text style={styles.texts}>
                                        Donor / Recipents must  
                                    </Text>
                                </View>
                                <View style={styles.boxs}>
                                    <Text style={styles.numbers}>2.</Text><Text style={styles.texts}>
                                        Provide all asked data
                                    </Text>
                                </View>
                                <View style={styles.boxs}>
                                    <Text style={styles.numbers}>3.</Text><Text style={styles.texts}>
                                        Fill donation form to donate organ
                                    </Text>
                                </View>
                                <View style={styles.boxs}>
                                    <Text style={styles.numbers}>4.</Text><Text style={styles.texts}>
                                        You can check your status and recored in history
                                    </Text>
                                </View>
                            </View>

                            <View>
                                <Text>For recipents </Text>
                                <View style={styles.boxs}>
                                    <Text style={styles.numbers}>1.</Text><Text style={styles.texts}>
                                        Register as recipents.
                                    </Text>
                                </View>
                                <View style={styles.boxs}>
                                    <Text style={styles.numbers}>2.</Text><Text style={styles.texts}>
                                        Provide all asked data
                                    </Text>
                                </View>
                                <View style={styles.boxs}>
                                    <Text style={styles.numbers}>3.</Text><Text style={styles.texts}>
                                        Fill recipents form to recive organ
                                    </Text>
                                </View>
                                <View style={styles.boxs}>
                                    <Text style={styles.numbers}>4.</Text><Text style={styles.texts}>
                                        You can send request for your matched organ in organs tab
                                    </Text>
                                </View>
                                <View style={styles.boxs}>
                                    <Text style={styles.numbers}>5.</Text><Text style={styles.texts}>
                                        You can check your status , request history and recored in history
                                    </Text>
                                </View>
                            </View>

                        </ScrollView>


                    )}
                </View>
            </View>
 */}




            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={toggleExpand}>
                    <Text style={styles.buttonText}>
                        Frequently Asked Questions <Entypo name="chevron-down" size={17} color="black" />
                    </Text>
                </TouchableOpacity>

                <View style={[styles.box, expanded ? styles.expanded : styles.collapsed]}>
                    {expanded && (
                        <ScrollView style={{ paddingBottom: 30, height: 260 }}>
                            <View>
                                <Text style={styles.titles}>Who can donate organs?</Text>
                                <View style={styles.boxs}>
                                    <Text style={styles.numbers}>1.</Text><Text style={styles.texts}>
                                        Any healthy person who meets the medical requirements can register as an organ donor.
                                        Donors must provide correct personal and medical details.
                                        Final approval for donation depends on medical evaluation by authorized healthcare professionals.</Text>
                                </View>
                            </View>

                            <View>
                                <Text style={styles.titles}>Is my data safe?</Text>
                                <View style={styles.boxs}>
                                    <Text style={styles.numbers}>1.</Text><Text style={styles.texts}>
                                        Yes. Your personal and medical information is securely stored and protected.
                                        ODTMS uses secure authentication and follows data privacy practices to
                                        ensure that your data is not shared with unauthorized users.</Text>
                                </View>
                            </View>
                            <View>
                                <Text style={styles.titles}>How long does matching take?</Text>
                                <View style={styles.boxs}>
                                    <Text style={styles.numbers}>1.</Text><Text style={styles.texts}>
                                        Matching time depends on donor availability and medical compatibility such as blood group and age.
                                        The system continuously checks for suitable matches and notifies users in
                                        notification tab once a compatible donor or recipient is found.</Text>
                                </View>
                            </View>
                            <View>
                                <Text style={styles.titles}>Can I update my profile information?</Text>
                                <View style={styles.boxs}>
                                    <Text style={styles.numbers}>1.</Text><Text style={styles.texts}>
                                        Yes. You can update your personal and medical
                                        information at any time from your profile section.</Text>
                                </View>
                            </View>
                        </ScrollView>


                    )}
                </View>
            </View>





            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={helpExpand}>
                    <Text style={styles.buttonText}>
                        Helps <Entypo name="chevron-down" size={17} color="black" />
                    </Text>
                </TouchableOpacity>

                <View style={[styles.box, help ? styles.expanded : styles.collapsed]}>
                    {help && (
                        <ScrollView style={{ paddingBottom: 30, height: 260 }}>
                            <View>
                                <Text>For Donors </Text>
                                <View style={styles.boxs}>
                                    <Text style={styles.numbers}>1.</Text><Text style={styles.texts}>
                                        Register as donor.
                                    </Text>
                                </View>
                                <View style={styles.boxs}>
                                    <Text style={styles.numbers}>2.</Text><Text style={styles.texts}>
                                        Provide all asked data
                                    </Text>
                                </View>
                                <View style={styles.boxs}>
                                    <Text style={styles.numbers}>3.</Text><Text style={styles.texts}>
                                        Fill donation form to donate organ
                                    </Text>
                                </View>
                                <View style={styles.boxs}>
                                    <Text style={styles.numbers}>4.</Text><Text style={styles.texts}>
                                        You can check your status and recored in history
                                    </Text>
                                </View>
                            </View>

                            <View>
                                <Text>For recipents </Text>
                                <View style={styles.boxs}>
                                    <Text style={styles.numbers}>1.</Text><Text style={styles.texts}>
                                        Register as recipents.
                                    </Text>
                                </View>
                                <View style={styles.boxs}>
                                    <Text style={styles.numbers}>2.</Text><Text style={styles.texts}>
                                        Provide all asked data
                                    </Text>
                                </View>
                                <View style={styles.boxs}>
                                    <Text style={styles.numbers}>3.</Text><Text style={styles.texts}>
                                        Fill recipents form to recive organ
                                    </Text>
                                </View>
                                <View style={styles.boxs}>
                                    <Text style={styles.numbers}>4.</Text><Text style={styles.texts}>
                                        You can send request for your matched organ in organs tab
                                    </Text>
                                </View>
                                <View style={styles.boxs}>
                                    <Text style={styles.numbers}>5.</Text><Text style={styles.texts}>
                                        You can check your status , request history and recored in history
                                    </Text>
                                </View>
                            </View>

                        </ScrollView>


                    )}
                </View>
            </View>




        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center'
    },
    box: {
        overflow: 'hidden',
        borderRadius: 5,
        padding: 10,
    },
    titles: {
        fontWeight: 'bold',
        fontSize: 15

    },
    collapsed: {
        height: 0
    },
    expanded: {
        minHeight: 60
    },
    text: {
        color: '#333'
    },
    boxs: {
        flexDirection: 'row',
        margin: '3%',
        marginLeft: '3%',
        marginTop: '3%'
    },
    numbers: {
        color: 'red',
        fontWeight: 'bold'
    },
    texts: {
        marginLeft: "2%"
    }
});