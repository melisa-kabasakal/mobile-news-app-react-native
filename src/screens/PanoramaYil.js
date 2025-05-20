import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from '../context/ThemeProvider';
import he from 'he';
import MainLayout from '../components/MainLayout';
import Footer from '../components/Footer';

// Performanslı kart
const PostCard = React.memo(({ item, isDarkMode, navigation }) => (
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
    <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
    <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#000' }]}>{item.title}</Text>
    <Text style={[styles.excerpt, { color: isDarkMode ? '#ccc' : '#444' }]}>{item.excerpt}</Text>
  </TouchableOpacity>
));

const PanoramaYil = () => {
  const { isDarkMode } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { categoryId, title } = route.params;
  const { width } = useWindowDimensions();

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

      const newData = response.data.map((post) => ({
        id: post.id,
        title: he.decode(post.title.rendered),
        excerpt: he.decode(post.excerpt.rendered.replace(/<[^>]+>/g, '')),
        image:
          post._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
          'https://via.placeholder.com/300x180.png?text=No+Image',
        fullPost: post,
      }));

      if (pageNumber === 1) setPosts(newData);
      else setPosts((prev) => [...prev, ...newData]);

      if (!response.data || response.data.length === 0) {
        setHasMore(false);
      }
    } catch (err) {
      console.error(`Panorama ${title} yüklenemedi:`, err);

      if (err.response?.status === 400 || err.response?.status === 503) {
        setHasMore(false); // sayfa sonu olabilir
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
    if (!isLoadingMore && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      setIsLoadingMore(true);
      fetchPosts(nextPage);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#006c9b" />
        </View>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <PostCard item={item} isDarkMode={isDarkMode} navigation={navigation} />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={[
          styles.container,
          { backgroundColor: isDarkMode ? '#000' : '#fff' },
        ]}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.7}
        ListFooterComponent={
          <>
            {isLoadingMore && (
              <View style={{ padding: 20 }}>
                <ActivityIndicator color="#aaa" />
              </View>
            )}
            <Footer />
          </>
        }
        initialNumToRender={6}
        windowSize={10}
        maxToRenderPerBatch={8}
        updateCellsBatchingPeriod={50}
        removeClippedSubviews={true}
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
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  excerpt: {
    fontSize: 14,
  },
});

export default PanoramaYil;
