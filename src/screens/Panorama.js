import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MainLayout from '../components/MainLayout';
import { useTheme } from '../context/ThemeProvider';

const years = [
  { label: 'Panorama 2024', categoryId: 58623 },
  { label: 'Panorama 2023', categoryId: 25809 },
  { label: 'Panorama 2022', categoryId: 58625 },
];

const Panorama = () => {
  const navigation = useNavigation();
  const { isDarkMode } = useTheme();

  return (
    <MainLayout>
      <ScrollView contentContainerStyle={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#fff' }]}>
        <Text style={[styles.header, { color: isDarkMode ? '#fff' : '#000' }]}>Panorama Yılları</Text>
        {years.map((year, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.button, { borderColor: isDarkMode ? '#444' : '#ccc' }]}
            onPress={() => navigation.navigate('PanoramaYil', {
              categoryId: year.categoryId,
              title: year.label,
            })}
          >
            <Text style={[styles.buttonText, { color: isDarkMode ? '#fff' : '#000' }]}>{year.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  buttonText: {
    fontSize: 18,
  },
});

export default Panorama;
