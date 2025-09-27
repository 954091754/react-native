import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function VarietyPage() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>综艺</Text>
            <Text style={styles.body}>这里显示综艺节目、排行与专题。</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 22, fontWeight: '700', marginBottom: 8 },
    body: { fontSize: 14, color: '#666' },
});