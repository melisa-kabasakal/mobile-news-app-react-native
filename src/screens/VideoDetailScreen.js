import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Dimensions, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useTheme } from '../context/ThemeProvider';
import MainLayout from '../components/MainLayout';
import Footer from '../components/Footer';

const VideoDetailScreen = ({ route }) => {
  const { youtubeId } = route?.params || {};
  const embedUrl = `https://www.youtube.com/embed/${youtubeId}`;
  const { isDarkMode } = useTheme();

  const [orientation, setOrientation] = useState('PORTRAIT');

  useEffect(() => {
    const onChange = ({ orientationInfo }) => {
      const o = orientationInfo.orientation;
      setOrientation(o === 3 || o === 4 ? 'LANDSCAPE' : 'PORTRAIT');
    };

    ScreenOrientation.addOrientationChangeListener(onChange);
    ScreenOrientation.unlockAsync(); // Kullanıcının döndürmesine izin ver

    return () => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
      ScreenOrientation.removeOrientationChangeListeners();
    };
  }, []);

  if (!youtubeId) {
    return (
      <MainLayout>
        <View style={[styles.centeredContainer, { backgroundColor: isDarkMode ? '#000' : '#fff' }]}>
          <Text style={{ fontSize: 16, color: 'red' }}>Video ID bulunamadı.</Text>
        </View>
      </MainLayout>
    );
  }

  const { width, height } = Dimensions.get('window');
  const videoHeight = orientation === 'LANDSCAPE' ? height : 300;

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
        {orientation === 'PORTRAIT' && <Footer />}
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
