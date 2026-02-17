import Entypo from '@expo/vector-icons/Entypo';
import React, { useState } from 'react';
import { ImageBackground, LayoutAnimation, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ExpandableBox() {
    const [foodExpanded, setFoodExpanded] = useState(true);
    const [foodExpanded1, setFoodExpanded1] = useState(true);
    const [foodExpanded2, setFoodExpanded2] = useState(true);
    const [foodExpanded3, setFoodExpanded3] = useState(true);



    const foodExpand = () => {
        // Animate the transition for smooth expand/collapse
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setFoodExpanded(!foodExpanded)
    };
    const foodExpand1 = () => {
        // Animate the transition for smooth expand/collapse
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setFoodExpanded1(!foodExpanded1)
    };
    const foodExpand2 = () => {
        // Animate the transition for smooth expand/collapse
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setFoodExpanded2(!foodExpanded2)
    };
    const foodExpand3 = () => {
        // Animate the transition for smooth expand/collapse
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setFoodExpanded3(!foodExpanded3)
    };


    return (
        <ImageBackground
            source={require('../../Desgin Templete and Docmentation/background 3.jpg')}
            style={{ flex: 1 }}>
            <ScrollView>


                <View style={styles.container}>
                    <TouchableOpacity style={styles.button} onPress={foodExpand}>
                        <Text style={styles.buttonText}>
                            Blood Type O  <Entypo name="chevron-down" size={17} color="black" />
                        </Text>
                    </TouchableOpacity>

                    <View style={[styles.box, foodExpanded ? styles.expanded : styles.collapsed]}>
                        {foodExpanded && (
                            <ScrollView style={{ paddingBottom: 30, height: 260 }}>
                                <View>
                                    <Text style={styles.titles}>Recommended Foods</Text>
                                    <View style={styles.boxs}>
                                        <Text style={styles.numbers}>1.</Text><Text style={styles.texts}>
                                            Lean meat chicken, fish
                                        </Text>
                                    </View>
                                </View>
                                <View>
                                    <View style={styles.boxs}>
                                        <Text style={styles.numbers}>2.</Text><Text style={styles.texts}>
                                            Eggs
                                        </Text>
                                    </View>
                                </View>
                                <View>
                                    <View style={styles.boxs}>
                                        <Text style={styles.numbers}>3.</Text><Text style={styles.texts}>
                                            Spinach,broccoli
                                        </Text>
                                    </View>
                                </View>
                                <View>
                                    <View style={styles.boxs}>
                                        <Text style={styles.numbers}>4.</Text><Text style={styles.texts}>
                                            Fruits
                                        </Text>
                                    </View>
                                </View>
                            </ScrollView>


                        )}
                    </View>
                </View>





                <View style={styles.container}>
                    <TouchableOpacity style={styles.button} onPress={foodExpand1}>
                        <Text style={styles.buttonText}>
                            Blood Type A  <Entypo name="chevron-down" size={17} color="black" />
                        </Text>
                    </TouchableOpacity>

                    <View style={[styles.box, foodExpanded1 ? styles.expanded : styles.collapsed]}>
                        {foodExpanded1 && (
                            <ScrollView style={{ paddingBottom: 30, height: 260 }}>
                                <View>
                                    <Text style={styles.titles}>Recommended Foods</Text>
                                    <View style={styles.boxs}>
                                        <Text style={styles.numbers}>1.</Text><Text style={styles.texts}>
                                            Vegetables (carrots, spinach)
                                        </Text>
                                    </View>
                                </View>
                                <View>
                                    <View style={styles.boxs}>
                                        <Text style={styles.numbers}>2.</Text><Text style={styles.texts}>
                                            Fruits (berries, apples)
                                        </Text>
                                    </View>
                                </View>
                                <View>
                                    <View style={styles.boxs}>
                                        <Text style={styles.numbers}>3.</Text><Text style={styles.texts}>
                                            Soy products
                                        </Text>
                                    </View>
                                </View>
                                <View>
                                    <View style={styles.boxs}>
                                        <Text style={styles.numbers}>4.</Text><Text style={styles.texts}>
                                            Whole grains
                                        </Text>
                                    </View>
                                </View>
                            </ScrollView>


                        )}
                    </View>
                </View>

                <View style={styles.container}>
                    <TouchableOpacity style={styles.button} onPress={foodExpand2}>
                        <Text style={styles.buttonText}>
                            Blood Type B <Entypo name="chevron-down" size={17} color="black" />
                        </Text>
                    </TouchableOpacity>

                    <View style={[styles.box, foodExpanded2 ? styles.expanded : styles.collapsed]}>
                        {foodExpanded2 && (
                            <ScrollView style={{ paddingBottom: 30, height: 260 }}>
                                <View>
                                    <Text style={styles.titles}>Recommended Foods</Text>
                                    <View style={styles.boxs}>
                                        <Text style={styles.numbers}>1.</Text><Text style={styles.texts}>
                                            Eggs
                                        </Text>
                                    </View>
                                </View>
                                <View>
                                    <View style={styles.boxs}>
                                        <Text style={styles.numbers}>2.</Text><Text style={styles.texts}>
                                            Dairy (milk, yogurt)
                                        </Text>
                                    </View>
                                </View>
                                <View>
                                    <View style={styles.boxs}>
                                        <Text style={styles.numbers}>3.</Text><Text style={styles.texts}>
                                            Green vegetables
                                        </Text>
                                    </View>
                                </View>
                                <View>
                                    <View style={styles.boxs}>
                                        <Text style={styles.numbers}>4.</Text><Text style={styles.texts}>
                                            Fish
                                        </Text>
                                    </View>
                                </View>
                            </ScrollView>

                        )}
                    </View>
                </View>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.button} onPress={foodExpand3}>
                        <Text style={styles.buttonText}>
                            Blood Type AB  <Entypo name="chevron-down" size={17} color="black" />
                        </Text>
                    </TouchableOpacity>

                    <View style={[styles.box, foodExpanded3 ? styles.expanded : styles.collapsed]}>
                        {foodExpanded3 && (
                            <ScrollView style={{ paddingBottom: 30, height: 260 }}>
                                <View>
                                    <Text style={styles.titles}>Recommended Foods</Text>
                                    <View style={styles.boxs}>
                                        <Text style={styles.numbers}>1.</Text><Text style={styles.texts}>
                                            Seafood
                                        </Text>
                                    </View>
                                </View>
                                <View>
                                    <View style={styles.boxs}>
                                        <Text style={styles.numbers}>2.</Text><Text style={styles.texts}>
                                            Dairy products
                                        </Text>
                                    </View>
                                </View>
                                <View>
                                    <View style={styles.boxs}>
                                        <Text style={styles.numbers}>3.</Text><Text style={styles.texts}>
                                            Tofu
                                        </Text>
                                    </View>
                                </View>
                                <View>
                                    <View style={styles.boxs}>
                                        <Text style={styles.numbers}>4.</Text><Text style={styles.texts}>
                                            Fruits
                                        </Text>
                                    </View>
                                </View>
                            </ScrollView>


                        )}
                    </View>
                </View>


            </ScrollView>
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