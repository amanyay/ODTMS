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
        name="donarForm"
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="recipentsForm"
        options={{ headerShown: true }}

      />
      <Stack.Screen
        name="successful"
        options={() => ({
          headerShown: false
        })}
      />
      <Stack.Screen
        name="organs"
        options={{ headerShown: true, title: 'Matched organs' }}
      />
      <Stack.Screen
        name="organForDonor"
        options={{ headerShown: true, title: 'Donor organs' }}
      />
      <Stack.Screen
        name="notification"
        options={{ headerShown: true, title: 'Notification' }}
      />
      <Stack.Screen
        name="search"
        options={{ title: "FAQ" }}
      />
      <Stack.Screen
        name="calculator"
        options={{ headerShown: true, title: 'BMI Calculator' }}
      />
      <Stack.Screen
        name="help"
        options={{ headerShown: true, title: 'Help' }}
      />
      <Stack.Screen
        name="foods"
        options={{ headerShown: true, title: 'foods' }}
      />
      <Stack.Screen
        name="chatBot"
        options={{
          headerShown: true, title: 'Our AI', headerTintColor: 'white',
          headerStyle: { backgroundColor: '#022934' }
        }}
      />
      <Stack.Screen
        name="qr"
        options={{
          headerShown: true, title: 'qr', headerTintColor: 'black',

        }}
      />
      <Stack.Screen
        name="verifyFayda"
        options={{
          headerShown: true, title: 'Fayda Verification', headerTitleAlign: 'center', headerTintColor: 'black',

        }}
      />
    </Stack>
  );
}