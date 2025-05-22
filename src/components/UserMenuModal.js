import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Platform,
  BackHandler,
} from 'react-native';
import * as Linking from 'expo-linking';
import { useTheme } from '../context/ThemeProvider';
import { useEffect } from 'react';

const UserMenuModal = ({ visible, onClose }) => {
  const { isDarkMode } = useTheme();

  useEffect(() => {
    if (Platform.OS === 'android' && visible) {
      const backAction = () => {
        onClose();
        return true;
      };
      const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
      return () => backHandler.remove();
    }
  }, [visible]);

  const openSafeURL = async (url) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      Linking.openURL(url);
    } else {
      console.warn('URL açılamıyor:', url);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <Pressable style={styles.overlay} onPress={onClose}>
        <View
          style={[
            styles.menuContainer,
            { backgroundColor: isDarkMode ? '#111' : '#fff' },
          ]}
        >
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => openSafeURL('https://eyeniyasam.com/epanel/')}
          >
            <Text style={styles.menuText}>Giriş Yap</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => openSafeURL('https://eyeniyasam.com/')}
          >
            <Text style={styles.menuText}>Abone Ol</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => openSafeURL('https://eyeniyasam.com/urunler/')}
          >
            <Text style={styles.menuText}>Abonelik Paketleri</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
};

export default UserMenuModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  menuContainer: {
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    gap: 12,
  },
  menuButton: {
    backgroundColor: '#d71920',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  menuText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
