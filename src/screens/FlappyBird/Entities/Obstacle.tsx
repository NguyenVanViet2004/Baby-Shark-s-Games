import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Matter from 'matter-js';
import {COLORS} from '../../../DefineObject';

const Obstacle = (props: any) => {
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;

  const xBody = props.body.position.x - widthBody / 2;
  const yBody = props.body.position.y - heightBody / 2;

  const color = props.color;

  return (
    <View
      style={{
        backgroundColor: 'green',
        borderColor: color,
        position: 'absolute',
        left: xBody,
        top: yBody,
        width: widthBody,
        height: heightBody,
      }}></View>
  );
};

export default (
  world: any,
  label: string,
  color: string,
  pos: {x: number; y: number},
  size: {width: number; height: number},
) => {
  const initialObstacle = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    {
      label: label,
      isStatic: true,
    },
  );
  Matter.World.add(world, initialObstacle);

  return {
    body: initialObstacle,
    color: color,
    pos,
    renderer: <Obstacle />,
  };
};

const styles = StyleSheet.create({});
