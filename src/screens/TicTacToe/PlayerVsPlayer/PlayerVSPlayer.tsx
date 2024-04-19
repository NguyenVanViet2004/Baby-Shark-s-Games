import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, checkForWinner, initialBoardState} from '../../../DefineObject';
import SquareComponent from '../../../components/SquareComponent';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from './PlayerVsPlayer.styles';
import ResultsGame from '../../../components/ResultsGame';
import {useNavigation} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';

const PlayerVsPlayer = () => {
  const [board, setBoard] = React.useState(initialBoardState);
  const [xClickHistory, setXClickHistory] = React.useState<
    {rowIndex: number; colIndex: number}[]
  >([]);
  const [oClickHistory, setOClickHistory] = React.useState<
    {rowIndex: number; colIndex: number}[]
  >([]);
  const [turn, setTurn] = React.useState(1); // 1 for X, 2 for O
  const [winner, setWinner] = React.useState<null | string>(null);
  const [modalVisible, setModalVisible] = React.useState(false);

  useFocusEffect(
    React.useCallback(() => {
      newGame();
    }, []),
  );

  // player 1
  const handlePlayer1Click = (rowIndex: number, colIndex: number) => {
    const newClickHistory = [...xClickHistory, {rowIndex, colIndex}];
    setXClickHistory(newClickHistory);
    checkAndHandleTotalClick(newClickHistory, 'player_1');
  };
  // player 2
  const handlePlayer2Click = (rowIndex: number, colIndex: number) => {
    const newClickHistory = [...oClickHistory, {rowIndex, colIndex}];
    setOClickHistory(newClickHistory);
    checkAndHandleTotalClick(newClickHistory, 'player_2');
  };
  // save history
  const checkAndHandleTotalClick = (
    clickHistory: {rowIndex: number; colIndex: number}[],
    player: 'player_1' | 'player_2',
  ) => {
    if (clickHistory.length === 4) {
      const updatedBoard = [...board];
      const {rowIndex: firstRow, colIndex: firstCol} = clickHistory[0];
      updatedBoard[firstRow][firstCol] = '';
      setBoard(updatedBoard);
      if (player === 'player_1') {
        setXClickHistory(clickHistory.slice(1));
      } else {
        setOClickHistory(clickHistory.slice(1));
      }
    }
  };

  const handleClick = (rowIndex: number, colIndex: number) => {
    // Check if the square is already filled or if there's already a winner
    if (board[rowIndex][colIndex] === '' && !winner) {
      const newBoard = [...board];
      newBoard[rowIndex][colIndex] = turn === 1 ? 'X' : 'O';
      setBoard(newBoard);
      // saveClickHistory(rowIndex, colIndex);
      turn === 1
        ? handlePlayer1Click(rowIndex, colIndex)
        : handlePlayer2Click(rowIndex, colIndex);
      setTurn(turn === 1 ? 2 : 1); // Change turn
      const result = checkForWinner(newBoard); // check for winner
      if (result) {
        setWinner(result);
        setTimeout(() => {
          setModalVisible(true);
        }, 2000);
      }
    }
  };

  const reMove = () => {
    const newBoard = [...board];
    if (turn === 1 && oClickHistory.length > 0) {
      newBoard[oClickHistory[oClickHistory.length - 1].rowIndex][
        oClickHistory[oClickHistory.length - 1].colIndex
      ] = '';
      const newOClickHistory = oClickHistory.slice(0, oClickHistory.length - 1);
      setOClickHistory(newOClickHistory);
      setTurn(2);
      setBoard(newBoard);
    }
    if (turn === 2 && xClickHistory.length > 0) {
      newBoard[xClickHistory[xClickHistory.length - 1].rowIndex][
        xClickHistory[xClickHistory.length - 1].colIndex
      ] = '';
      const newXClickHistory = xClickHistory.slice(0, xClickHistory.length - 1);
      setXClickHistory(newXClickHistory);
      setTurn(1);
      setBoard(newBoard);
    }
  };

  const newGame = () => {
    const newHistory: {rowIndex: number; colIndex: number}[] = [];
    setBoard([
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]);
    setXClickHistory(newHistory);
    setOClickHistory(newHistory);
    console.log(initialBoardState, board, xClickHistory, oClickHistory);
    setTurn(1);
    setWinner(null);
    setModalVisible(false);
  };

  const navigation = useNavigation();

  const exitGame = () => {
    newGame();
    setModalVisible(false);
    navigation.reset({
      index: 0,
      routes: [{name: 'MenuGame' as never}],
    });
  };

  return (
    <LinearGradient colors={COLORS.backGround} style={styles.container}>
      <SafeAreaView style={styles.chevron_left_icon_container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcon name="chevron-left" size={40} color={'white'} />
        </TouchableOpacity>
      </SafeAreaView>
      <SafeAreaView style={styles.headerContainer}>
        <View style={styles.playerElement}>
          <MaterialIcon
            name="account"
            size={80}
            color={turn === 1 ? 'red' : 'gray'}
          />
          <Text style={styles.playerTitle}>Player 1</Text>
        </View>
        <Image
          source={require('../../../assets/images/vs_icon.png')}
          style={styles.vs_icon}
        />
        <View style={styles.playerElement}>
          <MaterialIcon
            name="account"
            size={80}
            color={turn === 2 ? 'blue' : 'gray'}
          />
          <Text style={styles.playerTitle}>Player 2</Text>
        </View>
      </SafeAreaView>
      {board.map((row, rowIndex) => (
        <View key={rowIndex}>
          <SquareComponent
            value={row}
            rowIndex={rowIndex}
            onPress={handleClick}
            winner={winner}
            firstXClick={xClickHistory[0]}
            firstOClick={oClickHistory[0]}
            lengthX={xClickHistory.length}
            lengthO={oClickHistory.length}
            turn={turn}
          />
        </View>
      ))}
      <View style={styles.lineColorBottom}>
        <TouchableOpacity onPress={reMove} disabled={winner ? true : false}>
          <LinearGradient
            colors={['blue', 'lightyellow']}
            style={styles.backIconContainer}>
            <Image
              source={require('../../../assets/images/back.png')}
              style={styles.backIcon}
            />
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <ResultsGame
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title={`${winner === 'X' ? 'Player 1 Win!' : 'Player 2 win!'}`}
        icon={require('../../../assets/images/win_icon.gif')}
        newGameFunction={() => newGame()}
        exitFunction={() => exitGame()}
      />
    </LinearGradient>
  );
};

export default PlayerVsPlayer;
