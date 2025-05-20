import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import axios from 'axios';
import MainLayout from '../components/MainLayout';

const WritersScreen = ({ navigation }) => {
  const [writers, setWriters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWriters = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://192.168.1.100:3001/writers');
        setWriters(response.data);
      } catch (err) {
        setError('Yazarlar yüklenemedi');
      } finally {
        setLoading(false);
      }
    };

    fetchWriters();
  }, []);

  const handleWriterPress = (writerLink) => {
    setLoading(true);
    setTimeout(() => {
      navigation.navigate('WriterArticles', { writerLink });
      setLoading(false);
    }, 1000);
  };

  if (loading) {
    return (
      <MainLayout>
        <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 40 }} />
      </MainLayout>
    );
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

  return (
    <MainLayout>
      <FlatList
        data={writers}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        contentContainerStyle={styles.container}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => handleWriterPress(item.link)}
          >
            <Image source={{ uri: item.avatar }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </MainLayout>
  );
};

export default WritersScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    width: '30%',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
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
