import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native'; 
import CategoryBar from '../components/CategoryBar';
import Carousel from '../components/Carousel';
import CarouselWriter from '../components/CarouselWriter';
import AboneBanner from '../components/AboneBanner';
import MainLayout from '../components/MainLayout';
import NewsComponent from './NewsComponent';
import Footer from './Footer';

const HomeMainScreen = ({ navigation }) => {
  const content = [
    { key: '1', render: () => <CategoryBar /> },
    { key: '2', render: () => <Carousel /> },
    { key: '3', render: () => <CarouselWriter navigation={navigation} /> },
    { key: '3.5', render: () => <AboneBanner /> }, 
    { key: '4', render: () => <NewsComponent navigation={navigation} /> },
    { key: '5', render: () => <Footer /> },
  ];

  return (
    <MainLayout>
      <ScrollView>
        {content.map((item) => (
          <View key={item.key} style={styles.item}>
            {item.render()}
          </View>
        ))}
      </ScrollView>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  item: {
    marginBottom: 15,
  },
});

export default HomeMainScreen;
