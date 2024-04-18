import {
  Alert,
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS, FONTFAMILY} from '../DefineObject';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window');
const ResultsGame = ({
  modalVisible,
  setModalVisible,
  title,
  icon,
  newGameFunction,
  exitFunction,
}: {
  modalVisible: boolean;
  setModalVisible: Function;
  title: string;
  icon: number;
  newGameFunction: Function;
  exitFunction: Function;
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <LinearGradient colors={COLORS.loseGameColor} style={styles.modalView}>
          {/* icon and title modal */}
          <Image source={icon} style={styles.iconImage} />
          <Text style={styles.modalText}>{title}</Text>

          {/* button options */}
          <View style={styles.buttonOption}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => Alert.alert('Share this game!', 'Coming soon')}>
              <Image
                source={require('../assets/images/share_icon.png')}
                style={styles.playAgainIcon}
              />
              <Text style={styles.buttonLabel}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => newGameFunction()}
              style={styles.buttonContainer}>
              <Image
                source={require('../assets/images/play_again_icon.png')}
                style={styles.playAgainIcon}
              />
              <Text style={styles.buttonLabel}>Play again</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => exitFunction()}
              style={styles.buttonContainer}>
              <Image
                source={require('../assets/images//logout_icon.png')}
                style={styles.playAgainIcon}
              />
              <Text style={styles.buttonLabel}>Exit</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </Modal>
  );
};

export default ResultsGame;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: FONTFAMILY.JetBrainsMono_Bold,
    fontSize: 30,
    color: COLORS.light_yellow,
  },
  buttonOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 40,
    alignItems: 'center',
  },
  iconImage: {
    width: (width * 1) / 4,
    height: (height * 1) / 10,
  },
  playAgainIcon: {
    width: (width * 1) / 9,
    height: (height * 1) / 20,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  buttonLabel: {
    fontFamily: FONTFAMILY.JetBrainsMono_Medium,
    color: COLORS.white,
  },
});
