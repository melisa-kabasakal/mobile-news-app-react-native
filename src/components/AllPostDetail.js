import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  useWindowDimensions,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import he from 'he';
import MainLayout from '../components/MainLayout';
import Footer from './Footer';
import RenderHtml from 'react-native-render-html';
import { useTheme } from '../context/ThemeProvider';

const AllPostDetail = ({ route }) => {
  const { isDarkMode } = useTheme();
  const { width } = useWindowDimensions();

  const { post: passedPost, postId } = route.params || {};
  const [post, setPost] = useState(passedPost || null);
  const [loading, setLoading] = useState(!passedPost);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (passedPost || !postId) return;

    axios
      .get(`https://yeniyasamgazetesi9.com/wp-json/wp/v2/posts/${postId}?_embed`, {
        timeout: 5000,
      })
      .then((res) => setPost(res.data))
      .catch((err) => {
        console.error('Yazı detay alınamadı:', err.message);
        setError('İçerik yüklenemedi.');
      })
      .finally(() => setLoading(false));
  }, [postId, passedPost]);

  if (loading) {
    return (
      <MainLayout>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#006c9b" />
        </View>
      </MainLayout>
    );
  }

  if (error || !post) {
    return (
      <MainLayout>
        <View style={styles.loaderContainer}>
          <RenderHtml
            contentWidth={width}
            source={{ html: `<p style="color:red">${error || 'Hata oluştu.'}</p>` }}
          />
        </View>
      </MainLayout>
    );
  }

  const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  const title = he.decode(post.title.rendered);
  const htmlContent = post.content.rendered;

  return (
    <MainLayout>
      <ScrollView
  contentContainerStyle={[
    styles.scrollContent,
    { backgroundColor: isDarkMode ? '#000' : '#fff', flexGrow: 1 },
  ]}
  keyboardShouldPersistTaps="handled"
  showsVerticalScrollIndicator={false}
>

        {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}

        <RenderHtml
          contentWidth={width}
          source={{ html: `<h1>${title}</h1>${htmlContent}` }}
          baseStyle={{
            color: isDarkMode ? '#fff' : '#000',
            fontSize: 16,
            lineHeight: 24,
          }}
          tagsStyles={{
            h1: {
              fontSize: 24,
              fontWeight: 'bold',
              marginBottom: 16,
              color: isDarkMode ? '#fff' : '#000',
            },
            h2: {
              fontSize: 20,
              fontWeight: 'bold',
              marginTop: 20,
              marginBottom: 10,
              color: isDarkMode ? '#fff' : '#000',
            },
            h3: {
              fontSize: 18,
              fontWeight: 'bold',
              marginTop: 16,
              marginBottom: 8,
              color: isDarkMode ? '#fff' : '#000',
            },
            strong: {
              fontWeight: 'bold',
              color: isDarkMode ? '#fff' : '#000',
            },
            b: {
              fontWeight: 'bold',
              color: isDarkMode ? '#fff' : '#000',
            },
            p: {
              marginBottom: 10,
              color: isDarkMode ? '#ddd' : '#444',
            },
          }}
        />

        <View style={{ width, alignSelf: 'center', marginTop: 40 }}>
          <Footer />
        </View>
      </ScrollView>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: 16,
    paddingBottom: 80,
    flexGrow: 1,
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 10,
    marginBottom: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default AllPostDetail;
