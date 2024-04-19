import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Matter from 'matter-js';

const Bird = (props: any) => {
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;

  const xBody = props.body.position.x - widthBody / 2;
  const yBody = props.body.position.y - heightBody / 2;

  const color = props.color;

  return (
    <Image
      source={require('../../../assets/images/flappy_bird_icon.png')}
      style={{
        width: widthBody * 1.5,
        height: heightBody * 1.5,
        resizeMode: 'stretch',
        position: 'absolute',
        left: xBody,
        top: yBody,
      }}
    />
  );
};

export default (
  world: any,
  color: string,
  pos: {x: number; y: number},
  size: {width: number; height: number},
) => {
  const initialBird = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    {
      label: 'Bird',
    },
  );
  Matter.World.add(world, initialBird);

  return {
    body: initialBird,
    color: color,
    pos,
    renderer: <Bird />,
  };
};

const styles = StyleSheet.create({});
