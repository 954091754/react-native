import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Platform,
} from 'react-native';

type Props = {
  onFinish: () => void;
};

export default function Splash({onFinish}: Props) {
  const [remaining, setRemaining] = useState<number>(3);
  const {width} = Dimensions.get('window');

  useEffect(() => {
    if (remaining <= 0) {
      onFinish();
      return;
    }
    const id = setTimeout(() => setRemaining(r => r - 1), 1000);
    return () => clearTimeout(id);
  }, [remaining, onFinish]);

  const circleSize = Math.round(width * 0.3);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" translucent={false} />

      <View style={styles.wrapper}>
        {/* Center column with circular image and title */}
        <View style={styles.centerColumn}>
          <View
            style={[
              styles.circle,
              {width: circleSize, height: circleSize, borderRadius: circleSize / 2},
            ]}>
            <Image source={ require('../../assets/images/home.png')} style={styles.circleImage} resizeMode="cover" />
          </View>

          <Text style={styles.title}>Welcome to Galaxy</Text>
        </View>

        {/* Top-right countdown */}
        <View style={styles.topRight} pointerEvents="none">
          <View style={styles.countPill}>
            <Text style={styles.countText}>{remaining} s</Text>
          </View>
        </View>

        {/* Bottom-centered launcher icon, ~80px above bottom */}
        <View style={styles.bottomIconWrap} pointerEvents="none">
          <Image source={require('../../assets/images/ic_launcher.png')} style={styles.launcher} resizeMode="contain" />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: '#ffffff'},
  wrapper: {flex: 1, backgroundColor: '#fff'},
  centerColumn: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  circle: {
    overflow: 'hidden',
    backgroundColor: '#eee',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 8,
        shadowOffset: {width: 0, height: 4},
      },
      android: {elevation: 6},
    }),
  },
  circleImage: {width: '100%', height: '100%'},
  title: {marginTop: 16, fontSize: 20, color: '#000', fontWeight: '600'},
  topRight: {position: 'absolute', top: 8, right: 12},
  countPill: {backgroundColor: 'rgba(0,0,0,0.4)', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 20},
  countText: {color: '#fff', fontSize: 14},
  bottomIconWrap: {position: 'absolute', left: 0, right: 0, bottom: 80, alignItems: 'center'},
  launcher: {width: 50, height: 50},
});
