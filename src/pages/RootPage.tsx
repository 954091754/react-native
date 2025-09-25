import React, {useState} from 'react';
import {SafeAreaView, StatusBar, View, StyleSheet} from 'react-native';
import TabBar, {TabKey} from '../components/TabBar';
import Home from '../screens/Home';
import Contacts from '../screens/Contacts';
import Moments from '../screens/Moments';
import Me from '../screens/Me';

export default function RootPage() {
  const [active, setActive] = useState<TabKey>('home');

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" translucent={false} />
      <View style={styles.container}>
        <View style={styles.content}>
          {active === 'home' && <Home />}
          {active === 'contacts' && <Contacts />}
          {active === 'moments' && <Moments />}
          {active === 'me' && <Me />}
        </View>

        <TabBar active={active} onChange={k => setActive(k)} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: '#fff'},
  container: {flex: 1},
  content: {flex: 1},
});
