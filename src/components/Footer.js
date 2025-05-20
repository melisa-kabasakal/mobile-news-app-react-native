import React from 'react';
import { View, Text, Linking, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Footer = () => {
  return (
    <View style={styles.footerContainer}>
      {/* Üst kısım */}
      <View style={styles.topSection}>
        <View style={styles.linksSection}>
          <TouchableOpacity onPress={() => Linking.openURL('https://yeniyasamgazetesi9.com/iletisim/')}>
            <Text style={styles.linkText}>İletişim</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.linkText}>Gizlilik Politikası</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.emailSection}>
          <TouchableOpacity onPress={() => Linking.openURL('mailto:yeniyasamgazetesi@gmail.com')}>
            <Text style={styles.emailText}>yeniyasamgazetesi@gmail.com</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Alt kısım */}
      <View style={styles.bottomSection}>

        <View style={styles.socialIcons}>
          <FontAwesome
            name="facebook"
            size={20}
            color="#fff"
            onPress={() => Linking.openURL('https://www.facebook.com/gazeteyeniyasam/')}
          />
          <FontAwesome
            name="twitter"
            size={20}
            color="#fff"
            onPress={() => Linking.openURL('https://x.com/yeniyasamnews')}
          />
          <FontAwesome
            name="youtube-play"
            size={20}
            color="#fff"
            onPress={() => Linking.openURL('https://www.youtube.com/yeniyasam')}
          />
          <FontAwesome
            name="instagram"
            size={20}
            color="#fff"
            onPress={() => Linking.openURL('https://www.instagram.com/gazeteyeniyasam/')}
          />
        </View>
        <Text style={styles.copyright}>
          © 2022{' '}
          <Text
            style={styles.linkText}
            onPress={() => Linking.openURL('http://yeniyasamgazetesi2.com')}
          >
            Yeni Yaşam Gazetesi - Tüm Hakları Saklıdır
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: '#111',
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  topSection: {
    flexDirection: 'column',
    
    marginBottom: 15,
  },
  linksSection: {
    flexDirection: 'row',
    gap: 40,
    justifyContent: 'center',
    marginBottom: 15,
  },
  linkText: {
    color: '#bbb',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  emailSection: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emailText: {
    color: '#fff',
    fontSize: 14,
  },
  bottomSection: {
    borderTopWidth: 1,
    borderTopColor: '#333',
    paddingTop: 15,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    
  },
  copyright: {
    color: '#aaa',
    fontSize: 12,
    flex: 1,
    flexWrap: 'wrap',
    
  },
  socialIcons: {
    flexDirection: 'row',
    gap: 30,
    marginBottom: 15,
  },
});

export default Footer;
