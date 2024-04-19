import {View, Text, StatusBar, SafeAreaView, Modal, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FlappyBirdStyles as styles} from './FlappyBird.styles';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../../DefineObject';
import {GameEngine} from 'react-native-game-engine';
import Restart from './Entities';
import Physics from './Entities/Physics';
import {useNavigation} from '@react-navigation/native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';

const FlappyBird = () => {
  const [running, setRunning] = useState(false);
  const [gameEngine, setGameEngine] = useState<any | null>(null);
  const [points, setPoints] = useState(0);
  const navigation = useNavigation();
  useEffect(() => {
    setRunning(false);
  }, []);

  return (
    <LinearGradient
      colors={COLORS.minesweeperBackgroundColor}
      style={styles.container}>
      <GameEngine
        ref={ref => setGameEngine(ref)}
        systems={[Physics]}
        entities={Restart()}
        running={running}
        onEvent={(e: any) => {
          switch (e.type) {
            case 'gameOver': {
              setRunning(false);
              gameEngine.stop();
              setPoints(0);
              break;
            }
            case 'addPoint': {
              setPoints(points + 1);
              break;
            }
          }
        }}
        style={styles.container}>
        <SafeAreaView style={styles.headerContainer}>
          <View style={{flex: 1}} />
          <Text style={styles.headerTitle}>{points}</Text>
          <TouchableOpacity onPress={() => setRunning(false)} style={{flex: 1}}>
            <Icons name="cog" size={30} color={'gray'} />
          </TouchableOpacity>
        </SafeAreaView>

        {!running && (
          <Modal transparent animationType="fade" visible={true}>
            <View style={styles.modalContainer}>
              <Image
                source={require('../../assets/images/flappy_bird_text.png')}
                style={{width: 200, height: 60}}
              />

              <View
                style={{
                  flexDirection: 'row',
                  width: '35%',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setRunning(true);
                    navigation.goBack();
                  }}
                  style={styles.startButtonContainer}>
                  <Icons name="home" size={30} color={'white'} />
                  <Text style={styles.modalLabel}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setRunning(true);
                    gameEngine.swap(Restart());
                  }}
                  style={styles.startButtonContainer}>
                  <Icons name="play" size={30} color={'white'} />
                  <Text style={styles.modalLabel}>Play</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
      </GameEngine>

      <StatusBar barStyle={'default'} hidden={true} />
    </LinearGradient>
  );
};

export default FlappyBird;
