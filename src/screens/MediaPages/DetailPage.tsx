import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import MoviePageItemStars from '../../components/MoviePageItemStars';

// 使用 require 方式，TS 不会报错
const Ionicons = require('react-native-vector-icons/Ionicons').default;

export default function DetailPage({ route }: any) {
    const { movie } = route.params;

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
            {/* 顶部区域：横向布局 */}
            <View style={styles.topView}>
                {/* 左边：海报 */}
                <Image source={movie.image} style={styles.poster} resizeMode="cover" />

                {/* 右边：信息区 */}
                <View style={styles.infoContainer}>
                    <Text style={styles.title}>{movie.title}</Text>
                    <Text style={styles.year}>{movie.year || '年份：未知'}</Text>
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

            {/* 分割线 */}
            <View style={styles.divider} />

            {/* 剧情简介 */}
            <Text style={styles.sectionTitle}>剧情简介</Text>
            <Text style={styles.desc}>{movie.desc || '这里是完整的剧情简介占位文本。你可以把真实的电影简介、演职员信息、时长、类型等放在这里。 目前用于演示页面布局，支持多行显示并随页面滚动查看。'}</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    scoreRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    score: {
        fontSize: 14,
        marginLeft: 8,
    },
    actionsRow: {
        flexDirection: 'row',
        marginTop: 12,
    },
    actionBtn: {
        flex: 1,
        flexDirection: 'row',
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
    divider: {
        height: 1,
        backgroundColor: '#eee',
        marginVertical: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 8,
    },
    desc: {
        fontSize: 14,
        color: '#333',
        lineHeight: 20,
    },
});
