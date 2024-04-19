/* eslint-disable react/self-closing-comp */
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  COLORS,
  FONTFAMILY,
  menuGame,
  menuGameElement,
} from '../../DefineObject';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

const ItemGame = ({game, index}: {game: menuGameElement, index: number}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity key={index}
      onPress={() => navigation.navigate(game.toScreen as never)}
      style={styles.ItemGameContainer}>
      <Image
        source={game.image}
        style={styles.imageItem}
      />
      <View style={styles.itemTitle}>
        <Text style={styles.titleItemGame}>{game.titleGame}</Text>
        <Text style={styles.subTitleItemGame}>{game.subTitleGame}</Text>
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

      <FlatList
        data={menuGame}
        renderItem={({item, index}) => <ItemGame game={item} index={index}/>}
      />
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
    marginVertical: 10,
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
    color: 'white',
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
