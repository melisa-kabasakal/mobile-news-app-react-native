import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeMainScreen from '../components/HomeMainScreen';
import Politika from '../screens/Politika';
import Kultur from '../screens/Kultur';
import Kadin from '../screens/Kadin';
import Guncel from '../screens/Guncel';
import Ekonomi from '../screens/Ekonomi';
import Ekoloji from '../screens/Ekoloji';
import ArticleDetailScreen from '../screens/ArticleDetailScreen';
import NewsDetail from '../screens/NewsDetail';
import PostDetail from '../components/PostDetail';
import WriterArticlesScreen from '../screens/WriterArticlesScreen';
import SingleNewsScreen from '../screens/SingleNewsScreen';
import AllPostsScreen from '../screens/AllPostsScreen';
import AllPostDetail from '../components/AllPostDetail';
import Soylesi from '../screens/Soylesi';
import Yasam from '../screens/Yasam';
import Forum from '../screens/Forum'; 
import Dunya from '../screens/Dunya';
import Ortadogu from '../screens/Ortadogu';
import Panorama from '../screens/Panorama';
import PanoramaYil from '../screens/PanoramaYil';
import WritersScreen from '../screens/WritersScreen';
import EditorunSectikleri from '../screens/EditorunSectikleri';
import GununManseti from '../screens/GununManseti';
import KarikaturScreen from '../screens/KarikaturScreen';
import LoginScreen from '../screens/LoginScreen';
import WriterPosts from '../components/WriterPosts';
import VideoDetailScreen from '../screens/VideoDetailScreen';



const Stack = createNativeStackNavigator();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeMain" component={HomeMainScreen} />
    <Stack.Screen name="Politika" component={Politika} />
    <Stack.Screen name="Kültür" component={Kultur} />
    <Stack.Screen name="Kadın" component={Kadin} />
    <Stack.Screen name="Güncel" component={Guncel} />
    <Stack.Screen name="Ekonomi" component={Ekonomi} />
    <Stack.Screen name="Ekoloji" component={Ekoloji} />
    <Stack.Screen name="ArticleDetailScreen" component={ArticleDetailScreen} />
    <Stack.Screen name="NewsDetail" component={NewsDetail} />
    <Stack.Screen name="PostDetail" component={PostDetail} />
    <Stack.Screen name="WriterArticles" component={WriterArticlesScreen} />
    <Stack.Screen name="SingleNews" component={SingleNewsScreen} />
    <Stack.Screen name="Tümü" component={AllPostsScreen} />
    <Stack.Screen name="AllPostDetail" component={AllPostDetail} />
    <Stack.Screen name="Emek-Ekonomi" component={Ekonomi} />
    <Stack.Screen name="Söyleşi" component={Soylesi} />
    <Stack.Screen name="Yaşam" component={Yasam} />
    <Stack.Screen name="Forum" component={Forum} />

<Stack.Screen name="Dünya" component={Dunya} />

<Stack.Screen name="Ortadoğu" component={Ortadogu} />
<Stack.Screen name="Panorama" component={Panorama} />
<Stack.Screen name="PanoramaYil" component={PanoramaYil} />
<Stack.Screen name="Yazarlar" component={WritersScreen} />
<Stack.Screen name='Editörün Seçtikleri' component={EditorunSectikleri} />
<Stack.Screen name='Günün Manşeti' component={GununManseti} />
<Stack.Screen name='Karikatür' component={KarikaturScreen} />
<Stack.Screen name="Login" component={LoginScreen} />
<Stack.Screen name="WriterPosts" component={WriterPosts} />
<Stack.Screen name="VideoDetail" component={VideoDetailScreen} />

  </Stack.Navigator>
  
);

export default HomeStack;
