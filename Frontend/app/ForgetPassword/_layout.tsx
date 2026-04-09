// app/homePageContent/_layout.tsx
import { Stack } from "expo-router";

export default function HomePageContentLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                headerTitleStyle: { fontWeight: "bold" },
            }}
        >
            <Stack.Screen
                name="forget"
                options={{ headerShown: true, title: 'Forget' }}
            />
            <Stack.Screen
                name="verification"
                options={{ headerShown: true, title: 'Verification' }}
            />
            <Stack.Screen
                name="newPassword"
                options={{ headerShown: true, title: 'New Password' }}
            />
        </Stack>
    );
}