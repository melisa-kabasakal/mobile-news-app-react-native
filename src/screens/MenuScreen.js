import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeProvider';
import MainLayout from '../components/MainLayout';
import Footer from '../components/Footer';

const categories = [
  'Tümü',
  'Güncel',
  'Yaşam',
  'Söyleşi',
  'Forum',
  'Politika',
  'Kadın',
  'Dünya',
  'Ortadoğu',
  'Kültür',
  'Emek-Ekonomi',
  'Ekoloji',
  'Yazarlar',
  'Editörün Seçtikleri',
  'Panorama',
  'Karikatür',
  'Günün Manşeti',
];

const MenuScreen = () => {
  const navigation = useNavigation();
  const { isDarkMode } = useTheme();
  const { width } = useWindowDimensions();

  const handleCategoryPress = (category) => {
  if (
  category === 'Tümü' ||
  category === 'Güncel' ||
  category === 'Politika' ||
  category === 'Kültür' ||
  category === 'Kadın' ||
  category === 'Ekoloji' ||
  category === 'Emek-Ekonomi' ||
  category === 'Söyleşi' ||
  category === 'Yaşam' ||
  category === 'Forum' ||
  category === 'Dünya' ||
  category === 'Ortadoğu' ||
  category === 'Panorama' ||
  category === 'Yazarlar' ||
  category === 'Editörün Seçtikleri' ||
  category === 'Günün Manşeti' ||
  category === 'Karikatür'
  ){
  navigation.navigate('Anasayfa', {
    screen: category,
  });
} else {
  navigation.navigate(category);
}
};


  return (
    <MainLayout>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { backgroundColor: isDarkMode ? '#000' : '#fff' },
        ]}
      >
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.button,
              {
                borderColor: isDarkMode ? '#444' : '#ccc',
              },
            ]}
            onPress={() => handleCategoryPress(category)}
          >
            <Text
              style={[
                styles.buttonText,
                { color: isDarkMode ? '#fff' : '#333' },
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}

        <View style={{ width, alignSelf: 'center', marginTop: 40 }}>
          <Footer />
        </View>
      </ScrollView>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  button: {
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  buttonText: {
    fontSize: 18,
  },
});

export default MenuScreen;
