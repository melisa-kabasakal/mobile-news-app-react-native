import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
  useWindowDimensions,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '../context/ThemeProvider';
import axios from 'axios';

const JinDergiPreview = () => {
  const { isDarkMode } = useTheme();
  const { width } = useWindowDimensions();

  const [imageUrl, setImageUrl] = useState(null);
  const [link, setLink] = useState('https://jindergi.com');
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('https://69a5-88-253-133-120.ngrok-free.app/jin-dergi')
      .then((res) => {
        setImageUrl(res.data.image);
        setLink(res.data.link);
        setCaption(res.data.caption);
      })
      .catch((err) => {
        console.warn('JIN Dergi verisi alınamadı:', err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  const handlePress = () => {
    if (link) Linking.openURL(link);
  };

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginVertical: 20 }} />;
  }

  if (!imageUrl) {
    return null;
  }

  return (
    <View style={styles.wrapper}>
      <Text style={[styles.header, { backgroundColor: '#d71920', color: '#fff' }]}>
        JIN Dergi
      </Text>

      <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
        <Image
  source={{ uri: imageUrl }}
  style={[
    styles.image,
    {
      width: width - 32,
      height: ((width - 32) * 1600) / 1130,
    },
  ]}
  resizeMode="cover"
/>

      </TouchableOpacity>

      <Text style={[styles.caption, { color: isDarkMode ? '#aaa' : '#333' }]}>
        {caption || 'Dergiye gitmek için görsele tıklayın'}
      </Text>
    </View>
  );
};

export default JinDergiPreview;

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 30,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    padding: 10,
    marginBottom: 15,
  },
  image: {
    height: 600,
   
    alignSelf: 'center',
  },
  caption: {
    marginTop: 10,
    fontSize: 14,
    textAlign: 'center',
  },
});
