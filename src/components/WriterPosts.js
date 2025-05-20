import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
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
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!categoryId) {
      setError('Yazar kategorisi eksik.');
      setLoading(false);
      return;
    }

    axios
      .get(`https://yeniyasamgazetesi9.com/wp-json/wp/v2/posts?categories=${categoryId}&_embed`)
      .then((res) => {
        setPosts(res.data);
      })
      .catch(() => {
        setError('Yazılar alınırken bir hata oluştu.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [categoryId]);

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

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
