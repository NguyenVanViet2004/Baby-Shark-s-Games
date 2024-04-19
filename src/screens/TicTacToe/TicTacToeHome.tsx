import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, FONTFAMILY} from '../../DefineObject';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

const TicTacToeHome = () => {
  const navigation = useNavigation();
  return (
    <LinearGradient colors={COLORS.backGround} style={styles.container}>
      <SafeAreaView style={styles.chevron_left_icon_container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icons name="chevron-left" size={40} color={'white'} />
        </TouchableOpacity>
      </SafeAreaView>
      <View style={styles.headerContainer}>
        <Image
          source={require('../../assets/images/tic_tac_toe_icon.png')}
          style={styles.iconGame}
        />
        <Text style={styles.title}>Tic Tac Toe</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonItem}
          onPress={() => navigation.navigate('PlayerVsPlayer' as never)}>
          <Icons name="account" size={30} color={'white'} />
          <Text style={styles.buttonLabel}>Player vs Player</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonItem}
          onPress={() => navigation.navigate('PlayerVsComputer' as never)}>
          <Icons name="robot-angry" size={30} color={'white'} />
          <Text style={styles.buttonLabel}>Player vs Computer</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonItem}
          onPress={() => Alert.alert('Tic - tac - toe', 'Coming soon')}>
          <Icons name="account-supervisor" size={30} color={'white'} />
          <Text style={styles.buttonLabel}>Player vs Player ( online )</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default TicTacToeHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontFamily: FONTFAMILY.JetBrainsMono_Bold,
    fontSize: 25,
    color: 'white',
  },
  iconGame: {
    width: 120,
    height: 120,
  },
  headerContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 2,
    alignItems: 'center',
    gap: 20,
  },
  buttonItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
  },
  buttonLabel: {
    fontFamily: FONTFAMILY.JetBrainsMono_Bold,
    color: 'white',
  },
  chevron_left_icon_container: {
    margin: 20,
  },
});
