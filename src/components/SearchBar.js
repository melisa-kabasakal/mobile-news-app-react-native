import React from 'react';
import { TextInput, StyleSheet, Platform } from 'react-native';
import { useSearch } from '../context/SearchContext';
import { useTheme } from '../context/ThemeProvider';

const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useSearch();
  const { theme, isDarkMode } = useTheme();

  return (
    <TextInput
      style={[
        styles.input,
        {
          color: theme.text,
          borderColor: theme.text,
          backgroundColor: isDarkMode ? '#222' : '#f2f2f2',
        },
      ]}
      placeholder="Arama yapın..."
      placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
      value={searchQuery}
      onChangeText={setSearchQuery}
      keyboardAppearance={isDarkMode ? 'dark' : 'light'}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
});

export default SearchBar;
