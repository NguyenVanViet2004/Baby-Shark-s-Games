/* eslint-disable @typescript-eslint/no-shadow */
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
import {
  COLORS,
  FONTFAMILY,
  checkForWinner,
  initialBoardState,
} from '../../../DefineObject';
import SquareComponent from '../../../components/SquareComponent';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ResultsGame from '../../../components/ResultsGame';
import {useNavigation} from '@react-navigation/native';

const PlayerVsComputer = () => {
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

  const handlePlayerClick = (rowIndex: number, colIndex: number) => {
    const newClickHistory = [...xClickHistory, {rowIndex, colIndex}];
    setXClickHistory(newClickHistory);
    checkAndHandleTotalClick(newClickHistory, 'player');
  };

  const handleComputerClick = (rowIndex: number, colIndex: number) => {
    const newClickHistory = [...oClickHistory, {rowIndex, colIndex}];
    setOClickHistory(newClickHistory);
    checkAndHandleTotalClick(newClickHistory, 'computer');
  };

  const checkAndHandleTotalClick = (
    clickHistory: {rowIndex: number; colIndex: number}[],
    player: 'player' | 'computer',
  ) => {
    if (clickHistory.length === 4) {
      const updatedBoard = [...board];
      const {rowIndex: firstRow, colIndex: firstCol} = clickHistory[0];
      updatedBoard[firstRow][firstCol] = '';
      setBoard(updatedBoard);
      if (player === 'player') {
        setXClickHistory(clickHistory.slice(1));
      } else {
        setOClickHistory(clickHistory.slice(1));
      }
    }
  };

  const findBestMove = () => {
    let bestScore = -Infinity;
    let bestMove: {rowIndex: number; colIndex: number} | null = null;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === '') {
          board[i][j] = 'O';
          const score = minimax(board, 0, false);
          board[i][j] = '';
          if (score > bestScore) {
            bestScore = score;
            bestMove = {rowIndex: i, colIndex: j};
          }
        }
      }
    }

    return bestMove;
  };

  const minimax = (
    board: string[][],
    depth: number,
    isMaximizing: boolean,
  ): number => {
    const result = checkForWinner(board);
    if (result !== null) {
      return result === 'O' ? 10 - depth : -10 + depth;
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === '') {
            board[i][j] = 'O';
            const score = minimax(board, depth + 1, false);
            board[i][j] = '';
            bestScore = Math.max(score, bestScore);
          }
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === '') {
            board[i][j] = 'X';
            const score = minimax(board, depth + 1, true);
            board[i][j] = '';
            bestScore = Math.min(score, bestScore);
          }
        }
      }
      return bestScore;
    }
  };

  const handleClick = (rowIndex: number, colIndex: number) => {
    // Check if the square is already filled or if there's already a winner
    if (board[rowIndex][colIndex] === '' && !winner) {
      // display X to screen
      const newBoard = [...board];
      newBoard[rowIndex][colIndex] = 'X';
      setBoard(newBoard);
      // save
      handlePlayerClick(rowIndex, colIndex);
      setTurn(2); // Change turn to computer
      const bestMove = findBestMove();
      if (bestMove) {
        setTimeout(() => {
          const {rowIndex: bestRow, colIndex: bestCol} = bestMove;
          newBoard[bestRow][bestCol] = 'O';
          setBoard(newBoard);
          handleComputerClick(bestRow, bestCol);
          setTurn(1); // Change turn to 1
          const result = checkForWinner(newBoard); // check for winner again
          if (result) {
            setWinner(result);
            setModalVisible(true);
          }
        }, 1000);
      }
    }
  };

  const reMove = () => {
    const newBoard = [...board];
    newBoard[xClickHistory[xClickHistory.length - 1].rowIndex][
      xClickHistory[xClickHistory.length - 1].colIndex
    ] = '';
    newBoard[oClickHistory[oClickHistory.length - 1].rowIndex][
      oClickHistory[oClickHistory.length - 1].colIndex
    ] = '';
    setBoard(newBoard);
    const newXClickHistory = xClickHistory.slice(0, xClickHistory.length - 1);
    setXClickHistory(newXClickHistory);
    const newOClickHistory = oClickHistory.slice(0, oClickHistory.length - 1);
    setOClickHistory(newOClickHistory);
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
    setTurn(1);
    setWinner(null);
    setModalVisible(false);
  };

  const navigation = useNavigation();

  const exitGame = () => {
    setModalVisible(false);
    navigation.reset({
      index: 0,
      routes: [{name: 'MenuGame' as never}],
    });
  };

  return (
    <LinearGradient colors={COLORS.backGround} style={styles.container}>
      <SafeAreaView style={styles.headerContainer}>
        <View style={styles.playerElement}>
          <MaterialIcon
            name="account"
            size={80}
            color={turn === 1 ? 'red' : 'gray'}
          />
          <Text style={styles.playerTitle}>You</Text>
        </View>
        <Image
          source={require('../../../assets/images/vs_icon.png')}
          style={styles.vs_icon}
        />
        <View style={styles.playerElement}>
          <MaterialIcon
            name="robot-angry"
            size={80}
            color={turn === 2 ? 'blue' : 'gray'}
          />
          <Text style={styles.playerTitle}>Computer</Text>
        </View>
      </SafeAreaView>
      {/* board */}
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
        <TouchableOpacity onPress={reMove}>
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
        title={winner === 'X' ? 'You win' : 'You lose'}
        icon={
          winner === 'X'
            ? require('../../../assets/images/win_icon.gif')
            : require('../../../assets/images/lose_icon.gif')
        }
        newGameFunction={() => newGame()}
        exitFunction={() => exitGame()}
      />
    </LinearGradient>
  );
};

export default PlayerVsComputer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  lineColorBottom: {
    borderTopWidth: 1,
    borderColor: 'white',
    height: 1,
    width: '75%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontFamily: FONTFAMILY.JetBrainsMono_Medium,
  },
  elementContainer: {
    flex: 1,
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30,
  },
  vs_icon: {
    width: 70,
    height: 60,
  },
  playerElement: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  playerTitle: {
    fontFamily: FONTFAMILY.JetBrainsMono_Medium,
  },
  backIcon: {
    width: 50,
    height: 50,
  },
  backIconContainer: {
    padding: 10,
    borderRadius: 100,
  },
});
