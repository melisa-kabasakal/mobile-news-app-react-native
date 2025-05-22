import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Image, TouchableOpacity,Dimensions } from 'react-native';
import axios from 'axios';
import { useTheme } from '../context/ThemeProvider';
import Entypo from 'react-native-vector-icons/Entypo';
import { decode } from 'html-entities';
import SoylesiPreview from './SoylesiPreview';
import KarikaturPreview from './KarikaturPreview';
import GununMansetiPreview from './GununMansetiPreview';
import JinDergiPreview from './JinDergiPreview';
import VideoHighlight from './VideoHighlight';




const screenWidth = Dimensions.get('window').width;

const NewsComponent = ({ navigation }) => {
  const [news, setNews] = useState([]);
  const [editorPicks, setEditorPicks] = useState([]);
  const [kadınNews, setKadınNews] = useState([]);
  const [dünyaNews, setDünyaNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [kulturNews, setKulturNews] = useState([]);
  const { isDarkMode } = useTheme();



  const { theme } = useTheme();

  const fetchNews = async () => {
  try {
    const response = await axios.get(
      `https://yeniyasamgazetesi9.com/wp-json/wp/v2/posts?categories=49&page=1&per_page=10&_embed`
    );

    const posts = response.data.map((post) => ({
      ...post,
      featured_media_url:
        post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
    }));

    setNews(posts);
  } catch (err) {
    console.error(err);
    setError('Haberler alınırken bir hata oluştu.');
    setTimeout(() => setError(null), 3000);
  } finally {
    setLoading(false);
  }
};

const fetchEditorPicks = async () => {
  try {
    const response = await axios.get(
      `https://yeniyasamgazetesi9.com/wp-json/wp/v2/posts?categories=17826&page=1&per_page=5&_embed`
    );

    const posts = response.data.map((post) => ({
      ...post,
      featured_media_url:
        post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
    }));

    setEditorPicks(posts);
  } catch (err) {
    console.error(err);
    setError('Editörün Seçtikleri alınırken bir hata oluştu.');
    setTimeout(() => setError(null), 3000);
  }
};

const fetchKadınNews = async () => {
  try {
    const response = await axios.get(
      `https://yeniyasamgazetesi9.com/wp-json/wp/v2/posts?categories=45&page=1&per_page=5&_embed`
    );

    const posts = response.data.map((post) => ({
      ...post,
      featured_media_url:
        post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
    }));

    setKadınNews(posts);
  } catch (err) {
    console.error(err);
    setError('Kadın haberleri alınırken bir hata oluştu.');
    setTimeout(() => setError(null), 3000);
  }
};

const fetchDünyaNews = async () => {
  try {
    const response = await axios.get(
      `https://yeniyasamgazetesi9.com/wp-json/wp/v2/posts?categories=51&page=1&per_page=5&_embed`
    );

    const posts = response.data.map((post) => ({
      ...post,
      featured_media_url:
        post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
    }));

    setDünyaNews(posts);
  } catch (err) {
    console.error(err);
    setError('Dünya haberleri alınırken bir hata oluştu.');
    setTimeout(() => setError(null), 3000);
  }
};

const fetchKulturNews = async () => {
  try {
    const response = await axios.get(
      `https://yeniyasamgazetesi9.com/wp-json/wp/v2/posts?categories=52&page=1&per_page=5&_embed`
    );

    const posts = response.data.map((post) => ({
      ...post,
      featured_media_url:
        post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
    }));

    setKulturNews(posts);
  } catch (err) {
    console.error(err);
    setError('Kültür haberleri alınırken bir hata oluştu.');
    setTimeout(() => setError(null), 3000);
  }
};



  useEffect(() => {
    fetchNews();
    fetchEditorPicks();
    fetchKadınNews();
    fetchDünyaNews();
    fetchKulturNews();
  }, []);

  const handleNewsPress = (postId) => {
    navigation.navigate('SingleNews', { postId });
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      {error && (
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: theme.text }]}>{error}
            {decode(item.title.rendered)}
          </Text>
        </View>
      )}
      
      <FlatList
  data={news}
  keyExtractor={(item) => item.id.toString()}
  scrollEnabled={false}
  ListHeaderComponent={() => (
    <View style={styles.header}>
      <Text style={[styles.headerText, { color: isDarkMode ? '#fff' : '#fff' }]}>Gündem</Text>
      
    </View>
  )}
  renderItem={({ item }) => (
    <TouchableOpacity onPress={() => handleNewsPress(item.id)} style={styles.item}>
      {item.featured_media_url ? (
        <Image source={{ uri: item.featured_media_url }} style={styles.image} resizeMode="cover" />
      ) : (
        <View style={styles.noImage}></View>
      )}
      <Text style={[styles.title, { color: theme.text }]}>

        {decode(item.title.rendered)}
      </Text>
      <View style={styles.separator} />
    </TouchableOpacity>
  )}
/>

  
      <FlatList
  data={editorPicks}
  keyExtractor={(item) => item.id.toString()}
  scrollEnabled={false}
  ListHeaderComponent={() => (
    <View style={[styles.header, { backgroundColor: '#d71920'}]}>
      <Text style={[styles.headerText, { color: isDarkMode ? '#fff' : '#fff' }]}>Editörün Seçtikleri</Text>
    </View>
  )}
  renderItem={({ item, index }) => (
    <TouchableOpacity onPress={() => handleNewsPress(item.id)} style={styles.item}>
      {index === 0 ? (
        <>
          {item.featured_media_url ? (
            <Image source={{ uri: item.featured_media_url }} style={styles.image} resizeMode="cover" />
          ) : (
            <View style={styles.noImage}></View>
          )}
          <Text style={[styles.title, { color: theme.text }]}>
      
            {decode(item.title.rendered)}
          </Text>
        </>
      ) : (
        <View style={[styles.editorPickWithoutImage, { position: 'relative', paddingLeft: 30 }]}>
          <Entypo
            name="triangle-right"
            size={45}
            color="#006c9b"
            style={{
              position: 'absolute',
              left: -10,
            }}
          />
          <Text style={[styles.title, { color: theme.text }]}>
            
            {decode(item.title.rendered)}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  )}
/>


{/* Kadın başlığı için  flatlist */}
<FlatList
  data={kadınNews}
  keyExtractor={(item) => item.id.toString()}
  scrollEnabled={false}
  ListHeaderComponent={() => (
    <View style={[styles.header, { backgroundColor: '#d71920' }]}>
      <Text style={[styles.headerText, { color: isDarkMode ? '#fff' : '#fff' }]}>Kadın</Text>
    </View>
  )}
  renderItem={({ item, index }) => (
    <TouchableOpacity onPress={() => handleNewsPress(item.id)} style={styles.item}>
      {index === 0 ? (
        <>
          {item.featured_media_url ? (
            <Image source={{ uri: item.featured_media_url }} style={styles.image} resizeMode="cover" />
          ) : (
            <View style={styles.noImage}></View>
          )}
          <Text style={[styles.title, { color: theme.text }]}>
            
            {decode(item.title.rendered)}
          </Text>
        </>
      ) : (
        <View style={[styles.editorPickWithoutImage, { position: 'relative', paddingLeft: 30 }]}>
  <Entypo
    name="triangle-right"
    size={45} 
    color="#006c9b"
    style={{
      position: 'absolute',
      left: -10,
    }}
  />
  <Text style={[styles.title, { color: theme.text }]}>
   
    {decode(item.title.rendered)}
  </Text>
</View>

      )}
    </TouchableOpacity>
  )}
/>


      <FlatList
  data={dünyaNews}
  keyExtractor={(item) => item.id.toString()}
  scrollEnabled={false}
  ListHeaderComponent={() => (
    <View style={[styles.header, { backgroundColor: '#d71920'}]}>
      <Text style={[styles.headerText, { color: isDarkMode ? '#fff' : '#fff' }]}>Dünya</Text>
    </View>
  )}
  renderItem={({ item, index }) => (
    <TouchableOpacity onPress={() => handleNewsPress(item.id)} style={styles.item}>
      {index === 0 ? (
        <>
          {item.featured_media_url ? (
            <Image source={{ uri: item.featured_media_url }} style={styles.image} resizeMode="cover" />
          ) : (
            <View style={styles.noImage}></View>
          )}
          <Text style={[styles.title, { color: theme.text }]}>
            
            {decode(item.title.rendered)}
          </Text>
        </>
      ) : (
        <View style={[styles.editorPickWithoutImage, { position: 'relative', paddingLeft: 30 }]}>
          <Entypo
            name="triangle-right"
            size={45}
            color="#006c9b"
            style={{
              position: 'absolute',
              left: -10,
            }}
          />
          <Text style={[styles.title, { color: theme.text }]}>
           
            {decode(item.title.rendered)}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  )}
/>


      <FlatList
  data={kulturNews}
  keyExtractor={(item) => item.id.toString()}
  scrollEnabled={false}
  ListHeaderComponent={() => (
    <View style={[styles.header, { backgroundColor: '#d71920' }]}>
      <Text style={[styles.headerText, { color: isDarkMode ? '#fff' : '#fff' }]}>Kültür</Text>
    </View>
  )}
  renderItem={({ item, index }) => (
    <TouchableOpacity onPress={() => handleNewsPress(item.id)} style={styles.item}>
      {index === 0 ? (
        <>
          {item.featured_media_url ? (
            <Image source={{ uri: item.featured_media_url }} style={styles.image} resizeMode="cover" />
          ) : (
            <View style={styles.noImage}></View>
          )}
          <Text style={[styles.title, { color: theme.text }]}>
            
            {decode(item.title.rendered)}
          </Text>
        </>
      ) : (
        <View style={[styles.editorPickWithoutImage, { position: 'relative', paddingLeft: 30 }]}>
          <Entypo
            name="triangle-right"
            size={45}
            color="#006c9b"
            style={{
              position: 'absolute',
              left: -10,
            }}
          />
          <Text style={[styles.title, { color: theme.text }]}>
           
            {decode(item.title.rendered)}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  )}
/>
<VideoHighlight/>
<SoylesiPreview />
<KarikaturPreview />
<GununMansetiPreview />
<JinDergiPreview />

    </View>
  );
};
 



const styles = StyleSheet.create({
    loader: {
        flex: 1,
        justifyContent: 'center',
      },
  errorContainer: {
    
    backgroundColor: '#ffcccc',
    borderRadius: 5,
    margin: 10,
  },
  errorText: {
    textAlign: 'center',
    color: '#ff0000',
    fontWeight: 'bold',
  },
  header: {
    backgroundColor: '#d71920',

    padding: 10,
    marginBottom: 2,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  item: {
    flexDirection: 'column',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    width: '100%',
  },
  image: {
    width: screenWidth,
    height: 200,
  },
  noImage: {
    width: screenWidth,
    height: 200,
    backgroundColor: '#ccc',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft:5,
  },
  separator: {
  height: 1,
  backgroundColor: '#ccc',
  marginTop: 10,
},

  editorPickWithoutImage: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
});

export default NewsComponent;