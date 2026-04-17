import { Drawer } from 'expo-router/drawer'

export default function _layout() {
    return (
        <Drawer>
            <Drawer.Screen
                name='kidneyDonor'
                options={{ headerShown: true, drawerLabel: 'Kidney Donors', title: 'Kidney Donors' }}
            />
            <Drawer.Screen
                name='kidneyRecipents'
                options={{ headerShown: true, drawerLabel: 'Kidney Recipents', title: 'Kidney Recipents' }}
            />
            <Drawer.Screen
                name='kidneyEdit'
                options={{ headerShown: true, drawerLabel: 'Kidney Edit', title: 'Kidney Edit' }}
            />
            <Drawer.Screen
                name='kidneyMatch'
                options={{ headerShown: true, drawerLabel: 'Kidney Match', title: 'Matched Organs ' }}
            />
            <Drawer.Screen
                name='kidneyRequests'
                options={{ headerShown: true, drawerLabel: 'Kidney Waiting List', title: 'Kidney Waiting List' }}
            />
            <Drawer.Screen
                name='kidneyTransplantComplete'
                options={{ headerShown: true, drawerLabel: 'On Going Transplant', title: 'On Going Transplant' }}
            />
            <Drawer.Screen
                name='adminProfile'
                options={{ headerShown: true, drawerLabel: 'My Profile', title: 'My Profile', headerTitleAlign: 'center' }}
            />
        </Drawer>
    )
}