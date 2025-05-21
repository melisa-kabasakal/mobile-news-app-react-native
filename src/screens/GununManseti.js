import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
} from 'react-native';
import axios from 'axios';
import { useTheme } from '../context/ThemeProvider';
import MainLayout from '../components/MainLayout';
import Footer from '../components/Footer';

const GununManseti = () => {
  const { isDarkMode } = useTheme();
  const [images, setImages] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [loading, setLoading] = useState(true);

  const PROXY = 'https://69a5-88-253-133-120.ngrok-free.app';

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get(
          'https://yeniyasamgazetesi9.com/wp-json/wp/v2/pages/233944'
        );

        const html = res.data.content.rendered;
        const matches = [...html.matchAll(/<img[^>]*src="([^"]+)"[^>]*>/gi)];

        const filtered = matches
          .map((m) => m[1])
          .filter((src) => src.includes('wp-content/uploads'));

        const proxied = filtered.map((src) => ({
          id: src,
          uri: `${PROXY}/proxy-image?url=${encodeURIComponent(src)}`,
        }));

        setImages(proxied);
      } catch (err) {
        console.error('Görseller alınamadı:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => Linking.openURL(item.id)}>
    <Image source={{ uri: item.uri }} style={styles.image} />
  </TouchableOpacity>

  );

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  return (
    <MainLayout>
      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#006c9b" />
        </View>
      ) : (
        <FlatList
          data={images.slice(0, visibleCount)}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={[
            styles.container,
            { backgroundColor: isDarkMode ? '#000' : '#fff' },
          ]}
          ListFooterComponent={
            <>
              {visibleCount < images.length && (
                <TouchableOpacity onPress={handleLoadMore} style={styles.button}>
                  <Text style={styles.buttonText}>Daha fazla göster</Text>
                </TouchableOpacity>
              )}
              <Footer />
            </>
          }
        />
      )}
    </MainLayout>
  );
};

export default GununManseti;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingBottom: 80,
  },
  image: {
    width: '100%',
    height: 600,
    resizeMode: 'contain',
    marginBottom: 20,
    
  },
  button: {
    backgroundColor: '#006c9b',
    padding: 12,
    borderRadius: 8,
    marginVertical: 20,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
});
