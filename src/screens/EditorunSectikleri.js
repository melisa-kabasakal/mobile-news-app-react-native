import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, ActivityIndicator, StyleSheet, Image, TouchableOpacity
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeProvider';
import he from 'he';
import MainLayout from '../components/MainLayout';
import Footer from '../components/Footer';

const EditorunSectikleri = () => {
  const { isDarkMode } = useTheme();
  const navigation = useNavigation();
  const categoryId = 17826; // Editörün Seçtikleri

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = async (pageNumber = 1) => {
    try {
      const response = await axios.get(
        `https://yeniyasamgazetesi9.com/wp-json/wp/v2/posts?categories=${categoryId}&_embed&page=${pageNumber}&per_page=10`
      );

      if (!response.data || response.data.length === 0) {
        setHasMore(false);
        return;
      }

      const newData = response.data.map((post) => ({
        id: post.id,
        title: he.decode(post.title.rendered),
        excerpt: he.decode(post.excerpt.rendered.replace(/<[^>]+>/g, '')),
        image:
          post._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
          'https://via.placeholder.com/300x180.png?text=No+Image',
        fullPost: post,
      }));

      if (pageNumber === 1) {
        setPosts(newData);
      } else {
        setPosts((prev) => [...prev, ...newData]);
      }

      setHasMore(newData.length > 0);
    } catch (err) {
      console.error('Editörün Seçtikleri yüklenemedi:', err);
      setHasMore(false);

      if (err.response?.status === 400) {
        console.log('[DEV] Editörün Seçtikleri: İçerik kalmamış olabilir (400)');
      } else if (err.response?.status === 503) {
        alert('Sunucu meşgul (503). Lütfen daha sonra tekrar deneyin.');
      }
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchPosts(1);
  }, []);

  const handleLoadMore = () => {
    if (!isLoadingMore && !loading && hasMore) {
      const nextPage = page + 1;
      setIsLoadingMore(true);
      setPage(nextPage);
      fetchPosts(nextPage);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('AllPostDetail', { post: item.fullPost })}
      style={[
        styles.card,
        {
          backgroundColor: isDarkMode ? '#111' : '#fff',
          borderColor: isDarkMode ? '#333' : '#ddd',
        },
      ]}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#000' }]}>{item.title}</Text>
      <Text style={[styles.excerpt, { color: isDarkMode ? '#ccc' : '#444' }]}>{item.excerpt}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <MainLayout>
        <View style={styles.loader}><ActivityIndicator size="large" color="#006c9b" /></View>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={[
          styles.container,
          { backgroundColor: isDarkMode ? '#000' : '#fff' },
        ]}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.7}
        ListFooterComponent={
          <>
            {isLoadingMore && <ActivityIndicator style={{ padding: 20 }} color="#aaa" />}
            <Footer />
          </>
        }
      />
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 16,
  },
  card: {
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
  },
  image: {
    width: '100%',
    height: 180,
    marginBottom: 10,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  excerpt: {
    fontSize: 14,
  },
});

export default EditorunSectikleri;
