import React, {useState} from 'react';
import Splash from './src/screens/Splash/Splash';
import RootPage from './src/pages/RootPage';

export default function App(): JSX.Element {
  const [showSplash, setShowSplash] = useState<boolean>(true);

  return showSplash ? <Splash onFinish={() => setShowSplash(false)} /> : <RootPage />;
}
