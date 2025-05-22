import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  useWindowDimensions,
} from 'react-native';
import axios from 'axios';
import { useTheme } from '../context/ThemeProvider';
import MainLayout from '../components/MainLayout';
import Footer from '../components/Footer';
import RenderHtml from 'react-native-render-html';
import { decode } from 'html-entities';
import { getRenderHtmlStyles } from '../utils/renderHtmlStyles';

const NewsDetail = ({ route }) => {
  const { postId } = route.params;
  const { theme, isDarkMode } = useTheme();
  const { width } = useWindowDimensions();

  const [newsDetail, setNewsDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const response = await axios.get(
          `https://yeniyasamgazetesi9.com/wp-json/wp/v2/posts/${postId}?_embed`
        );
        const data = response.data;

        const title = data.title?.rendered || 'Başlık Bulunamadı';
        const content = data.content?.rendered || 'İçerik Bulunamadı';
        const image = data._embedded?.['wp:featuredmedia']?.[0]?.source_url
          || 'https://via.placeholder.com/300x180.png?text=No+Image';

        setNewsDetail({ title, content, image });
      } catch (err) {
        setError('Haber detayları yüklenemedi.');
      } finally {
        setLoading(false);
      }
    };

    fetchNewsDetail();
  }, [postId]);

  if (loading) {
    return (
      <MainLayout>
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={theme.text} />
        </View>
      </MainLayout>
    );
  }

  if (error || !newsDetail) {
    return (
      <MainLayout>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Image source={{ uri: newsDetail.image }} style={styles.image} />

        <Text style={[styles.title, { color: theme.text }]}>
          {decode(newsDetail.title)}
        </Text>

        <RenderHtml
          contentWidth={width}
          source={{ html: newsDetail.content }}
          tagsStyles={getRenderHtmlStyles(isDarkMode)}
          renderersProps={{ img: { enableExperimentalPercentWidth: true } }}
        />

        <View style={{ width, alignSelf: 'center', marginTop: 50 }}>
          <Footer />
        </View>
      </ScrollView>
    </MainLayout>
  );
};

export default NewsDetail;

const styles = StyleSheet.create({
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
    flexGrow: 1,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
    marginBottom: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});
