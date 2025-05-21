import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MainLayout from '../components/MainLayout';
import { useTheme } from '../context/ThemeProvider';
import Footer from '../components/Footer';

const years = [
  { label: 'Panorama 2024', categoryId: 58623 },
  { label: 'Panorama 2023', categoryId: 25809 },
  { label: 'Panorama 2022', categoryId: 58625 },
];

const Panorama = () => {
  const navigation = useNavigation();
  const { isDarkMode } = useTheme();
  const { width } = useWindowDimensions();

  return (
    <MainLayout>
      <ScrollView
  style={{ flex: 1 }}
  contentContainerStyle={[
    styles.container,
    { backgroundColor: isDarkMode ? '#000' : '#fff' },
  ]}
  showsVerticalScrollIndicator={false}
>

        <Text style={[styles.header, { color: isDarkMode ? '#fff' : '#000' }]}>
          Panorama Yılları
        </Text>

        {years.map((year, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.button,
              {
                borderBottomColor: isDarkMode ? '#444' : '#ccc',
              },
            ]}
            onPress={() =>
              navigation.navigate('PanoramaYil', {
                categoryId: year.categoryId,
                title: year.label,
              })
            }
          >
            <Text style={[styles.buttonText, { color: isDarkMode ? '#fff' : '#000' }]}>
              {year.label}
            </Text>
          </TouchableOpacity>
        ))}

        <View style={{ width, alignSelf: 'center', marginTop: 50 }}>
          <Footer />
        </View>
      </ScrollView>
    </MainLayout>
  );
};

export default Panorama;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 80,
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
