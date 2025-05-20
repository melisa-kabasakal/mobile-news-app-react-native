import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Image,
  Animated,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeProvider';
import UserMenuModal from './UserMenuModal'; // doğru konumdaysa

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const slideAnim = useRef(new Animated.Value(isDarkMode ? 30 : 0)).current;
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isDarkMode ? 30 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [isDarkMode]);

  const handleThemeToggle = () => {
    toggleTheme();
  };

  const handleUserIconPress = () => {
    setMenuVisible(true);
  };

  const handleLogin = () => {
    setMenuVisible(false);
    navigation.navigate('Login'); // var olan Login ekranına gider
  };

  const handleSubscribe = () => {
    setMenuVisible(false);
    navigation.navigate('Subscribe'); // kayıt veya form ekranına gider
  };

  const handlePackages = () => {
    setMenuVisible(false);
    navigation.navigate('Packages'); // abonelik paketleri ekranına gider
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#111' : '#fff' }]}>
      {/* Tema geçişi */}
      <TouchableOpacity onPress={handleThemeToggle} activeOpacity={0.8}>
        <View style={styles.toggleWrapper}>
          {isDarkMode ? (
            <Icon name="moon" size={14} color="#fff" style={styles.leftIcon} />
          ) : (
            <Icon name="sun" size={14} color="#fff" style={styles.rightIcon} />
          )}

          <Animated.View
            style={[
              styles.circle,
              {
                transform: [{ translateX: slideAnim }],
                backgroundColor: '#fff',
              },
            ]}
          />
        </View>
      </TouchableOpacity>

      {/* Logo */}
      <Image
        source={{
          uri: 'https://yeniyasamgazetesi9.com/wp-content/uploads/2022/01/logo-e1643612364952.png',
        }}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Kullanıcı ikonu */}
      <TouchableOpacity onPress={handleUserIconPress}>
        <Icon name="user" size={24} color={isDarkMode ? '#fff' : '#000'} />
      </TouchableOpacity>

      {/* Açılır Menü */}
      <UserMenuModal
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        onLogin={handleLogin}
        onSubscribe={handleSubscribe}
        onPackages={handlePackages}
      />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    top: 35,
  },
  logo: {
    width: 160,
    height: 40,
  },
  toggleWrapper: {
    width: 60,
    height: 28,
    borderRadius: 15,
    backgroundColor: '#666',
    padding: 3,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  circle: {
    width: 23,
    height: 23,
    borderRadius: 12,
    position: 'absolute',
    top: 3,
    left: 3,
  },
  leftIcon: {
    position: 'absolute',
    left: 8,
    top: 8,
  },
  rightIcon: {
    position: 'absolute',
    right: 8,
    top: 8,
  },
});
