import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function Me() {
  return (
    <View style={styles.center}>
      <Text style={styles.title}>我的</Text>
      <Text style={styles.body}>个人信息与设置</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  title: {fontSize: 24, fontWeight: '700', marginBottom: 8},
  body: {fontSize: 14, color: '#666'},
});
