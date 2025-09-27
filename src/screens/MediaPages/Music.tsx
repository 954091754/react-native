import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MusicPage() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>音乐</Text>
            <Text style={styles.body}>这里显示音乐排行榜、专辑与歌单。</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 22, fontWeight: '700', marginBottom: 8 },
    body: { fontSize: 14, color: '#666' },
});