import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeProvider';

const CategoryBar = () => {
  const navigation = useNavigation();
  const { isDarkMode } = useTheme();
  const { width } = useWindowDimensions();

  const categories = [
    { title: 'Politika', route: 'Politika' },
    { title: 'Kadın', route: 'Kadın' },
    { title: 'Kültür', route: 'Kültür' },
    { title: 'Güncel', route: 'Güncel' },
    { title: 'Ekoloji', route: 'Ekoloji' },
    { title: 'Ekonomi', route: 'Ekonomi' },
  ];

  const isNarrowScreen = width < 420;

  const content = (
    <View
      style={[
        styles.innerContainer,
        {
          flexWrap: isNarrowScreen ? 'nowrap' : 'wrap',
          justifyContent: isNarrowScreen ? 'flex-start' : 'space-evenly',
        },
      ]}
    >
      {categories.map((item, index) => (
  <React.Fragment key={item.title}>
    <TouchableOpacity
      onPress={() => navigation.navigate(item.route)}
      style={styles.button}
    >
      <Text style={[styles.text, { color: isDarkMode ? '#fff' : '#000' }]}>
        {item.title}
      </Text>
    </TouchableOpacity>
    {index < categories.length - 1 && (
      <Text
        style={{
          fontSize: 14,
          marginHorizontal: 4,
          alignSelf: 'center',
          color: isDarkMode ? 'rgba(209, 209, 209, 0.4)' : '#d1d1d1', 
           backgroundColor: 'transparent',
        }}
      >
        |
      </Text>
    )}
  </React.Fragment>
))}


    </View>
  );

  return isNarrowScreen ? (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollWrapper}
    >
      {content}
    </ScrollView>
  ) : (
    <View style={[styles.container, { width }]}>{content}</View>
  );
};

export default CategoryBar;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  scrollWrapper: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    flexGrow: 1,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
