import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Profile() {
  return (
    <View style={styles.center}>
      <Text style={styles.title}>我</Text>
      <Text style={styles.body}>个人中心 / 设置</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 8 },
  body: { fontSize: 14, color: '#666' },
});
