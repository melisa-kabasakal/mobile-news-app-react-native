import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { useTheme } from '../context/ThemeProvider';

const AboneBanner = () => {
  const { isDarkMode } = useTheme();

  const imageUrl = 'https://yeniyasamgazetesi9.com/wp-content/uploads/2024/11/abonetablet-768x432.jpg';

  const openSafeURL = async (url) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      Linking.openURL(url);
    } else {
      console.warn('URL açılamıyor:', url);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#111' : '#f2f2f2' }]}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => openSafeURL('https://eyeniyasam.com/')}
        >
          <Text style={styles.menuText}>📄 Abone Ol</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => openSafeURL('https://eyeniyasam.com/epanel/')}
        >
          <Text style={styles.menuText}>📄 Giriş Yap</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AboneBanner;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    
    
  },
buttonContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  
  marginTop: 5,
  gap:50,
},


menuButton: {
  width: '35%', 
  backgroundColor: '#d00000',
  paddingVertical: 9,
  borderRadius: 30,
  alignItems: 'center',
},


  menuText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
