import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const BANNER_HEIGHT = Math.round(width * 0.5);

export default function MoviePage() {
    const banners = [
        require('../../assets/images/banner_blsj.jpeg'),
        require('../../assets/images/banner_pfzy.jpeg'),
        require('../../assets/images/banner_qz.jpeg'),
    ];

    const scrollRef = useRef<any>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedTab, setSelectedTab] = useState(0);

    // Auto-advance every 3 seconds
    useEffect(() => {
        const id = setInterval(() => {
            setCurrentIndex(prev => {
                const next = (prev + 1) % banners.length;
                if (scrollRef.current) {
                    scrollRef.current.scrollTo({ x: next * width, animated: true });
                }
                return next;
            });
        }, 3000);
        return () => clearInterval(id);
    }, []);

    const onMomentumScrollEnd = (e: any) => {
        const offsetX = e.nativeEvent.contentOffset.x || 0;
        const index = Math.round(offsetX / width);
        setCurrentIndex(index);
    };

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

            <View style={styles.bannerContainer}>
                <ScrollView
                    ref={scrollRef}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={onMomentumScrollEnd}
                >
                    {banners.map((src, i) => (
                        <Image key={i} source={src} style={{ width, height: BANNER_HEIGHT }} resizeMode="cover" />
                    ))}
                </ScrollView>
            </View>

            <View style={styles.dotsContainer}>
                {banners.map((_, i) => (
                    <View key={i} style={[styles.dot, i === currentIndex && styles.activeDot]} />
                ))}
            </View>

            <View style={styles.tabWrapper}>
                <View style={styles.tabsLeft}>
                    <TouchableOpacity style={[styles.tabItem, selectedTab === 0 && styles.tabItemActive]} onPress={() => setSelectedTab(0)}>
                        <Text style={[styles.tabText, selectedTab === 0 && styles.tabTextActive]}>影院热映</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.tabItem, selectedTab === 1 && styles.tabItemActive]} onPress={() => setSelectedTab(1)}>
                        <Text style={[styles.tabText, selectedTab === 1 && styles.tabTextActive]}>即将上映</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.tabRight} onPress={() => { /* TODO: handle "all" action */ }} accessibilityRole="button">
                    <Text style={styles.allText}>全部 &gt;</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: '#fff' },
    title: { fontSize: 22, fontWeight: '700', marginBottom: 8 },
    body: { fontSize: 14, color: '#666' },
    bannerContainer: {
        width: '100%',
        height: BANNER_HEIGHT,
        marginBottom: 12,
    },
    dotsContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#d0d0d0',
        marginHorizontal: 6,
        borderWidth: 0,
    },
    activeDot: {
        backgroundColor: '#007aff',
        width: 10,
        height: 10,
        borderRadius: 5,
    },
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
    tabWrapper: {
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 12,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    tabsLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    tabItem: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginRight: 8,
        borderRadius: 4,
    },
    tabItemActive: {
        borderBottomWidth: 2,
        borderBottomColor: '#007aff',
    },
    tabText: {
        fontSize: 14,
        color: '#333',
    },
    tabTextActive: {
        color: '#007aff',
        fontWeight: '600',
    },
    tabRight: {
        paddingVertical: 6,
        paddingHorizontal: 8,
    },
    allText: {
        color: '#666',
        fontSize: 13,
    },
});