import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

export default function Home() {
  return (
    <ScrollView contentContainerStyle={styles.center}>
      <Text style={styles.title}>首页</Text>
      <Text style={styles.body}>这是首页内容。</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: {flexGrow: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 24},
  title: {fontSize: 24, fontWeight: '700', marginBottom: 8},
  body: {fontSize: 14, color: '#666', marginBottom: 12},
});
