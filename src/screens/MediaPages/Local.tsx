import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function LocalPage() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>同城</Text>
            <Text style={styles.body}>这里显示本地活动、电影与展映信息。</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 22, fontWeight: '700', marginBottom: 8 },
    body: { fontSize: 14, color: '#666' },
});