import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import * as Linking from 'expo-linking';

const UserMenuModal = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => Linking.openURL('https://eyeniyasam.com/epanel/')}
          >
            <Text style={styles.menuText}>Giriş Yap</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => Linking.openURL('https://eyeniyasam.com/')}
          >
            <Text style={styles.menuText}>Abone Ol</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => Linking.openURL('https://eyeniyasam.com/urunler/')}
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
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    gap: 12,
  },
  menuButton: {
    backgroundColor: '#d00000',
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
