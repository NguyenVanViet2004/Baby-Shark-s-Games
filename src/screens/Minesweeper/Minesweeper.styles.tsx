import {StyleSheet} from 'react-native';
import { FONTFAMILY } from '../../DefineObject';

export const minesweeperStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 30,
    height: 30,
    margin: 1,
    backgroundColor: '#ADD8E6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  revealedCell: {
    backgroundColor: '#FFFFFF',
  },
  cellText: {
    fontSize: 16,
    fontFamily: FONTFAMILY.JetBrainsMono_Bold
  },
});
