import { Drawer } from 'expo-router/drawer';

export default function Layout() {
  return (
    <Drawer initialRouteName='editOrgans'>
      <Drawer.Screen
        name="editOrgans"
        options={{
          drawerLabel: 'Edit organs',
          title: 'organs',
        }}
      />
      <Drawer.Screen
        name="editDonors"
        options={{
          drawerLabel: 'Edit donors',
          title: 'Donors',
        }}
      />
      <Drawer.Screen
        name="editRecipents"
        options={{
          drawerLabel: 'Edit recipent',
          title: 'Recipents',
        }}
      />
      <Drawer.Screen
        name="editRequests"
        options={{
          drawerLabel: 'Edit requests',
          title: 'Requests',
        }}
      />
      
    </Drawer>
  );
}
