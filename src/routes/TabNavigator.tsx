// TabRoutes.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomTabBar from '../components/CustomTabBar'; // Importando o novo componente
import Home from '../screens/tab/Home';
import theme from '../theme';

export type TabRoutesProps = {
  Home: undefined;
  Bookmarks: undefined;
  List: undefined;
  Downloads: undefined;
};

const Tab = createBottomTabNavigator<TabRoutesProps>();

export function TabRoutes() {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />} // Usando o CustomTabBar
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Bookmarks" component={Home} />
      <Tab.Screen name="Downloads" component={Home} />
      <Tab.Screen name="List" component={Home} />
    </Tab.Navigator>
  );
}
