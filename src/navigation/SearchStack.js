
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SearchScreen from '../screens/SearchScreen';
import SingleNewsScreen from '../screens/SingleNewsScreen'; 

const Stack = createNativeStackNavigator();

const SearchStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SearchMain" component={SearchScreen} />
    <Stack.Screen name="SingleNews" component={SingleNewsScreen} />
  </Stack.Navigator>
);

export default SearchStack;
