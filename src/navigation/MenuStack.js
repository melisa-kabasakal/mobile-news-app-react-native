import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MenuScreen from '../screens/MenuScreen';

const Stack = createNativeStackNavigator();

const MenuStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MenuMain" component={MenuScreen} />
  </Stack.Navigator>
);

export default MenuStack;
