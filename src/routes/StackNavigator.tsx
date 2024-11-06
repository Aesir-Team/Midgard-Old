import React from 'react';
import { TabRoutes, TabRoutesProps } from './TabNavigator'; // Importe o TabNavigator
import { NavigatorScreenParams, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


export type StackRoutesProps = {
  Tab: NavigatorScreenParams<TabRoutesProps>;
}

const Stack = createStackNavigator<StackRoutesProps>();

export function AppNavigator() {

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tab"
        component={TabRoutes} // O TabNavigator é usado aqui
        options={{ headerShown: false }} // Oculta o cabeçalho na tela Home
      />

    </Stack.Navigator>
  );
}