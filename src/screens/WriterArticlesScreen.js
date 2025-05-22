import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import RenderHtml from 'react-native-render-html';
import { useTheme } from '../context/ThemeProvider';
import { decode } from 'html-entities';
import MainLayout from '../components/MainLayout';
import Footer from '../components/Footer';

const WriterArticlesScreen = ({ route, navigation }) => {
  const { writerLink, writerId } = route?.params ?? {};
  const { isDarkMode } = useTheme();
  const { width } = useWindowDimensions();

  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(999);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const fetchArticles = async (page) => {
    try {
      let url = '';

      if (writerId) {
        url = `https://yeniyasamgazetesi9.com/wp-json/wp/v2/posts?author=${writerId}&page=${page}&_embed`;
      } else if (writerLink) {
        url = `${writerLink}&page=${page}&_embed`;
      } else {
        throw new Error('writerId veya writerLink bulunamadı');
      }

      const response = await fetch(url);
      if (!response.ok) throw new Error('API hatası');

      const data = await response.json();

      const totalPagesHeader = response.headers.get('X-WP-TotalPages');
      if (totalPagesHeader) {
        setTotalPages(parseInt(totalPagesHeader));
      }

      const enhanced = data.map((article) => ({
        ...article,
        imageUrl: article._embedded?.['wp:featuredmedia']?.[0]?.source_url ?? null,
      }));

      setArticles((prev) => [...prev, ...enhanced]);
    } catch (err) {
      console.error(err);
      setError('Yazılar yüklenemedi.');
    } finally {
      setLoading(false);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (writerId || writerLink) {
      fetchArticles(currentPage);
    }
  }, [writerId, writerLink, currentPage]);

  const handleLoadMore = () => {
    if (!isFetching && currentPage < totalPages) {
      setIsFetching(true);
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePress = (articleId) => {
    navigation.navigate('ArticleDetailScreen', { articleId });
  };

  if (loading && currentPage === 1) {
    return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
  }

  if (error) {
    return (
      <MainLayout>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </MainLayout>
    );
  }

  const renderItem = ({ item }) => (
    <View style={[styles.card, { backgroundColor: isDarkMode ? '#222' : '#f0f0f0' }]}>
      {item.imageUrl && <Image source={{ uri: item.imageUrl }} style={styles.image} />}
      <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#000' }]}>
        {decode(item.title.rendered)}
      </Text>
      <RenderHtml
        contentWidth={width}
        source={{ html: item.excerpt.rendered }}
        tagsStyles={{
          p: {
            fontSize: 14,
            color: isDarkMode ? '#ddd' : '#333',
          },
        }}
      />
      <TouchableOpacity onPress={() => handlePress(item.id)}>
        <Text style={styles.readMore}>Yazının Tamamı</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <MainLayout>
      <FlatList
        data={articles}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        renderItem={renderItem}
        ListFooterComponent={
          <>
            {isFetching && (
              <ActivityIndicator size="large" style={{ marginVertical: 20 }} />
            )}
            <Footer />
          </>
        }
        initialNumToRender={6}
        windowSize={10}
        maxToRenderPerBatch={8}
        updateCellsBatchingPeriod={50}
        removeClippedSubviews={false}
      />
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    padding: 12,
    borderRadius: 6,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderRadius: 4,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
  },
  readMore: {
    color: '#007bff',
    marginTop: 8,
    fontSize: 14,
  },
  errorContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default WriterArticlesScreen;
