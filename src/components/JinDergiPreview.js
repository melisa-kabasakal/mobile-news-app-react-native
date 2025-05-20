import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';

const JinDergiPreview = () => {
  const handlePress = () => {
    Linking.openURL('https://jindergi.com');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>JIN Dergi</Text>
      <TouchableOpacity onPress={handlePress}>
        <Image
          source={{
            uri: 'https://yeniyasamgazetesi9.com/wp-content/uploads/2025/05/GqndAnpXAAEH3F4-1130x1600.jpg',
          }}
          style={styles.image}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    backgroundColor: '#ff0000',
    color: '#fff',
    padding: 10,
   
  },
  image: {
    width: '100%',
    height: 620,
  },
  caption: {
    textAlign: 'center',
    fontSize: 14,
    
    color: '#555',
  },
});

export default JinDergiPreview;
