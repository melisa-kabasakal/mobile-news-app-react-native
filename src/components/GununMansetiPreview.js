import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  useWindowDimensions,
} from 'react-native';
import axios from 'axios';
import { useTheme } from '../context/ThemeProvider';

const GununMansetiPreview = () => {
  const { isDarkMode } = useTheme();
  const { width } = useWindowDimensions();

  const [firstImage, setFirstImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPreview = async () => {
      try {
        const response = await axios.get(
          'https://yeniyasamgazetesi9.com/wp-json/wp/v2/pages/233944'
          
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

        const LOCAL_IP = 'http://192.168.1.100:3001';
        html = html.replace(
          /<img[^>]*src="([^"]+)"[^>]*>/gi,
          (match, src) => {
            const encoded = encodeURIComponent(src);
            return match.replace(src, `${LOCAL_IP}/proxy-image?url=${encoded}`);
          }
        );

        const match = html.match(/<img[^>]*src="([^"]+)"[^>]*>/i);
        const firstImg = match ? match[1] : null;
        setFirstImage(firstImg);
      } catch (error) {
        if (__DEV__) {
    console.log('Manşetler preview uyarı:', error.message);
  }
      } finally {
        setLoading(false);
      }
    };

    fetchPreview();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#006c9b" style={{ marginVertical: 20 }} />;
  }

  return (
    <View >
      <Text style={[styles.headerText, { color: isDarkMode ? '#fff' : '#fff' }]}>Günün Manşeti</Text>
      {firstImage && (
        <Image
          source={{ uri: firstImage }}
          style={styles.previewImage}
          resizeMode="contain"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    backgroundColor: '#ff0000',
    padding: 10,
    marginBottom: 10,
  },
  previewImage: {
    width: '100%',
    height: 700,
    marginBottom: 16,
  },
});

export default GununMansetiPreview;
