import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import MoviePageItemStars from '../../components/MoviePageItemStars';

// 使用 require 方式，TS 不会报错
const Ionicons = require('react-native-vector-icons/Ionicons').default;

export default function DetailPage({ route }: any) {
    const { movie } = route.params;

    return (
        <View style={styles.container}>
            {/* 顶部区域：横向布局 */}
            <View style={styles.topView}>
                {/* 左边：海报 */}
                <Image source={movie.image} style={styles.poster} resizeMode="cover" />

                {/* 右边：信息区 */}
                <View style={styles.infoContainer}>
                    <Text style={styles.title}>{movie.title}</Text>
                    <Text style={styles.year}>{movie.year || '年份：未知'}</Text>
                    <Text style={styles.desc} numberOfLines={3}>
                        {movie.desc || '暂无简介'}
                    </Text>
                    <View style={styles.scoreRow}>
                        <MoviePageItemStars score={movie.score} size={20} />
                        <Text style={styles.score}>{movie.score}</Text>
                    </View>

                    {/* Row：想看 / 看过 */}
                    <View style={styles.actionsRow}>
                        <TouchableOpacity style={[styles.actionBtn, { marginRight: 20 }]}>
                            <Ionicons name="eye-outline" size={16} color="#007AFF" style={{ marginRight: 6 }} />
                            <Text style={styles.actionText}>想看</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionBtn}>
                            <Ionicons name="checkmark-done-outline" size={16} color="#007AFF" style={{ marginRight: 6 }} />
                            <Text style={styles.actionText}>看过</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    scoreRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    score: {
        fontSize: 14,
        marginLeft: 8,
    },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    topView: {
        flexDirection: 'row',
    },
    poster: {
        width: '33%',
        height: 180,
        borderRadius: 8,
        marginRight: 12,
    },
    infoContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 4,
    },
    year: {
        fontSize: 14,
        color: '#666',
        marginBottom: 6,
    },
    desc: {
        fontSize: 14,
        color: '#333'
    },
    actionsRow: {
        flexDirection: 'row',
        marginTop: 12,
    },
    actionBtn: {
        flex: 1,
        flexDirection: 'row',    // icon + text 横向排列
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: '#007AFF',
        borderRadius: 6,
    },
    actionText: {
        fontSize: 14,
        color: '#007AFF',
    },
});
