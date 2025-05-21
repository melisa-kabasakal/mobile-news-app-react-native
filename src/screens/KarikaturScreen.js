import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import RenderHtml from 'react-native-render-html';
import { useTheme } from '../context/ThemeProvider';
import MainLayout from '../components/MainLayout';
import Footer from '../components/Footer';

const KarikaturScreen = () => {
  const { isDarkMode } = useTheme();
  const { width } = useWindowDimensions();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(5);

  const PROXY = 'https://69a5-88-253-133-120.ngrok-free.app';

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const response = await axios.get(
          'https://yeniyasamgazetesi9.com/wp-json/wp/v2/pages/238943'
        );

        let html = response.data.content.rendered;

        html = html.replace(
          /<img([^>]+)src=['"]{1}['"]{1}([^>]+)data-src=['"]([^'"]+)['"]/gi,
          '<img$1src="$3"$2data-src="$3"'
        );
        html = html.replace(
          /<img([^>]*?)data-src=['"]([^'"]+)['"]/gi,
          '<img$1src="$2" data-src="$2"'
        );

        const matchedImages = [...html.matchAll(/<img[^>]*src="([^"]+)"[^>]*>/gi)];

        const valid = matchedImages
          .map(match => match[1])
          .filter(src => src.includes('yeniyasamgazetesi9.com/wp-content/uploads/'))
          .map(src => `${PROXY}/proxy-image?url=${encodeURIComponent(src)}`);

        setImages(valid);
      } catch (err) {
        console.warn('Karikatür verisi alınamadı:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, []);

  const renderItem = ({ item }) => (
    <RenderHtml
      contentWidth={width}
      source={{ html: `<img src="${item}" />` }}
      baseStyle={{
        marginVertical: 10,
        borderRadius: 10,
      }}
      tagsStyles={{
        img: {
          width: '100%',
          height: 'auto',
          resizeMode: 'contain',
          marginVertical: 10,
        },
      }}
    />
  );

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 5);
  };

  if (loading) {
    return (
      <MainLayout>
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#006c9b" />
        </View>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <FlatList
        data={images.slice(0, visibleCount)}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={[
          styles.container,
          { backgroundColor: isDarkMode ? '#000' : '#fff' },
        ]}
        ListFooterComponent={
          <>
            {visibleCount < images.length && (
              <TouchableOpacity onPress={handleLoadMore} style={styles.loadMoreBtn}>
                <Text style={styles.loadMoreText}>Daha fazla göster</Text>
              </TouchableOpacity>
            )}
            <Footer />
          </>
        }
        initialNumToRender={5}
        windowSize={10}
        removeClippedSubviews={false}
        keyboardShouldPersistTaps="handled"
      />
    </MainLayout>
  );
};

export default KarikaturScreen;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 16,
    paddingBottom: 80,
  },
  loadMoreBtn: {
    padding: 12,
    marginVertical: 20,
    backgroundColor: '#006c9b',
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'center',
  },
  loadMoreText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
