import React from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
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
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={{ flex: 1, backgroundColor: theme.background }}
          contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
          keyboardShouldPersistTaps="handled"
        >
          <SearchBar />

          {loading && (
            <ActivityIndicator color={theme.text} size="large" style={{ marginTop: 20 }} />
          )}

          {!loading && searchQuery.length > 0 && (
            <>
              {/* HABERLER */}
              {Array.isArray(results.posts) && results.posts.length > 0 && (
                <Section title="Haberler" items={results.posts} onItemPress={(item) =>
                  navigation.navigate('SingleNews', { postId: item.id })
                } renderLabel={(item) => decode(item.title.rendered)} theme={theme} />
              )}

              {/* YAZARLAR */}
              {Array.isArray(results.writers) && results.writers.length > 0 && (
                <Section title="Yazarlar" items={results.writers} onItemPress={() => { }}
                  renderLabel={(writer) => writer.name} theme={theme} />
              )}

              {/* VİDEOLAR */}
              {Array.isArray(results.videos) && results.videos.length > 0 && (
                <Section title="Videolar" items={results.videos}
                  onItemPress={(item) =>
                    navigation.navigate('VideoDetail', { youtubeId: item.youtubeId })
                  }
                  renderLabel={(item) => item.title} theme={theme} />
              )}

              {/* HİÇBİR ŞEY BULUNAMADI */}
              {results.posts.length === 0 &&
                results.videos.length === 0 &&
                results.writers.length === 0 && (
                  <Text style={[styles.noResults, { color: theme.text }]}>
                    Sonuç bulunamadı.
                  </Text>
                )}
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </MainLayout>
  );
};

const Section = ({ title, items, onItemPress, renderLabel, theme }) => (
  <View style={styles.section}>
    <Text style={[styles.sectionTitle, { color: theme.text }]}>{title}</Text>
    {items.map((item) => (
      <TouchableOpacity
        key={item.id || item.name || item.youtubeId}
        onPress={() => onItemPress(item)}
        style={styles.item}
      >
        <Text style={{ color: theme.text }}>{renderLabel(item)}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

export default SearchScreen;

const styles = StyleSheet.create({
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  item: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  noResults: {
    textAlign: 'center',
    marginTop: 32,
    fontSize: 16,
  },
});
