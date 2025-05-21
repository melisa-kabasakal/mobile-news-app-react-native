import React from 'react';
import { View, Text, Linking, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Footer = () => {
  return (
    <View style={styles.footerContainer}>
 
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

   
      <View style={styles.bottomSection}>
        <View style={styles.socialIcons}>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.facebook.com/gazeteyeniyasam/')}>
            <FontAwesome name="facebook" size={20} color="#fff" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://x.com/yeniyasamnews')}>
            <FontAwesome name="twitter" size={20} color="#fff" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/yeniyasam')}>
            <FontAwesome name="youtube-play" size={20} color="#fff" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.instagram.com/gazeteyeniyasam/')}>
            <FontAwesome name="instagram" size={20} color="#fff" style={styles.icon} />
          </TouchableOpacity>
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
    marginBottom: 20,
  },
  linksSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 12,
  },
  linkText: {
    color: '#bbb',
    fontSize: 14,
    textDecorationLine: 'underline',
    marginHorizontal: 12,
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
    alignItems: 'center',
  },
  socialIcons: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  icon: {
    marginHorizontal: 12,
  },
  copyright: {
    color: '#aaa',
    fontSize: 12,
    textAlign: 'center',
    flexWrap: 'wrap',
  },
});

export default Footer;
