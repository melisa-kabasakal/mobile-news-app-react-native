import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { decode } from 'html-entities'; 
import { useTheme } from '../context/ThemeProvider';
import { useNavigation } from '@react-navigation/native';

const Carousel = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();

  const [newsData, setNewsData] = useState([]);
  const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width);
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const onChange = ({ window }) => {
      setWindowWidth(window.width);
    };
    const subscription = Dimensions.addEventListener('change', onChange);
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    const url = 'https://yeniyasamgazetesi9.com/wp-json/wp/v2/posts?categories=46&_embed';
    
    axios
      .get(url)
      .then((response) => {
        if (response.data && Array.isArray(response.data)) {
          const formattedData = response.data.map((post) => ({
            id: post.id,
            title: decode(post.title.rendered),
            image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
              'https://via.placeholder.com/300x180.png?text=No+Image',
          }));
          setNewsData(formattedData);
        } else {
          console.error('Veri beklenilen formatta değil:', response.data);
        }
      })
      .catch((error) => {
        console.error('Haberler alınırken hata oluştu:', error.message);
      });
  }, []);
  
  useEffect(() => {
    if (newsData.length > 0) {
      const interval = setInterval(() => {
        if (flatListRef.current) {
          setCurrentIndex((prevIndex) => {
            const nextIndex = (prevIndex + 1) % newsData.length;
            flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
            return nextIndex;
          });
        }
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [newsData.length]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('NewsDetail', { postId: item.id })}
      style={[styles.card, { width: windowWidth }]}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={[styles.title, { color: theme.text }]}>{item.title}</Text>
    </TouchableOpacity>
  );

  if (newsData.length === 0) {
    return <Text style={styles.loadingText}>Yükleniyor...</Text>;
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.dotsContainer}>
        {newsData.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, currentIndex === index ? styles.activeDot : null]}
          />
        ))}
      </View>

      <FlatList
        ref={flatListRef}
        data={newsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ height: 380 }} 
        onScroll={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / windowWidth);
          setCurrentIndex(index);
        }}
        scrollEventThrottle={16}
        snapToInterval={windowWidth} 
        scrollEnabled={true} 
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  card: {
    top: 10,
    height: 400,
    justifyContent: 'start',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 270,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'start',
    paddingHorizontal: 10,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    top: 270,
    zIndex: 1,
  },
  dot: {
    width: 11,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#006c9b',
  },
  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Carousel;
