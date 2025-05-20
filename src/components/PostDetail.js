import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Image,
  useWindowDimensions,
} from 'react-native';
import axios from 'axios';
import RenderHtml from 'react-native-render-html';
import Header from '../components/Header';
import { decode } from 'html-entities';

const PostDetail = ({ route }) => {
  const { postId, writerLink } = route.params;
  const { width } = useWindowDimensions();

  const [postDetail, setPostDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!postId) {
      setError('Geçersiz postId!');
      setLoading(false);
      return;
    }

    const fetchPostDetail = async () => {
      try {
        const response = await axios.get(
          `https://yeniyasamgazetesi9.com/wp-json/wp/v2/posts/${postId}?_embed`
        );
        const post = response.data;

        const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;

        setPostDetail({ ...post, imageUrl });
      } catch (err) {
        console.error('Hata:', err.message);
        setError('Detaylar yüklenemedi.');
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetail();
  }, [postId]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#006c9b" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {postDetail?.imageUrl && (
          <Image source={{ uri: postDetail.imageUrl }} style={styles.image} />
        )}
        

        <Text style={styles.title}>{decode(postDetail?.title?.rendered || '')}</Text>

        <RenderHtml
          contentWidth={width}
          source={{ html: postDetail?.content?.rendered || '' }}
          tagsStyles={{
            p: { fontSize: 16, lineHeight: 24, color: '#000', marginBottom: 12 },
            img: { marginVertical: 15, maxWidth: '100%' },
          }}
          renderersProps={{
            img: {
              enableExperimentalPercentWidth: true,
            },
          }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 60,
    flexGrow: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 6,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default PostDetail;
