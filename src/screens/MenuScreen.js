import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
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

  const anasayfaScreens = new Set(categories);

  const handleCategoryPress = (category) => {
    if (anasayfaScreens.has(category)) {
      navigation.navigate('Anasayfa', { screen: category });
    } else {
      navigation.navigate(category);
    }
  };

  return (
    <MainLayout>
      <ScrollView
  style={{ flex: 1 }} 
  contentContainerStyle={[
    styles.container,
    {
      backgroundColor: isDarkMode ? '#000' : '#fff',
      flexGrow: 1, 
    },
  ]}
  keyboardShouldPersistTaps="handled"
  showsVerticalScrollIndicator={false}
>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.button,
              { borderColor: isDarkMode ? '#444' : '#ccc' },
            ]}
            onPress={() => handleCategoryPress(category)}
          >
            <Text style={[styles.buttonText, { color: isDarkMode ? '#fff' : '#333' }]}>
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
    paddingBottom: 60,
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
