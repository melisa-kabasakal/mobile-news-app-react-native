import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

import Entypo from 'react-native-vector-icons/Entypo';


const screenWidth = Dimensions.get('window').width;

const VideoHighlight = () => {
  const [videos, setVideos] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get('http://192.168.1.100:3001/video-playlist');
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
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Video Haber</Text>

      <TouchableOpacity onPress={() => goToDetail(main.youtubeId)} style={styles.mainVideo}>
        <Image source={{ uri: main.thumbnail }} style={styles.mainImage} />
       <View style={styles.playButton}>
  <Entypo name="controller-play" size={28} color="#fff" />
</View>
        <Text style={styles.mainTitle}>{main.title}</Text>
      </TouchableOpacity>

      <FlatList
        data={others}
        keyExtractor={(item) => item.youtubeId}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
  <TouchableOpacity
    onPress={() => goToDetail(item.youtubeId)}
    style={styles.smallCard}
  >
    <View style={styles.thumbWrapper}>
      <Image source={{ uri: item.thumbnail }} style={styles.thumb} />
      <View style={styles.smallPlayButton}>
        <Entypo name="controller-play" size={18} color="#fff" />
      </View>
    </View>
    <Text style={styles.smallTitle} numberOfLines={2}>{item.title}</Text>
  </TouchableOpacity>
)}

      />
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
    backgroundColor: '#e53935',
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    paddingLeft: 14,
  },
  mainVideo: {
    marginTop: 10,
    marginBottom: 15,
  },
  mainImage: {
    width: screenWidth,
    height: 220,
   
    alignSelf: 'center',
  },
  playButton: {
    position: 'absolute',
    top: 90,
    left: (screenWidth - 60) / 2,
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
  smallCard: {
    width: 180,
    marginRight: 10,
  },
  thumb: {
    width: '100%',
    height: 100,
   
  },
  smallTitle: {
    fontSize: 14,
    marginTop: 5,
  },

  thumbWrapper: {
  position: 'relative',
  width: '100%',
  height: 100,
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

});
