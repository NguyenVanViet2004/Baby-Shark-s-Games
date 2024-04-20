import Matter from 'matter-js';
import { Dimensions } from 'react-native';
import { getPipeSizePosPair } from '../Utils/Random';

const {width, height} = Dimensions.get('window');

const Physics = (
  entities: any,
  {touches, time, dispatch}: {touches: any; time: any; dispatch: any},
) => {
  let engine = entities.physics.engine;
  touches
    .filter((t: {type: any}) => t.type === 'press')
    .forEach((t: {t: any}) => {
      Matter.Body.setVelocity(entities.Bird.body, {
        x: 0,
        y: -6,
      });
    });
  Matter.Engine.update(engine, time.delta);

  for (let index = 1; index <= 2; index++) {

    if (entities[`ObstacleTop${index}`].body.bounds.max.x <= 50 && !entities[`ObstacleTop${index}`].point) {
        entities[`ObstacleTop${index}`].point = true;
        dispatch({type: 'addPoint'});
    }

    if (entities[`ObstacleTop${index}`].body.bounds.max.x <= 0) {
        const pipeSizePos = getPipeSizePosPair(width * 0.9)
        Matter.Body.setPosition(entities[`ObstacleTop${index}`].body, pipeSizePos.pipeTop.pos);
        Matter.Body.setPosition(entities[`ObstacleBottom${index}`].body, pipeSizePos.pipeBottom.pos);
    }
    Matter.Body.translate(entities[`ObstacleTop${index}`].body, {x: -3, y: 0});
    Matter.Body.translate(entities[`ObstacleBottom${index}`].body, {x: -3, y: 0});
  }

  Matter.Events.on(engine, 'collisionStart', (event) => {
    dispatch({type: 'gameOver'});
    });

  return entities;
};

export default Physics;
