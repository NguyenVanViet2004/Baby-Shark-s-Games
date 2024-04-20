import {StyleSheet} from 'react-native';
import {COLORS, FONTFAMILY} from '../../DefineObject';

export const FlappyBirdStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    padding: 10,
    marginHorizontal: 30,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 30,
    fontFamily: FONTFAMILY.JetBrainsMono_Bold,
    color: COLORS.light_yellow,
    flex: 1,
  },
  startButtonContainer: {
    alignItems: 'center',
    gap: 5,
  },
  startLabel: {
    fontSize: 30,
    fontFamily: FONTFAMILY.JetBrainsMono_Bold,
    color: COLORS.white,
    textAlign: 'center',
    alignSelf: 'center',
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.modalBackGroundColor,
    gap: 50,
  },
  modalLabel: {
    fontFamily: FONTFAMILY.JetBrainsMono_Bold,
    color: COLORS.white,
    textAlign: 'center',
  },
});
