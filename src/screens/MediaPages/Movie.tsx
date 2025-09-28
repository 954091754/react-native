import React, { useRef, useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    Dimensions,
    FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import MoviePageItemStars from '../../components/MoviePageItemStars';

const { width } = Dimensions.get('window');
const BANNER_HEIGHT = Math.round(width * 0.5);

const PADDING_HORIZONTAL = 12; // 列表左右 padding
const ITEM_SPACING = 10; // item 间隔
const NUM_COLUMNS = 3;

// 每个 item 宽度 = 屏幕宽度 - padding*2 - 间距总和 / 3
const ITEM_WIDTH =
    (width - PADDING_HORIZONTAL * 2 - ITEM_SPACING * (NUM_COLUMNS - 1)) /
    NUM_COLUMNS;

// 定义导航参数类型
type RootStackParamList = {
    RootPage: undefined;
    DetailPage: { movie: any };
};
type NavigationProp = StackNavigationProp<RootStackParamList, 'RootPage'>;

// 本地图片数组
const movieImages = [
    require('C:/Users/Administrator/Documents/react-native/src/assets/images/banner_blsj.jpeg'),
    require('C:/Users/Administrator/Documents/react-native/src/assets/images/banner_pfzy.jpeg'),
    require('C:/Users/Administrator/Documents/react-native/src/assets/images/banner_qz.jpeg'),
];

export default function MoviePage() {
    const navigation = useNavigation<NavigationProp>();

    const banners = [
        require('C:/Users/Administrator/Documents/react-native/src/assets/images/banner_blsj.jpeg'),
        require('C:/Users/Administrator/Documents/react-native/src/assets/images/banner_pfzy.jpeg'),
        require('C:/Users/Administrator/Documents/react-native/src/assets/images/banner_qz.jpeg'),
    ];

    const scrollRef = useRef<any>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedTab, setSelectedTab] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setCurrentIndex((prev) => {
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

    const randomScore = () => {
        const steps = Math.floor(Math.random() * 21); // 0 ~ 20
        return steps * 0.5; // 0, 0.5, 1.0, ..., 10.0
    };

    const [movies] = useState(() =>
        Array.from({ length: 50 }, (_, i) => ({
            id: i.toString(),
            title: `电影 ${i + 1}`,
            image: movieImages[Math.floor(Math.random() * movieImages.length)],
            score: randomScore(),
        })),
    );

    const renderMovieItem = ({ item, index }: any) => {
        const isLastInRow = (index + 1) % NUM_COLUMNS === 0;
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.push('DetailPage', { movie: item })} // 👈 跳转
                style={[
                    styles.movieItem,
                    { marginRight: isLastInRow ? 0 : ITEM_SPACING },
                ]}
            >
                <Image
                    source={item.image}
                    style={styles.moviePoster}
                    resizeMode="cover"
                />
                <Text style={styles.movieTitle}>{item.title}</Text>
                <MoviePageItemStars score={parseFloat(item.score)} size={20} />
            </TouchableOpacity>
        );
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 16 }}>
            {/* 功能区 */}
            <View style={styles.actionRow}>
                <TouchableOpacity style={styles.actionItem} accessibilityRole="button">
                    <Text style={styles.actionIcon}>🔍</Text>
                    <Text style={styles.actionLabel}>找电影</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionItem} accessibilityRole="button">
                    <Text style={styles.actionIcon}>📈</Text>
                    <Text style={styles.actionLabel}>豆瓣榜单</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionItem} accessibilityRole="button">
                    <Text style={styles.actionIcon}>🎲</Text>
                    <Text style={styles.actionLabel}>豆瓣猜</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionItem} accessibilityRole="button">
                    <Text style={styles.actionIcon}>🎟️</Text>
                    <Text style={styles.actionLabel}>豆瓣票单</Text>
                </TouchableOpacity>
            </View>

            {/* 轮播图 */}
            <View style={styles.bannerContainer}>
                <ScrollView
                    ref={scrollRef}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={onMomentumScrollEnd}
                >
                    {banners.map((src, i) => (
                        <Image
                            key={i}
                            source={src}
                            style={{ width, height: BANNER_HEIGHT }}
                            resizeMode="cover"
                        />
                    ))}
                </ScrollView>
            </View>

            {/* 轮播点 */}
            <View style={styles.dotsContainer}>
                {banners.map((_, i) => (
                    <View
                        key={i}
                        style={[styles.dot, i === currentIndex && styles.activeDot]}
                    />
                ))}
            </View>

            {/* Tabs */}
            <View style={styles.tabWrapper}>
                <View style={styles.tabsLeft}>
                    <TouchableOpacity
                        style={[styles.tabItem, selectedTab === 0 && styles.tabItemActive]}
                        onPress={() => setSelectedTab(0)}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                selectedTab === 0 && styles.tabTextActive,
                            ]}
                        >
                            影院热映
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.tabItem, selectedTab === 1 && styles.tabItemActive]}
                        onPress={() => setSelectedTab(1)}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                selectedTab === 1 && styles.tabTextActive,
                            ]}
                        >
                            即将上映
                        </Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.tabRight} accessibilityRole="button">
                    <Text style={styles.allText}>全部 &gt;</Text>
                </TouchableOpacity>
            </View>

            {/* 电影列表 */}
            <FlatList
                data={movies}
                keyExtractor={(item) => item.id}
                renderItem={renderMovieItem}
                numColumns={NUM_COLUMNS}
                scrollEnabled={false} // 禁止 FlatList 内部滚动
                contentContainerStyle={{ paddingHorizontal: PADDING_HORIZONTAL }}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
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
    movieItem: {
        width: ITEM_WIDTH,
        alignItems: 'flex-start', // 标题靠左
        marginBottom: 12,
    },
    moviePoster: {
        width: ITEM_WIDTH,
        height: 150,
        borderRadius: 6,
        marginBottom: 6,
    },
    movieTitle: {
        fontSize: 12,
        color: '#333',
        textAlign: 'left',
        width: '100%',
    },
});
