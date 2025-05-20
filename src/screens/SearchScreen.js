import React from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSearch } from '../context/SearchContext';
import SearchBar from '../components/SearchBar';
import { useTheme } from '../context/ThemeProvider';
import { decode } from 'html-entities';
import MainLayout from '../components/MainLayout';
import { useNavigation } from '@react-navigation/native';

const SearchScreen = () => {
  const { results, loading, searchQuery } = useSearch();
  const { theme } = useTheme();
  const navigation = useNavigation();

  return (
    <MainLayout>
      <ScrollView
        style={{ backgroundColor: theme.background }}
        contentContainerStyle={{ padding: 10, paddingBottom: 80 }}
        keyboardShouldPersistTaps="handled"
      >
        <SearchBar />

        {loading && <ActivityIndicator color={theme.text} style={{ marginTop: 20 }} />}

        {!loading && searchQuery.length > 0 && (
          <>
            {/* HABERLER */}
            {Array.isArray(results.posts) && results.posts.length > 0 && (
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: theme.text }]}>Haberler</Text>
                {results.posts.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => navigation.navigate('SingleNews', { postId: item.id })}
                    style={styles.item}
                  >
                    <Text style={{ color: theme.text }}>{decode(item.title.rendered)}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* YAZARLAR */}
            {Array.isArray(results.writers) && results.writers.length > 0 && (
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: theme.text }]}>Yazarlar</Text>
                {results.writers.map((writer) => (
                  <TouchableOpacity key={writer.name} style={styles.item}>
                    <Text style={{ color: theme.text }}>{writer.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* VİDEOLAR */}
            {Array.isArray(results.videos) && results.videos.length > 0 && (
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: theme.text }]}>Videolar</Text>
                {results.videos.map((video) => (
                  <TouchableOpacity
                    key={video.youtubeId}
                    onPress={() =>
                      navigation.navigate('VideoDetail', { youtubeId: video.youtubeId })
                    }
                    style={styles.item}
                  >
                    <Text style={{ color: theme.text }}>{video.title}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* HİÇBİR ŞEY BULUNAMADI */}
            {results.posts.length === 0 &&
              results.videos.length === 0 &&
              results.writers.length === 0 && (
                <Text style={[styles.noResults, { color: theme.text }]}>
                  Sonuç bulunamadı
                </Text>
              )}
          </>
        )}
      </ScrollView>
    </MainLayout>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  noResults: {
    textAlign: 'center',
    marginTop: 20,
  },
});
