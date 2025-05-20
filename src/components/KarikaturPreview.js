import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeProvider';

const KarikaturPreview = () => {
  const [karikatur, setKarikatur] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useTheme();
  const navigation = useNavigation();

  useEffect(() => {
    const fetchKarikatur = async () => {
      try {
        const response = await axios.get(
          'https://yeniyasamgazetesi9.com/wp-json/wp/v2/pages/238943'
        );
        const content = response.data.content.rendered;

        const match = content.match(/<img[^>]*src="([^"]+)"[^>]*>/i);
        const imageUrl = match?.[1];

        if (imageUrl) {
          const encoded = encodeURIComponent(imageUrl);
          const proxyUrl = `http://192.168.1.100:3001/proxy-image?url=${encoded}`;

          setKarikatur({
            image: proxyUrl,
            id: response.data.id,
            title: response.data.title.rendered,
          });
        }
      } catch (error) {
        if (__DEV__) {
    console.log('Karikatür preview uyarı:', error.message);
  }
      } finally {
        setLoading(false);
      }
    };

    fetchKarikatur();
  }, []);

  const handlePress = () => {
    navigation.navigate('KarikaturScreen');
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#006c9b" style={{ marginVertical: 20 }} />;
  }

  if (!karikatur) return null;

  return (
    <View style={styles.container}>
      <Text style={[styles.header, { color: isDarkMode ? '#fff' : '#fff' }]}>Karikatür</Text>
      <TouchableOpacity onPress={handlePress}>
        <Image source={{ uri: karikatur.image }} style={styles.image} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    backgroundColor: '#ff0000',
    padding: 10,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
    borderRadius: 10,
  },
});

export default KarikaturPreview;
