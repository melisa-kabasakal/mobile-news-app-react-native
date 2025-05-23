import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { useTheme } from '../context/ThemeProvider';
import { useNavigation } from '@react-navigation/native';

const GununMansetiPreview = () => {
  const { isDarkMode } = useTheme();
  const { width } = useWindowDimensions();
  const navigation = useNavigation(); 

  const [firstImage, setFirstImage] = useState(null);
  const [loading, setLoading] = useState(true);



  const LOCAL_IP = 'https://69a5-88-253-133-120.ngrok-free.app';

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
          console.warn('Manşetler preview uyarı:', error.message);
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
    <View style={styles.wrapper}>
      <Text style={[styles.headerText, { color: isDarkMode ? '#fff' : '#fff' }]}>
        Günün Manşeti
      </Text>

      {firstImage && (
  <TouchableOpacity onPress={() => navigation.navigate('Günün Manşeti')}>
    <Image
      source={{ uri: firstImage }}
      style={{
        width: '100%', 
        height: (width * 1600) / 1130, 
      }}
      resizeMode="cover"
    />
  </TouchableOpacity>
)}

    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 30,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    backgroundColor: '#d71920',
    padding: 10,
    marginBottom: 6,
  },
  
});

export default GununMansetiPreview;
