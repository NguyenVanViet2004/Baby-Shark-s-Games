import Matter from 'matter-js';
import Bird from './Bird';
import {COLORS} from '../../../DefineObject';
import Floor from './Floor';
import {Dimensions} from 'react-native';
import Obstacle from './Obstacle';
import {getPipeSizePosPair} from '../Utils/Random';

const {width, height} = Dimensions.get('window');

const Restart = () => {
  let engine = Matter.Engine.create({enableSleeping: false});
  let world = engine.world;
  // set trọng lực
  world.gravity.y = 0.4;

  const pipeSizePosA = getPipeSizePosPair();
  const pipeSizePosB = getPipeSizePosPair(width * 0.9);

  return {
    physics: {engine, world},
    Bird: Bird(world, COLORS.green, {x: 50, y: 300}, {width: 40, height: 40}),

    ObstacleTop1: Obstacle( world, 'ObstacleTop1', COLORS.red, pipeSizePosA.pipeTop.pos, pipeSizePosA.pipeTop.size),
    ObstacleBottom1: Obstacle( world, 'ObstacleBottom1', COLORS.green, pipeSizePosA.pipeBottom.pos, pipeSizePosA.pipeBottom.size,),

    ObstacleTop2: Obstacle( world, 'ObstacleTop2', COLORS.red, pipeSizePosB.pipeTop.pos, pipeSizePosB.pipeTop.size),
    ObstacleBottom2: Obstacle( world, 'ObstacleBottom2', COLORS.green, pipeSizePosB.pipeBottom.pos, pipeSizePosB.pipeBottom.size,),

    Floor: Floor(
      world,
      COLORS.light_yellow,
      {x: width / 2, y: height},
      {width: width, height: 40},
    ),
  };
};

export default Restart;
