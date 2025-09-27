import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Media() {
  return (
    <View style={styles.center}>
      <Text style={styles.title}>书影音</Text>
      <Text style={styles.body}>书籍、电影与音乐的推荐与分类</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 8 },
  body: { fontSize: 14, color: '#666' },
});
