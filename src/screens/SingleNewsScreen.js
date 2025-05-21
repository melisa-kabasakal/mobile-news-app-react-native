import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  FlatList,
  useWindowDimensions,
} from 'react-native';
import axios from 'axios';
import { decode } from 'html-entities';
import { useTheme } from '../context/ThemeProvider';
import Footer from '../components/Footer';
import MainLayout from '../components/MainLayout';

const SingleNewsScreen = ({ route }) => {
  const { postId } = route.params;
  const { theme } = useTheme();
  const { width } = useWindowDimensions();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPostDetail = async () => {
    try {
      const response = await axios.get(
        `https://yeniyasamgazetesi9.com/wp-json/wp/v2/posts/${postId}?_embed`
      );
      const data = response.data;

      const image =
        data._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
        'https://via.placeholder.com/300x180.png?text=No+Image';

      const formatted = {
        ...data,
        featured_media_url: image,
      };

      setPost(formatted);
    } catch (err) {
      setError('Haber detayları alınırken bir hata oluştu.');
      setTimeout(() => setError(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPostDetail();
  }, [postId]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#006c9b" />
      </View>
    );
  }

  return (
    <MainLayout>
      <FlatList
        data={post ? [post] : []}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.container, { backgroundColor: theme.background }]}>
            {error && (
              <View style={styles.errorContainer}>
                <Text style={[styles.errorText, { color: theme.text }]}>{error}</Text>
              </View>
            )}
            {item.featured_media_url && (
              <Image source={{ uri: item.featured_media_url }} style={styles.image} />
            )}
            <Text style={[styles.title, { color: theme.text }]}>{decode(item.title.rendered)}</Text>
            <Text style={[styles.date, { color: theme.secondaryText }]}>
              {new Date(item.date).toLocaleDateString()}
            </Text>
            <Text style={[styles.body, { color: theme.text }]}>
              {decode(item.content.rendered.replace(/<\/?[^>]+(>|$)/g, ''))}
            </Text>
            <View style={{ width, alignSelf: 'center', marginTop: 50 }}>
              <Footer />
            </View>
          </View>
        )}
        contentContainerStyle={{ padding: 12 }}
        style={{ flex: 1 }}
      />
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 8,
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    marginBottom: 10,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  errorContainer: {
    backgroundColor: '#ffe5e5',
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  errorText: {
    fontSize: 16,
  },
});

export default SingleNewsScreen;
