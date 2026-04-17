import { Drawer } from "expo-router/drawer";

export default function Layout() {

    return (

        <Drawer>
            <Drawer.Screen
                name="eyeDonor"
                options={{ headerShown: true, drawerLabel: 'Eye Donors', title: 'Eye Donors' }}
            />
            <Drawer.Screen
                name="eyeRecipents"
                options={{ headerShown: true, drawerLabel: 'Eye Recipents', title: 'Eye Recipents' }}
            />
            <Drawer.Screen
                name="eyeEdit"
                options={{ headerShown: true, drawerLabel: 'Eye Edit', title: 'Eye Edit' }}
            />
            <Drawer.Screen
                name="eyeMatch"
                options={{ headerShown: true, drawerLabel: 'Eye Match', title: 'Matched Organ' }}
            />
            <Drawer.Screen
                name="eyeRequests"
                options={{ headerShown: true, drawerLabel: 'Eye Waiting List', title: 'Eye Waiting List' }}
            />
            <Drawer.Screen
                name="eyeeTransplantComplete"
                options={{ headerShown: true, drawerLabel: 'On Going Transplant', title: 'On Going Transplant' }}
            />
            <Drawer.Screen
                name="adminProfile"
                options={{ headerShown: true, drawerLabel: 'My Profile', title: 'My Profile', headerTitleAlign: 'center' }}
            />
        </Drawer>
    )

}