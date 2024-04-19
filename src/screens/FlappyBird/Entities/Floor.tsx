import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Matter from 'matter-js';

const Floor = (props: any) => {
  
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;

  const xBody = props.body.position.x - widthBody / 2;
  const yBody = props.body.position.y - heightBody / 2;

  const color = props.color;

  return (
    <View
      style={{
        backgroundColor: color,
        position: 'absolute',
        left: xBody,
        top: yBody,
        width: widthBody,
        height: heightBody,
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
  const initialFloor  = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    {
      label: 'Floor',
      isStatic: true, 
    },
  );
  Matter.World.add(world, initialFloor );

  return {
    body: initialFloor ,
    color: color,
    pos,
    renderer: <Floor />,
  };
};

const styles = StyleSheet.create({});
