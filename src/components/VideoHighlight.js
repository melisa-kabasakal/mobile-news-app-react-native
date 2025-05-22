import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import { useTheme } from '../context/ThemeProvider';

const VideoHighlight = () => {
  const [videos, setVideos] = useState([]);
  const navigation = useNavigation();
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get('https://69a5-88-253-133-120.ngrok-free.app/video-playlist');
        setVideos(res.data.slice(0, 5));
      } catch (err) {
        console.warn('Video verisi alınamadı', err.message);
      }
    };

    fetchVideos();
  }, []);

  const goToDetail = (youtubeId) => {
    navigation.navigate('VideoDetail', { youtubeId });
  };

  if (videos.length === 0) return null;

  const main = videos[0];
  const others = videos.slice(1);

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#fff' }]}>
      <Text style={styles.sectionTitle}>Video Haber</Text>

      <TouchableOpacity onPress={() => goToDetail(main.youtubeId)} style={styles.mainVideo}>
        <Image source={{ uri: main.thumbnail }} style={styles.mainImage} />
        <View style={styles.playButton}>
          <Entypo name="controller-play" size={28} color="#fff" />
        </View>
        <Text style={[styles.mainTitle, { color: isDarkMode ? '#fff' : '#000' }]}>
          {main.title}
        </Text>
      </TouchableOpacity>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollRow}
      >
        {others.map((item) => (
          <TouchableOpacity
            key={item.youtubeId}
            onPress={() => goToDetail(item.youtubeId)}
            style={styles.smallCard}
          >
            <View style={styles.thumbWrapper}>
              <Image source={{ uri: item.thumbnail }} style={styles.thumb} />
              <View style={styles.smallPlayButton}>
                <Entypo name="controller-play" size={18} color="#fff" />
              </View>
            </View>
            <Text style={[styles.smallTitle, { color: isDarkMode ? '#fff' : '#000' }]}>
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default VideoHighlight;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    backgroundColor: '#d71920',
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    paddingLeft: 14,
  },
  mainVideo: {
    marginTop: 2,
    marginBottom: 15,
  },
  mainImage: {
    width: '100%',
    height: 220,
    alignSelf: 'center',
  },
  playButton: {
    position: 'absolute',
    top: 90,
    left: '45%',
    width: 50,
    height: 50,
    backgroundColor: 'rgba(255,0,0,0.8)',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainTitle: {
    marginTop: 8,
    fontWeight: 'bold',
    fontSize: 16,
    paddingHorizontal: 10,
  },
  scrollRow: {
    paddingHorizontal: 10,
  },
  smallCard: {
    width: 180,
    marginRight: 10,
  },
  thumbWrapper: {
    position: 'relative',
    width: '100%',
    height: 100,
  },
  thumb: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  smallPlayButton: {
    position: 'absolute',
    top: 35,
    left: 75,
    width: 30,
    height: 30,
    backgroundColor: 'rgba(255,0,0,0.8)',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallTitle: {
    fontSize: 14,
    marginTop: 5,
  },
});
