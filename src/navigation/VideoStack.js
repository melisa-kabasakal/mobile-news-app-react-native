import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VideoNewsScreen from '../screens/VideoNewsScreen';
import VideoDetailScreen from '../screens/VideoDetailScreen';

const Stack = createNativeStackNavigator();

const VideoStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="VideoMain" component={VideoNewsScreen} />
    <Stack.Screen name="VideoDetail" component={VideoDetailScreen} />

  </Stack.Navigator>
);

export default VideoStack;
