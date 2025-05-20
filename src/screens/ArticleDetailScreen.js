import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
  useWindowDimensions,
} from 'react-native';
import axios from 'axios';
import RenderHtml from 'react-native-render-html';
import { useTheme } from '../context/ThemeProvider';
import MainLayout from '../components/MainLayout';
import Footer from '../components/Footer';
import { decode } from 'he';

const ArticleDetailScreen = ({ route }) => {
  const { articleId } = route.params;
  const { width } = useWindowDimensions();
  const { isDarkMode } = useTheme();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(
          `https://yeniyasamgazetesi9.com/wp-json/wp/v2/posts/${articleId}?_embed`
        );
        const articleData = response.data;
        articleData.imageUrl =
          articleData._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
        setArticle(articleData);
      } catch (err) {
        setError('Detaylar yüklenemedi');
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [articleId]);

  const renderedContent = useMemo(() => {
    if (!article?.content?.rendered) return null;
    return (
      <RenderHtml
        contentWidth={width}
        source={{ html: article.content.rendered }}
        tagsStyles={{
          p: {
            fontSize: 16,
            lineHeight: 24,
            color: isDarkMode ? '#fff' : '#000',
            marginBottom: 12,
          },
          h1: {
            fontSize: 22,
            fontWeight: 'bold',
            color: isDarkMode ? '#fff' : '#000',
            marginBottom: 12,
          },
          img: {
            marginVertical: 15,
            width: '100%',
            height: 'auto',
          },
        }}
        renderersProps={{
          img: {
            enableExperimentalPercentWidth: true,
          },
        }}
      />
    );
  }, [article?.content?.rendered, isDarkMode, width]);

  if (loading) {
    return (
      <MainLayout>
        <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 40 }} />
        <Footer />
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
        <Footer />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {article?.imageUrl && (
          <Image source={{ uri: article.imageUrl }} style={styles.image} />
        )}
        <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#000' }]}>
          {decode(article?.title?.rendered || '')}
        </Text>
        {renderedContent}
        <View style={{ width, alignSelf: 'center', marginTop: 50 }}>
          <Footer />
        </View>
      </ScrollView>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 15,
    paddingBottom: 50,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 10,
  },
  errorContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
  },
});

export default ArticleDetailScreen;
