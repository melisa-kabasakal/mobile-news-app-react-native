import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import he from 'he';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeProvider';

const screenWidth = Dimensions.get('window').width;

const SoylesiPreview = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useTheme();
  const navigation = useNavigation();

  useEffect(() => {
    const fetchSoylesi = async () => {
      try {
        const response = await axios.get(
          'https://yeniyasamgazetesi9.com/wp-json/wp/v2/posts?categories=58&_embed&per_page=4'
        );
        const data = response.data.map((post) => ({
          id: post.id,
          title: he.decode(post.title.rendered),
          image:
            post._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
            'https://via.placeholder.com/300x180.png?text=No+Image',
          fullPost: post,
        }));
        setPosts(data);
      } catch (error) {
        if (__DEV__) {
          console.log('Söyleşi preview uyarı:', error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSoylesi();
  }, []);

  const handlePress = (post) => {
    navigation.navigate('AllPostDetail', { post });
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#006c9b" style={{ marginVertical: 20 }} />;
  }

  return (
    <View>
      <Text style={[styles.headerText, { color: isDarkMode ? '#fff' : '#fff' }]}>
        Söyleşi
      </Text>
      <View style={styles.gridContainer}>
        {posts.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.card, { backgroundColor: isDarkMode ? '#111' : '#fff' }]}
            onPress={() => handlePress(item.fullPost)}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#000' }]}>
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
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
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  card: {
    width: screenWidth / 2 - 20,
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 120,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 6,
  },
});

export default SoylesiPreview;
