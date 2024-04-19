import {StyleSheet} from 'react-native';
import { FONTFAMILY } from '../../../DefineObject';

export const PlayerVsComputerStyles = StyleSheet.create({
  container: {
    flex: 1,
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
    alignSelf: 'center',
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
    alignSelf: 'center',
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
  chevron_left_icon_container: {
    margin: 20,
  },
});
