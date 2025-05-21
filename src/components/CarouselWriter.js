import React, { useState, useEffect, useRef, memo } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  useWindowDimensions,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/AntDesign';
import { decode } from 'html-entities';
import { useTheme } from '../context/ThemeProvider';
import { useNavigation } from '@react-navigation/native';

const CarouselWriterItem = memo(({ item, width, isDarkMode, onPress }) => (
  <TouchableOpacity
    style={[styles.item, { width }]}
    onPress={onPress}
    activeOpacity={0.9}
  >
    <Image source={{ uri: item.image }} style={styles.avatar} />
    <View style={styles.textGroup}>
      <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#000' }]}>{item.title}</Text>
    </View>
  </TouchableOpacity>
));

const CarouselWriter = () => {
  const { theme, isDarkMode } = useTheme();
  const { width } = useWindowDimensions();
  const navigation = useNavigation();

  const flatListRef = useRef(null);
  const [newsData, setNewsData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const ITEM_WIDTH = (width - 60) / 2;
  const ITEM_MARGIN = 10;

  useEffect(() => {
    axios
      .get('https://yeniyasamgazetesi9.com/wp-json/wp/v2/posts?categories=48&_embed&per_page=10')
      .then((response) => {
        const formattedData = response.data.map((post) => ({
          id: post.id,
          title: decode(post.title.rendered),
          link: post.link,
          content: post.content,
          image:
            post._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
            'https://via.placeholder.com/300x180.png?text=No+Image',
          categoryId: post.categories?.[0],
        }));

        setNewsData(formattedData);
      })
      .catch((error) => {
        console.warn('Yazılar alınırken hata oluştu:', error.message);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (newsData.length > 0 && flatListRef.current) {
        const nextIndex = (currentIndex + 2) % newsData.length;
        flatListRef.current.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
        setCurrentIndex(nextIndex);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, newsData]);

  const scrollToIndex = (index) => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ index, animated: true });
      setCurrentIndex(index);
    }
  };

  const handleMomentumScrollEnd = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / (ITEM_WIDTH + ITEM_MARGIN * 2));
    setCurrentIndex(newIndex);
  };

  if (newsData.length === 0) {
    return <ActivityIndicator size="large" color="#006c9b" style={{ marginVertical: 20 }} />;
  }

  return (
    <SafeAreaView style={{ backgroundColor: theme.background }}>
      <View style={styles.wrapper}>
        <TouchableOpacity
          style={[styles.arrow, styles.arrowLeft]}
          onPress={() => scrollToIndex(currentIndex === 0 ? newsData.length - 2 : currentIndex - 2)}
        >
          <Icon name="left" size={24} color={isDarkMode ? '#ffffff' : '#000000'} />
        </TouchableOpacity>

        <FlatList
          ref={flatListRef}
          data={newsData}
          renderItem={({ item }) => (
            <CarouselWriterItem
              item={item}
              width={ITEM_WIDTH}
              isDarkMode={isDarkMode}
              onPress={() => navigation.navigate('AllPostDetail', { postId: item.id })}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={(ITEM_WIDTH + ITEM_MARGIN * 2) * 2}
          decelerationRate="fast"
          contentContainerStyle={{ paddingHorizontal: ITEM_MARGIN }}
          onMomentumScrollEnd={handleMomentumScrollEnd}
          getItemLayout={(_, index) => ({
            length: ITEM_WIDTH + ITEM_MARGIN * 2,
            offset: (ITEM_WIDTH + ITEM_MARGIN * 2) * index,
            index,
          })}
        />

        <TouchableOpacity
          style={[styles.arrow, styles.arrowRight]}
          onPress={() => scrollToIndex((currentIndex + 2) % newsData.length)}
        >
          <Icon name="right" size={24} color={isDarkMode ? '#ffffff' : '#000000'} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrow: {
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    backgroundColor: 'rgba(200, 200, 200, 0.4)',
    margin: 3,
  },
  arrowLeft: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  arrowRight: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 7,
    gap: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: '#ccc',
  },
  textGroup: {
    flexShrink: 1,
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 20,
    flexWrap: 'wrap',
  },
});

export default CarouselWriter;