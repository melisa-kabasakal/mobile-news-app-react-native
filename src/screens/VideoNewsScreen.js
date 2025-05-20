import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  useWindowDimensions,
} from 'react-native';
import axios from 'axios';
import { useTheme } from '../context/ThemeProvider';
import MainLayout from '../components/MainLayout';
import Footer from '../components/Footer';
import Entypo from 'react-native-vector-icons/Entypo';


const VideoNewsScreen = ({ navigation }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useTheme();
  const { width } = useWindowDimensions();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get('http://192.168.1.100:3001/video-playlist');
        setVideos(res.data);
      } catch (error) {
        console.error('Video verisi alınamadı:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.card,
        { backgroundColor: isDarkMode ? '#111' : '#fff' },
      ]}
      onPress={() => navigation.navigate('VideoDetail', { youtubeId: item.youtubeId })}
    >
      {item.thumbnail && (
  <View style={styles.thumbnailWrapper}>
    <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
    <View style={styles.playButton}>
      <Entypo name="controller-play" size={24} color="#fff" />
    </View>
  </View>
)}

      <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#000' }]}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <MainLayout>
      <View style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#fff' }]}>

        {loading ? (
          <ActivityIndicator size="large" color={isDarkMode ? '#fff' : '#000'} />
        ) : (
          <FlatList
            data={videos}
            keyExtractor={(item) => item.youtubeId}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 20 }}
            ListFooterComponent={
              <View style={{ width }}>
                <Footer />
              </View>
            }
          />
        )}
      </View>
    </MainLayout>
  );
};

export default VideoNewsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    marginBottom: 15,
    borderRadius: 10,
    padding: 10,
  },
  thumbnail: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  title: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: '500',
  },
  thumbnailWrapper: {
  position: 'relative',
  width: '100%',
  height: 200,
},

playButton: {
  position: 'absolute',
  top: 75,
  left: '45%',
  width: 40,
  height: 40,
  backgroundColor: 'rgba(255,0,0,0.8)',
  borderRadius: 20,
  justifyContent: 'center',
  alignItems: 'center',
},

});
