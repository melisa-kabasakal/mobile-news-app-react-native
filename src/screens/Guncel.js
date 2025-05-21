import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import he from 'he';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeProvider';
import MainLayout from '../components/MainLayout';
import Footer from '../components/Footer';

const Guncel = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const { isDarkMode } = useTheme();
  const navigation = useNavigation();

  const fetchPosts = async (pageNumber = 1) => {
    try {
      const response = await axios.get(
        `https://yeniyasamgazetesi9.com/wp-json/wp/v2/posts?categories=49&_embed&page=${pageNumber}`,
        {
          headers: {
            'User-Agent': 'Mozilla/5.0',
            'Accept': 'application/json',
          },
        }
      );

      const newPosts = response.data;

      if (pageNumber === 1) {
        setPosts(newPosts);
      } else {
        setPosts((prev) => [...prev, ...newPosts]);
      }

      setHasMore(newPosts.length > 0);
    } catch (error) {
      console.error('Güncel verisi alınamadı:', error);
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLoadMore = () => {
    if (!isLoadingMore && hasMore) {
      setIsLoadingMore(true);
      const nextPage = page + 1;
      setPage(nextPage);
      fetchPosts(nextPage);
    }
  };

  const renderItem = ({ item }) => {
    const imageUrl = item._embedded?.['wp:featuredmedia']?.[0]?.source_url;
    const title = he.decode(item.title.rendered);
    const excerpt = he.decode(item.excerpt.rendered.replace(/<[^>]+>/g, ''));

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('AllPostDetail', { post: item })}
        style={[
          styles.card,
          {
            backgroundColor: isDarkMode ? '#1a1a1a' : '#fff',
            borderColor: isDarkMode ? '#333' : '#ddd',
          },
        ]}
      >
        {imageUrl && (
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
        )}
        <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#333' }]}> 
          {title}
        </Text>
        <Text
          style={[styles.excerpt, { color: isDarkMode ? '#ccc' : '#666' }]}
        >
          {excerpt}
        </Text>
      </TouchableOpacity>
    );
  };

  if (loading && page === 1) {
    return (
      <MainLayout>
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#006c9b" />
        </View>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={[
          styles.container,
          { backgroundColor: isDarkMode ? '#000' : '#f9f9f9' },
        ]}
        renderItem={renderItem}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.7}
        ListFooterComponent={
          <>
            {isLoadingMore && (
              <View style={{ paddingVertical: 20 }}>
                <ActivityIndicator color="#aaa" />
              </View>
            )}
            <Footer />
          </>
        }
      />
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 16,
  },
  card: {
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    borderWidth: 1,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  excerpt: {
    fontSize: 14,
  },
});

export default Guncel;
