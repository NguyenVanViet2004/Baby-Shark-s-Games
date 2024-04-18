import {Image, StyleSheet, Text} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, FONTFAMILY} from '../../DefineObject';
import {useNavigation} from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();
  React.useEffect(() => {
    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{name: 'MenuGame' as never}],
      });
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <LinearGradient colors={COLORS.backGround} style={styles.container}>
      <Image
        source={require('../../assets/images/shark_icon.png')}
        style={styles.image}
      />
      <Text style={styles.title}>Baby Shark's Game</Text>
    </LinearGradient>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  image: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 20,
    fontFamily: FONTFAMILY.JetBrainsMono_Bold,
    color: 'white',
  },
});
