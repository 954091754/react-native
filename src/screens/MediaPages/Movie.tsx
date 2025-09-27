import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function MoviePage() {
    return (
        <View style={styles.container}>
            <View style={styles.actionRow}>
                <TouchableOpacity style={styles.actionItem} onPress={() => { /* TODO: navigate or show search */ }} accessibilityRole="button">
                    <Text style={styles.actionIcon}>🔍</Text>
                    <Text style={styles.actionLabel}>找电影</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionItem} onPress={() => { /* TODO: open charts */ }} accessibilityRole="button">
                    <Text style={styles.actionIcon}>📈</Text>
                    <Text style={styles.actionLabel}>豆瓣榜单</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionItem} onPress={() => { /* TODO: guess feature */ }} accessibilityRole="button">
                    <Text style={styles.actionIcon}>🎲</Text>
                    <Text style={styles.actionLabel}>豆瓣猜</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionItem} onPress={() => { /* TODO: ticket list */ }} accessibilityRole="button">
                    <Text style={styles.actionIcon}>🎟️</Text>
                    <Text style={styles.actionLabel}>豆瓣票单</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 22, fontWeight: '700', marginBottom: 8 },
    body: { fontSize: 14, color: '#666' },
    actionRow: {
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 12,
        marginVertical: 12,
        justifyContent: 'space-between',
    },
    actionItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionIcon: {
        fontSize: 28,
        marginBottom: 6,
    },
    actionLabel: {
        fontSize: 12,
        color: '#333',
    },
});