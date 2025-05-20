import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, FlatList, useWindowDimensions } from 'react-native';
import axios from 'axios';
import { decode } from 'html-entities';
import { useTheme } from '../context/ThemeProvider';
import Footer from '../components/Footer';
import MainLayout from '../components/MainLayout';


const SingleNewsScreen = ({ route }) => {
  const { postId } = route.params;
  const { theme } = useTheme();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { width } = useWindowDimensions();

  const fetchPostDetail = async () => {
    try {
      const response = await axios.get(
        `https://yeniyasamgazetesi9.com/wp-json/wp/v2/posts/${postId}`
      );
      const post = response.data;
      if (post.featured_media) {
        try {
          const mediaResponse = await axios.get(
            `https://yeniyasamgazetesi9.com/wp-json/wp/v2/media/${post.featured_media}`
          );
          post.featured_media_url = mediaResponse.data.source_url;
        } catch (err) {
          post.featured_media_url = null;
        }
      }
      setPost(post);
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
    return <ActivityIndicator size="large" style={styles.loader} />;
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
            {decode(item.content.rendered.replace(/<\/?[^>]+(>|$)/g, ""))}
          </Text>
          <View style={{ width, alignSelf: 'center', marginTop: 50 }}>
          <Footer />
        </View>
        </View>
        
        
      )}
    />
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  date: {
    fontSize: 14,
    marginBottom: 10,
  },
  body: {
    fontSize: 16,
  },
  errorContainer: {
    backgroundColor: '#ffe5e5',
    padding: 10,
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
  },
});

export default SingleNewsScreen;
