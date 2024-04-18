/* eslint-disable react/self-closing-comp */
import {
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

const ItemGame = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('TicTacToeHome' as never)}
      style={styles.ItemGameContainer}>
      <Image
        source={require('../../assets/images/tic_tac_toe_icon.png')}
        style={styles.imageItem}
      />
      <View style={styles.itemTitle}>
        <Text style={styles.titleItemGame}>Tic Tac Toe</Text>
        <Text style={styles.subTitleItemGame}>Mode: 3 x 3</Text>
      </View>

      <View style={styles.playButtonContainer}>
        <Icons name="play" size={40} color={'white'} />
        <Text style={styles.gamePlayTitle}>Play</Text>
      </View>
    </TouchableOpacity>
  );
};

const MenuGame = () => {
  return (
    <LinearGradient colors={COLORS.backGround} style={styles.container}>
      <SafeAreaView style={styles.tittleContainer}>
        <Text style={styles.title}>Game List</Text>
      </SafeAreaView>
      <ItemGame />
    </LinearGradient>
  );
};

export default MenuGame;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  ItemGameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'yellow',
    padding: 10,
  },
  imageItem: {
    width: 70,
    height: 70,
  },
  itemTitle: {},
  playButtonContainer: {},
  titleItemGame: {
    fontSize: 20,
    fontFamily: FONTFAMILY.JetBrainsMono_Medium,
    color: 'yellow',
  },
  subTitleItemGame: {
    fontSize: 16,
    fontFamily: FONTFAMILY.JetBrainsMono_Medium,
  },
  gamePlayTitle: {
    fontFamily: FONTFAMILY.JetBrainsMono_Medium,
    textAlign: 'center',
    color: 'yellow',
  },
  title: {
    fontSize: 25,
    fontFamily: FONTFAMILY.JetBrainsMono_Medium,
    color: 'white',
  },
  tittleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
});
