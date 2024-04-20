import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('screen');

export const getRandom = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getPipeSizePosPair = (addToPos = 0) => {
  let yPosTop = -getRandom(300, height - 100);

  const pipeTop = {
    pos: {x: width + addToPos, y: yPosTop},
    size: {height: height * 2, width: 75},
  };

  const pipeBottom = {
    pos: {x: width + addToPos, y: height * 2 + 200 +  yPosTop},
    size: {height: height * 2, width: 75},
  };

  return {
    pipeTop,
    pipeBottom,
  }
};
