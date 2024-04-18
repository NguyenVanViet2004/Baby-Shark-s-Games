/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {View, Pressable, Text, StyleSheet, Dimensions} from 'react-native';
import {FONTFAMILY} from '../DefineObject';

const {width, height} = Dimensions.get('window');

const SquareComponent = ({
  value,
  rowIndex,
  onPress,
  winner,
  firstXClick,
  firstOClick,
  lengthX,
  lengthO,
  turn,
}: {
  value: string[];
  rowIndex: number;
  onPress: Function;
  winner: string | null;
  firstXClick: {rowIndex: number; colIndex: number} | undefined;
  firstOClick: {rowIndex: number; colIndex: number} | undefined;
  lengthX: number;
  lengthO: number;
  turn: number;
}) => {
  const checkFirstClick = (row: number, col: number): boolean => {
    if (
      (row === firstOClick?.rowIndex &&
        col === firstOClick?.colIndex &&
        lengthO === 3 &&
        turn === 2) ||
      (row === firstXClick?.rowIndex &&
        col === firstXClick?.colIndex &&
        lengthX === 3 &&
        turn === 1)
    ) {
      return true;
    }
    return false;
  };

  const getColor = (val: string, win: string | null): string => {
    if (val === 'X') {
      return win === 'X' || win === 'O' ? 'white' : 'red';
    } else {
      return win === 'O' ? 'white' : '#00f7ff';
    }
  };

  return (
    <View style={styles.row}>
      {/* [row][0] */}
      <Pressable
        onPress={() => onPress(rowIndex, 0)}
        style={[
          styles.firstItem,
          winner === 'X' && value[0] === 'X' && styles.xWin,
          winner === 'O' && value[1] === 'O' && styles.oWin,
        ]}>
        <Text
          style={[
            styles.text,
            {color: getColor(value[0], winner)},
            checkFirstClick(rowIndex, 0) && styles.firstClick,
          ]}>
          {value[0]}
        </Text>
      </Pressable>
      {/* [row][1] */}
      <Pressable
        onPress={() => onPress(rowIndex, 1)}
        style={[
          styles.secondItem,
          winner === 'X' && value[1] === 'X' && styles.xWin,
          winner === 'O' && value[1] === 'O' && styles.oWin,
        ]}>
        <Text
          style={[
            styles.text,
            {color: getColor(value[1], winner)},
            checkFirstClick(rowIndex, 1) && styles.firstClick,
          ]}>
          {value[1]}
        </Text>
      </Pressable>
      {/* [row][2] */}
      <Pressable
        onPress={() => onPress(rowIndex, 2)}
        style={[
          styles.thirdItem,
          winner === 'X' && value[2] === 'X' && styles.xWin,
          winner === 'O' && value[2] === 'O' && styles.oWin,
        ]}>
        <Text
          style={[
            styles.text,
            {color: getColor(value[2], winner)},
            checkFirstClick(rowIndex, 2) && styles.firstClick,
          ]}>
          {value[2]}
        </Text>
      </Pressable>
    </View>
  );
};

export default SquareComponent;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  firstItem: {
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderColor: 'white',
    width: (width * 1) / 4,
    height: (height * 1) / 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondItem: {
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderColor: 'white',
    width: (width * 1) / 4,
    height: (height * 1) / 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thirdItem: {
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderColor: 'white',
    width: (width * 1) / 4,
    height: (height * 1) / 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
    fontFamily: FONTFAMILY.JetBrainsMono_Bold,
  },
  firstClick: {
    opacity: 0.5,
  },
  xWin: {
    backgroundColor: '#ff00006c',
  },
  oWin: {
    backgroundColor: '#2fdbe182',
    opacity: 0.5,
  },
});
