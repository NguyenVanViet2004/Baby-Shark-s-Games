import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import PlayerVsPlayer from './src/screens/TicTacToe/PlayerVsPlayer/PlayerVSPlayer';
import PlayerVsComputer from './src/screens/TicTacToe/PlayerVsComputer/PlayerVsComputer';
import SplashScreen from './src/screens/SplashScreen/SplashScreen';
import MenuGame from './src/screens/MenuGame/MenuGame';
import TicTacToeHome from './src/screens/TicTacToe/TicTacToeHome';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animationEnabled: true,
        }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="MenuGame" component={MenuGame} />
        <Stack.Screen name="TicTacToeHome" component={TicTacToeHome} />
        <Stack.Screen name="PlayerVsPlayer" component={PlayerVsPlayer} />
        <Stack.Screen name="PlayerVsComputer" component={PlayerVsComputer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
