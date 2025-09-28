import React, { useState } from 'react';
import Splash from './src/screens/Splash/Splash';
import RootPage from './src/pages/RootPage';
import DetailPage from './src/screens/MediaPages/DetailPage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

type RootStackParamList = {
  RootPage: undefined;
  DetailPage: { movie: any };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App(): JSX.Element {
  const [showSplash, setShowSplash] = useState<boolean>(true);

  if (showSplash) {
    return <Splash onFinish={() => setShowSplash(false)} />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* 入口页面 */}
        <Stack.Screen
          name="RootPage"
          component={RootPage}
          options={{ headerShown: false }}
        />

        {/* 详情页 */}
        <Stack.Screen
          name="DetailPage"
          component={DetailPage}
          options={{ title: '详情', headerTitleAlign: 'center' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
