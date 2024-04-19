import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {minesweeperStyles as styles} from './Minesweeper.styles';
import {COLORS} from '../../DefineObject';
import {useNavigation} from '@react-navigation/native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

// bài viết tham khảo https://aicurious.io/blog/2016-10-07-thuat-toan-sinh-min-trong-tro-choi-do-min-minesweeper

// Khai báo hằng số
const EMPTY = 0;
const MINE = 9;
const BOARD_SIZE = 16; // Kích thước bàn cờ
const NUM_MINES = 30; // Số lượng mìn

// Hàm tạo mảng 2D
const initializeArray = (rows: number, cols: number) => {
  return Array.from({length: rows}, () =>
    Array.from({length: cols}, () => ({value: EMPTY, revealed: false})),
  );
};

// Hàm sinh mìn ngẫu nhiên
const generateMines = (board: any[][]) => {
  const maxRow = board.length - 1;
  const maxCol = board[0].length - 1;
  let minesPlaced = 0;

  while (minesPlaced < NUM_MINES) {
    const row = Math.floor(Math.random() * (maxRow + 1));
    const col = Math.floor(Math.random() * (maxCol + 1));

    if (board[row][col].value !== MINE) {
      board[row][col].value = MINE;
      minesPlaced++;
    }
  }
};

// Hàm đếm số mìn xung quanh ô trống
const countNearbyMines = (board: any[][], row: number, col: number) => {
  let count = 0;
  for (let i = row - 1; i <= row + 1; i++) {
    for (let j = col - 1; j <= col + 1; j++) {
      if (
        i >= 0 &&
        i < board.length &&
        j >= 0 &&
        j < board[0].length &&
        board[i][j].value === MINE
      ) {
        count++;
      }
    }
  }
  return count;
};

const Minesweeper: React.FC = () => {
  const [board, setBoard] = React.useState<any[][]>(
    initializeArray(BOARD_SIZE, BOARD_SIZE),
  );
  const navigation = useNavigation();

  React.useEffect(() => {
    const newBoard = initializeArray(BOARD_SIZE, BOARD_SIZE);
    generateMines(newBoard);
    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        if (newBoard[i][j].value !== MINE) {
          newBoard[i][j].value = countNearbyMines(newBoard, i, j);
        }
      }
    }
    setBoard(newBoard);
  }, []);

  // Hàm xử lý sự kiện khi nhấn vào ô
  const handleCellPress = (row: number, col: number) => {
    const newBoard = [...board];
    if (newBoard[row][col].value === MINE) {
      newBoard[row][col].revealed = true;
      setBoard(newBoard);
      // hiển thị tất cả số boom
      for (let i = 0; i < newBoard.length; i++) {
        for (let j = 0; j < newBoard[0].length; j++) {
          if (newBoard[i][j].value === MINE) {
            newBoard[i][j].revealed = true;
          }
        }
      }
      setTimeout(() => {
        Alert.alert('Game Over', 'You clicked on a mine!', [
          {text: 'OK', onPress: () => resetBoard()},
        ]);
      }, 2000);
    } else {
      revealEmptyCells(newBoard, row, col);
    }
  };

  // Hàm hiển thị tất cả các ô xung quanh ô trống
  const revealEmptyCells = (
    currentBoard: any[][],
    row: number,
    col: number,
  ) => {
    if (
      row < 0 ||
      col < 0 ||
      row >= BOARD_SIZE ||
      col >= BOARD_SIZE ||
      currentBoard[row][col].revealed
    ) {
      return;
    }

    currentBoard[row][col].revealed = true;

    if (currentBoard[row][col].value === EMPTY) {
      for (let i = row - 1; i <= row + 1; i++) {
        for (let j = col - 1; j <= col + 1; j++) {
          revealEmptyCells(currentBoard, i, j);
        }
      }
    }
    setBoard([...currentBoard]);
  };

  // Hàm reset lại bàn cờ
  const resetBoard = () => {
    const newBoard = initializeArray(BOARD_SIZE, BOARD_SIZE);
    generateMines(newBoard);
    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        if (newBoard[i][j].value !== MINE) {
          newBoard[i][j].value = countNearbyMines(newBoard, i, j);
        }
      }
    }
    setBoard(newBoard);
  };

  // Hàm render ô
  const renderCell = (row: number, col: number) => {
    const cell = board[row][col];
    let cellText = '';
    if (cell.revealed) {
      cellText =
        cell.value === MINE ? '💣' : cell.value === EMPTY ? '' : cell.value;
    }

    return (
      <TouchableOpacity
        key={`${row}-${col}`}
        style={[styles.cell, cell.revealed && styles.revealedCell]}
        onPress={() => {
          handleCellPress(row, col);
        }}>
        <Text style={styles.cellText}>{cellText}</Text>
      </TouchableOpacity>
    );
  };

  // Hàm render hàng
  const renderRow = (row: number) => {
    return (
      <View key={row} style={styles.row}>
        {board[row].map((_, col) => renderCell(row, col))}
      </View>
    );
  };

  // Hàm render bàn cờ
  const renderBoard = () => {
    return board.map((_, row) => renderRow(row));
  };

  return (
    <LinearGradient
      colors={COLORS.minesweeperBackgroundColor}
      style={styles.container}>
      <SafeAreaView style={{alignSelf: 'flex-start'}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icons name="chevron-left" size={40} />
        </TouchableOpacity>
      </SafeAreaView>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.boardContainer}>
        {renderBoard()}
      </ScrollView>
    </LinearGradient>
  );
};

export default Minesweeper;
