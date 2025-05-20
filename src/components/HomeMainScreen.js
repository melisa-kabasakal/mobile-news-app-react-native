import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native'; 
import CategoryBar from '../components/CategoryBar';
import Carousel from '../components/Carousel';
import CarouselWriter from '../components/CarouselWriter';
import MainLayout from '../components/MainLayout';
import NewsComponent from './NewsComponent';
import Footer from './Footer';

const HomeMainScreen = ({ navigation }) => {
  const content = [
    { key: '1', render: () => <CategoryBar /> },
    { key: '2', render: () => <Carousel /> },
    { key: '3', render: () => <CarouselWriter navigation={navigation} /> },
    { key: '4', render: () => <NewsComponent navigation={navigation} /> },
    { key: '5', render: () => <Footer /> },
  ];

  return (
    <MainLayout>
      <FlatList
        data={content}
        renderItem={({ item }) => <View style={styles.item}>{item.render()}</View>}
        keyExtractor={(item) => item.key}
      />
      <NewsComponent />
    </MainLayout>
     
  );
};

const styles = StyleSheet.create({
  item: {
    marginBottom: 10,
  },
});

export default HomeMainScreen;
