import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WritersScreen from '../screens/WritersScreen';
import WriterArticlesScreen from '../screens/WriterArticlesScreen';
import ArticleDetailScreen from '../screens/ArticleDetailScreen';
import PostDetail from '../components/PostDetail';
import NewsDetail from '../screens/NewsDetail';

const Stack = createNativeStackNavigator();

const WritersStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="WritersMain" component={WritersScreen} />
    <Stack.Screen name="WriterArticles" component={WriterArticlesScreen} />
    <Stack.Screen name="ArticleDetailScreen" component={ArticleDetailScreen} />
    <Stack.Screen name="PostDetail" component={PostDetail} />
    <Stack.Screen name="NewsDetail" component={NewsDetail} />
  </Stack.Navigator>
);

export default WritersStack;
