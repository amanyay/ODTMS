import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';
import React from 'react';

export default function Tablayout() {
    return (
        <Tabs initialRouteName='home'>
            <Tabs.Screen name='home' options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (<Entypo name="home" size={28} color="black" />),
                tabBarLabel: 'Home'
            }} />
            <Tabs.Screen name='analaytics' options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (<MaterialIcons name="analytics" size={28} color="black" />),
                tabBarLabel: 'Statstics'
            }} />
            <Tabs.Screen name='history' options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (<MaterialIcons name="history" size={28} color="black" />),
                tabBarLabel: 'History'
            }} />
            <Tabs.Screen name='profile' options={{
                headerShown: true,
                title: 'Edit Profile',
                headerTitleAlign:'center',
                tabBarIcon: ({ size, color }) => (<FontAwesome name="user-circle-o" size={28} color="black" />),
                tabBarLabel: 'Profile'
            }} />

        </Tabs>
    )
}