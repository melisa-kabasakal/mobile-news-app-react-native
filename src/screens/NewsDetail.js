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

const NewsDetail = ({ route }) => {
  const { postId } = route.params;
  const { theme } = useTheme();

  const [newsDetail, setNewsDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { width } = useWindowDimensions();


  const cleanText = (html) => {
    let text = html.replace(/<[^>]*>/g, '');

    const entities = {
      '&#8220;': '"', '&#8221;': '"', '&#8216;': "'", '&#8217;': "'",
      '&#8230;': '…', '&nbsp;': ' ', '&amp;': '&', '&quot;': '"',
      '&lt;': '<', '&gt;': '>', '&#039;': "'", '&#8211;': '–',
      '&#8212;': '—', '&#8242;': "'", '&#8243;': '"', '&#160;': ' '
    };

    for (const entity in entities) {
      const regex = new RegExp(entity, 'g');
      text = text.replace(regex, entities[entity]);
    }
    text = text.replace(/#[0-9]{1,4}/g, '');

    return text.trim();
  };

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const response = await axios.get(`https://yeniyasamgazetesi9.com/wp-json/wp/v2/posts/${postId}?_embed`);
        const data = response.data;

        const title = data.title?.rendered || 'Başlık Bulunamadı';
        const content = data.content?.rendered || 'İçerik Bulunamadı';
        const image = data._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://via.placeholder.com/300x180.png?text=No+Image';

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
        <ActivityIndicator size="large" color={theme.text} style={styles.loader} />
      </MainLayout>
    );
  }

  if (error || !newsDetail) {
    return (
      <MainLayout>
        <Text style={styles.errorText}>Haber detayları yüklenemedi.</Text>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image source={{ uri: newsDetail.image }} style={styles.image} />
        <Text style={[styles.title, { color: theme.text }]}>
          {cleanText(newsDetail.title)}
        </Text>
        <Text style={[styles.content, { color: theme.text }]}>
          {cleanText(newsDetail.content)}
        </Text>
        <View style={{ width, alignSelf: 'center', marginTop: 50 }}>
          <Footer />
        </View>
      </ScrollView>
    </MainLayout>
  );
};

export default NewsDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 15,
    paddingBottom: 60,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
    alignSelf: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    paddingLeft: 5,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'red',
  },
});
