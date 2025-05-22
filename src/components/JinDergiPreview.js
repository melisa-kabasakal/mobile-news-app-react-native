import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
  useWindowDimensions,
} from 'react-native';
import { useTheme } from '../context/ThemeProvider';

const JinDergiPreview = () => {
  const { isDarkMode } = useTheme();
  const { width } = useWindowDimensions();

  const handlePress = () => {
    Linking.openURL('https://jindergi.com');
  };

  return (
    <View style={styles.wrapper}>
      <Text
        style={[
          styles.header,
          { backgroundColor: '#d71920', color: '#fff' },
        ]}
      >
        JIN Dergi
      </Text>

      <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
        <Image
          source={{
            uri: 'https://yeniyasamgazetesi9.com/wp-content/uploads/2025/05/GqndAnpXAAEH3F4-1130x1600.jpg',
          }}
          style={[styles.image, { width: width - 32 }]}
          resizeMode="cover"
        />
      </TouchableOpacity>

      <Text style={[styles.caption, { color: isDarkMode ? '#aaa' : '#333' }]}>
        Dergiye gitmek için görsele tıklayın
      </Text>
    </View>
  );
};

export default JinDergiPreview;

const styles = StyleSheet.create({
  
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    padding: 10,
    marginBottom: 15,
  },
  image: {
    height: 500,
    borderRadius: 8,
    alignSelf: 'center',
  },
  caption: {
    marginTop: 10,
    fontSize: 14,
    textAlign: 'center',
  },
});
