import {StyleSheet} from 'react-native';
import {FONTFAMILY} from '../../../DefineObject';

export const styles = StyleSheet.create({
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
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30,
  },
  vs_icon: {
    width: 70,
    height: 75,
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
