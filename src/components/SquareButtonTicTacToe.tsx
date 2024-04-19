import {Pressable, Text} from 'react-native';

const SquareButton = ({
  onPress,
  buttonStyles,
  value,
  valueStyles,
  rowIndex,
  colIndex,
}: {
  onPress: Function;
  buttonStyles: any;
  value: string;
  valueStyles: any;
  rowIndex: number;
  colIndex: number;
}) => {
  return (
    <Pressable onPress={() => onPress(rowIndex, colIndex)} style={buttonStyles}>
      <Text style={valueStyles}>{value}</Text>
    </Pressable>
  );
};

export default SquareButton;
