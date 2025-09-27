import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function BookPage() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>读书</Text>
            <Text style={styles.body}>这里显示书籍推荐、书单与分类。</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 22, fontWeight: '700', marginBottom: 8 },
    body: { fontSize: 14, color: '#666' },
});