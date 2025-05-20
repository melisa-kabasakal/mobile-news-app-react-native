import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useTheme } from '../context/ThemeProvider';
import MainLayout from '../components/MainLayout';
import Footer from '../components/Footer';

const VideoDetailScreen = ({ route }) => {
  const youtubeId = route?.params?.youtubeId;
  const embedUrl = `https://www.youtube.com/embed/${youtubeId}`;
  const { isDarkMode } = useTheme();

  const [orientation, setOrientation] = useState('PORTRAIT');

  useEffect(() => {
    const subscribe = ScreenOrientation.addOrientationChangeListener((evt) => {
      const o = evt.orientationInfo.orientation;
      setOrientation(o === 3 || o === 4 ? 'LANDSCAPE' : 'PORTRAIT');
    });

    ScreenOrientation.unlockAsync();

    return () => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
      ScreenOrientation.removeOrientationChangeListener(subscribe);
    };
  }, []);

  if (!youtubeId) {
    return (
      <MainLayout>
        <View style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#fff' }]}>
          <Text style={{ fontSize: 16, color: 'red' }}>Video ID bulunamadı.</Text>
        </View>
      </MainLayout>
    );
  }

  const { width, height } = Dimensions.get('window');

  return (
    <MainLayout>
      <View style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#fff' }]}>
        <WebView
          javaScriptEnabled={true}
          domStorageEnabled={true}
          source={{ uri: embedUrl }}
          allowsFullscreenVideo={true}
          style={{
            width: width,
            height: orientation === 'LANDSCAPE' ? height : 300,
          }}
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
});
