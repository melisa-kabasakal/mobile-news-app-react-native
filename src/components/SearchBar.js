import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { useSearch } from '../context/SearchContext';
import { useTheme } from '../context/ThemeProvider';

const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useSearch();
  const { theme } = useTheme();

  return (
    <TextInput
      style={[styles.input, { color: theme.text, borderColor: theme.text }]}
      placeholder="Arama yapın..."
      placeholderTextColor={theme.text}
      value={searchQuery}
      onChangeText={setSearchQuery}  
    />
  );
};

const styles = StyleSheet.create({
  input: {
    marginTop: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15,
    marginBottom: 10,
  },
});

export default SearchBar;
