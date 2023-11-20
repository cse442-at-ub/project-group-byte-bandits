import React, { useState, useRef } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  TouchableOpacity, 
  Image, 
  useColorScheme,
  Dimensions
} from 'react-native';
import AnimatedDots from '../../../components/AnimatedDots'
import * as Haptics from 'expo-haptics';
import theme from '../../../components/theme'
import { handle_auto_login } from '../../../bubble_api/bubble_api';

const onboardingData = [
  {
    title: 'Welcome to Bubble',
    description: 'Connect with people near you. Share thoughts, ideas, or just chat about your day in a local bubble!',
    image: require('../../../assets/onboarding1.png'),
  },
  {
    title: 'Create Your Bubble',
    description: 'Start conversations on topics you love. Just set a topic, define your radius, and gather like-minded folks!',
    image: require('../../../assets/onboarding2.png'),
  },
  {
    title: 'Join the Conversation',
    description: 'Explore bubbles around you. Join any discussion that piques your interest and meet new friends.',
    image: require('../../../assets/onboarding3.gif'),
  },
];

const { width } = Dimensions.get('window');

const OnboardingScreen = ({navigation}) => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef();
  const colorScheme = useColorScheme();
  const currentTheme = theme(colorScheme);

  const getImageHeight = (index) => {
    switch(index) {
      case 0: return 200;
      case 1: return 200;
      case 2: return 200;
      default: return 200;
    }
  }

  const renderItem = ({ item, index }) => (
    <View style={[styles.slide, { 
        backgroundColor: currentTheme.background, 
        width: width 
      }]}>
      <Image source={item.image} style={[styles.image, { height: getImageHeight(index) }]}/>
      <Text style={[styles.title, { color: currentTheme.primary }]}>  
        {item.title}
      </Text>
      <Text style={[styles.description, { color: currentTheme.secondary }]}> 
        {item.description}
      </Text>
      <AnimatedDots activeIndex={currentIndex} count={onboardingData.length} />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: currentTheme.buttonBackground }]}
        onPress={() => {
          if (currentIndex < onboardingData.length - 1) {
            flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
          }else{
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            navigation.navigate("Register")
          }
        }}
      >
        <Text style={[styles.buttonText, { color: currentTheme.buttonText }]}>
          {currentIndex === onboardingData.length - 1 ? 'Get Started' : 'Next'}
        </Text>
      </TouchableOpacity>
    </View>
  );


  return (
    <View style={styles.container}
          onLayout={() => handle_auto_login(navigation)}>
      <FlatList
        data={onboardingData}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / e.nativeEvent.layoutMeasurement.width);
          setCurrentIndex(index);
          Haptics.selectionAsync(); 
        }}        
        ref={flatListRef}
      />
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', 
    margin: 0,
    padding: 0, 
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flex: 1,
  },
  image: {
    width: 100,
    height: 100,
    bottom: 60,
    resizeMode: 'contain'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    bottom: 50,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20,
    bottom: 40,
    width: '85%',
    fontWeight: '500'
    
  },
  button: {
    padding: 20,
    position: 'absolute',
    bottom: 80,
    borderRadius: 20,
    width: '60%'
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
});
