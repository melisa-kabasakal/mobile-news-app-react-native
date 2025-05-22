
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SearchScreen from '../screens/SearchScreen';
import SingleNewsScreen from '../screens/SingleNewsScreen'; 
import VideoDetailScreen from '../screens/VideoDetailScreen';
import WriterArticlesScreen from '../screens/WriterArticlesScreen';
import ArticleDetailScreen from '../screens/ArticleDetailScreen';

const Stack = createNativeStackNavigator();

const SearchStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SearchMain" component={SearchScreen} />
    <Stack.Screen name="SingleNews" component={SingleNewsScreen} />
    <Stack.Screen name="VideoDetail" component={VideoDetailScreen} />
     <Stack.Screen name="WriterArticlesScreen" component={WriterArticlesScreen} />
     <Stack.Screen name="ArticleDetailScreen" component={ArticleDetailScreen} />
  </Stack.Navigator>
  
);

export default SearchStack;
