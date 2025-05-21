import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import axios from 'axios';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeProvider';
import he from 'he';

const WriterPosts = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { theme, isDarkMode } = useTheme();

  const { categoryId, writerName } = route.params || {};

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    if (!categoryId) {
      setError('Yazar kategorisi eksik.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `https://yeniyasamgazetesi9.com/wp-json/wp/v2/posts?categories=${categoryId}&_embed`
      );
      setPosts(response.data);
    } catch (err) {
      setError('Yazılar alınırken bir hata oluştu.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [categoryId]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchPosts();
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.item,
        { backgroundColor: isDarkMode ? '#111' : '#f4f4f4' },
      ]}
      onPress={() => navigation.navigate('AllPostDetail', { post: item })}
    >
      <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#000' }]}>
        {he.decode(item.title.rendered)}
      </Text>
    </TouchableOpacity>
  );

  if (loading && !refreshing) {
    return <ActivityIndicator size="large" style={styles.loader} color="#006c9b" />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.header, { color: isDarkMode ? '#fff' : '#000' }]}>
        {writerName || 'Yazar'} Yazıları
      </Text>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={isDarkMode ? '#fff' : '#000'}
          />
        }
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', color: isDarkMode ? '#999' : '#444' }}>
            Henüz içerik bulunmamaktadır.
          </Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  list: {
    gap: 12,
    paddingBottom: 40,
  },
  item: {
    padding: 12,
    borderRadius: 8,
  },
  title: {
    fontSize: 15,
    fontWeight: '500',
  },
});

export default WriterPosts;
