import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { useTheme } from '../context/ThemeProvider';
import he from 'he';
import MainLayout from '../components/MainLayout';
import Footer from '../components/Footer';
import { useNavigation } from '@react-navigation/native';

const Soylesi = () => {
  const { isDarkMode } = useTheme();
  const navigation = useNavigation();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const LOCAL_IP = 'https://69a5-88-253-133-120.ngrok-free.app';


  const fetchPosts = async (pageNumber = 1) => {
    try {
      const response = await axios.get(
        `https://yeniyasamgazetesi9.com/wp-json/wp/v2/posts?categories=58&_embed&page=${pageNumber}`
      );

      const newData = response.data.map((post) => {
        const rawImage =
          post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';

        const isValidImage = rawImage.includes('yeniyasamgazetesi9.com/wp-content/uploads/');
        const image = isValidImage
          ? `${LOCAL_IP}/proxy-image?url=${encodeURIComponent(rawImage)}`
          : 'https://via.placeholder.com/300x180.png?text=No+Image';

        return {
          id: post.id,
          title: he.decode(post.title.rendered),
          excerpt: he.decode(post.excerpt.rendered.replace(/<[^>]+>/g, '')),
          image,
          fullPost: post,
        };
      });

      if (pageNumber === 1) {
        setPosts(newData);
      } else {
        setPosts((prev) => [...prev, ...newData]);
      }

      setHasMore(newData.length > 0);
    } catch (error) {
      if (
        error.response?.status === 404 ||
        error.response?.status === 408 ||
        error.response?.status === 204
      ) {
        console.log('Söyleşi verisi eksik ama sayfa sorunsuz yüklendi.');
      } else {
        console.error('Söyleşi verisi ciddi hata:', error.message);
      }
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

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('AllPostDetail', { post: item.fullPost })}
      style={[
        styles.postItem,
        {
          backgroundColor: isDarkMode ? '#111' : '#fff',
          borderColor: isDarkMode ? '#333' : '#ddd',
        },
      ]}
    >
      <Image style={styles.postImage} source={{ uri: item.image }} />
      <Text style={[styles.postTitle, { color: isDarkMode ? '#fff' : '#000' }]}>
        {item.title}
      </Text>
      <Text style={[styles.postExcerpt, { color: isDarkMode ? '#ccc' : '#444' }]}>
        {item.excerpt}
      </Text>
    </TouchableOpacity>
  );

  if (loading && page === 1) {
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
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={[
          styles.container,
          { backgroundColor: isDarkMode ? '#000' : '#fff' },
        ]}
        style={{ flex: 1 }}
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
  postItem: {
    marginBottom: 24,
    borderRadius: 8,
    borderWidth: 1,
    padding: 12,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  postExcerpt: {
    fontSize: 14,
  },
  postImage: {
    width: '100%',
    height: 200,
    marginBottom: 8,
    borderRadius: 8,
  },
});

export default Soylesi;
