import React, { useState, useEffect, useMemo } from 'react';
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
import { decode } from 'html-entities';
import { useTheme } from '../context/ThemeProvider';
import MainLayout from '../components/MainLayout';
import Footer from '../components/Footer';
import { getRenderHtmlStyles } from '../utils/renderHtmlStyles';

const PostDetail = ({ route }) => {
  const { postId } = route.params;
  const { width } = useWindowDimensions();
  const { isDarkMode } = useTheme();

  const [postDetail, setPostDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!postId) {
      setError('Geçersiz içerik ID’si.');
      setLoading(false);
      return;
    }

    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `https://yeniyasamgazetesi9.com/wp-json/wp/v2/posts/${postId}?_embed`
        );
        const post = response.data;

        const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
        setPostDetail({ ...post, imageUrl });
      } catch (err) {
        setError('İçerik yüklenemedi.');
        console.error('PostDetail hatası:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const renderedHtml = useMemo(() => {
    return (
      <RenderHtml
        contentWidth={width}
        source={{ html: postDetail?.content?.rendered || '' }}
        tagsStyles={getRenderHtmlStyles(isDarkMode)}
        renderersProps={{
          img: {
            enableExperimentalPercentWidth: true,
          },
        }}
      />
    );
  }, [postDetail, width, isDarkMode]);

  if (loading) {
    return (
      <MainLayout>
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#006c9b" />
        </View>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <View style={styles.center}>
          <Text style={[styles.errorText, { color: isDarkMode ? 'red' : '#c00' }]}>
            {error}
          </Text>
        </View>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { backgroundColor: isDarkMode ? '#000' : '#fff' },
        ]}
      >
        {postDetail?.imageUrl && (
          <Image
            source={{ uri: postDetail.imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
        )}

        <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#000' }]}>
          {decode(postDetail?.title?.rendered || '')}
        </Text>

        {renderedHtml}

        <View style={{ marginTop: 40 }}>
          <Footer />
        </View>
      </ScrollView>
    </MainLayout>
  );
};

export default PostDetail;

const styles = StyleSheet.create({
  scrollContent: {
    padding: 16,
    paddingBottom: 80,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
