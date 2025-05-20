import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import axios from 'axios';
import RenderHtml from 'react-native-render-html';
import { useTheme } from '../context/ThemeProvider';
import MainLayout from '../components/MainLayout';
import Footer from '../components/Footer';

const KarikaturScreen = () => {
  const { isDarkMode } = useTheme();
  const { width } = useWindowDimensions();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const response = await axios.get(
          'https://yeniyasamgazetesi9.com/wp-json/wp/v2/pages/238943'
        );

        const LOCAL_IP = 'http://192.168.1.100:3001'; // ✅ Burada tanımladık

        let html = response.data.content.rendered;

        html = html.replace(
          /<img([^>]+)src=['"]{1}['"]{1}([^>]+)data-src=['"]([^'"]+)['"]/gi,
          '<img$1src="$3"$2data-src="$3"'
        );

        html = html.replace(
          /<img([^>]*?)data-src=['"]([^'"]+)['"]/gi,
          '<img$1src="$2" data-src="$2"'
        );

        html = html.replace(
          /<img[^>]*src="([^"]+)"[^>]*>/gi,
          (match, src) => {
            if (src.includes('yeniyasamgazetesi9.com/wp-content/uploads/')) {
              const encoded = encodeURIComponent(src);
              const fullProxyUrl = `${LOCAL_IP}/proxy-image?url=${encoded}`;
              console.log('Görsel yönlendirme:', fullProxyUrl);
              return match.replace(src, fullProxyUrl);
            }
            return '';
          }
        );

        setContent(html);
      } catch (error) {
        if (
          error.response?.status === 404 ||
          error.response?.status === 408 ||
          error.response?.status === 204
        ) {
          console.log('Karikatür sayfası yüklendi ama bazı görseller eksik.');
        } else {
          console.error('Karikatür sayfası ciddi hata:', error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, []);

  const renderHtmlContent = useMemo(() => (
    <RenderHtml
      contentWidth={width}
      source={{ html: content }}
      baseStyle={{
        color: isDarkMode ? '#fff' : '#000',
        fontSize: 16,
        lineHeight: 24,
      }}
      tagsStyles={{
        img: {
          width: '100%',
          height: 'auto',
          resizeMode: 'contain',
          marginVertical: 10,
          borderRadius: 10,
        },
      }}
    />
  ), [content, width, isDarkMode]);

  if (loading) {
    return (
      <MainLayout>
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#006c9b" />
        </View>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
  <ScrollView
    contentContainerStyle={[
      styles.container,
      { backgroundColor: isDarkMode ? '#000' : '#fff' },
    ]}
  >
   

    {renderHtmlContent}

    <Footer />
  </ScrollView>
</MainLayout>

  );
};

export default KarikaturScreen;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
   
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
