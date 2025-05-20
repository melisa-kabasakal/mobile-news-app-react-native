import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeStack from './HomeStack';
import WritersStack from './WritersStack';
import VideoStack from './VideoStack';
import MenuStack from './MenuStack';
import SearchScreen from '../screens/SearchScreen';
import SearchStack from './SearchStack';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#006c9b',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0.5,
          borderTopColor: '#ccc',
        },
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Anasayfa': iconName = 'home-outline'; break;
            case 'Yazarlar': iconName = 'document-text-outline'; break;
            case 'Video': iconName = 'videocam-outline'; break;
            case 'Ara': iconName = 'search-outline'; break;
            case 'Menü': iconName = 'menu-outline'; break;
            default: iconName = 'home-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Anasayfa" component={HomeStack} />
      <Tab.Screen name="Yazarlar" component={WritersStack} />
      <Tab.Screen name="Video" component={VideoStack} />
      <Tab.Screen name="Ara" component={SearchStack} />
      <Tab.Screen name="Menü" component={MenuStack} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
