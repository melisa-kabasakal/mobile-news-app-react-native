import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform
} from 'react-native';
import { WebView } from 'react-native-webview';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useTheme } from '../context/ThemeProvider';
import { useFocusEffect } from '@react-navigation/native';
import MainLayout from '../components/MainLayout';

const VideoDetailScreen = ({ route }) => {
  const { youtubeId } = route?.params || {};
  const embedUrl = `https://www.youtube.com/embed/${youtubeId}?playsinline=0`;
  const { isDarkMode } = useTheme();

  // 🎯 Ekran görünürken yönü unlock, çıkarken tekrar portrait yap
  useFocusEffect(
    useCallback(() => {
      ScreenOrientation.unlockAsync();

      return () => {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
      };
    }, [])
  );

  if (!youtubeId) {
    return (
      <MainLayout>
        <View style={[styles.centeredContainer, { backgroundColor: isDarkMode ? '#000' : '#fff' }]}>
          <Text style={{ fontSize: 16, color: 'red' }}>Video ID bulunamadı.</Text>
        </View>
      </MainLayout>
    );
  }

  const { width } = Dimensions.get('window');

  return (
    <MainLayout>
      <View style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#fff' }]}>
        <WebView
          source={{ uri: embedUrl }}
          javaScriptEnabled
          domStorageEnabled
          allowsFullscreenVideo
          mediaPlaybackRequiresUserAction={Platform.OS === 'android' ? false : undefined}
          style={{ flex: 1 }}
        />
      </View>
    </MainLayout>
  );
};

export default VideoDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
