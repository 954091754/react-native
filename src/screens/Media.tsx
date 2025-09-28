import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';

import MoviePage from './MediaPages/Movie';
import TVPage from './MediaPages/TV';
import VarietyPage from './MediaPages/Variety';
import BookPage from './MediaPages/Book';
import MusicPage from './MediaPages/Music';
import LocalPage from './MediaPages/Local';

const { width, height } = Dimensions.get('window');

export default function Media() {
  const menuItems = ['电影', '电视', '综艺', '读书', '音乐', '同城'];
  const [selected, setSelected] = useState(0);
  const pagesRef = useRef<ScrollView | null>(null);
  const menuRef = useRef<ScrollView | null>(null);
  const [itemLayouts, setItemLayouts] = useState<{ x: number; width: number }[]>([]);

  const scrollY = useRef(new Animated.Value(0)).current;
  const SEARCH_HEIGHT = Platform.OS === 'android' ? 60 : 80;
  const MENU_HEIGHT = 48;

  const pages = [
    <MoviePage />,
    <TVPage />,
    <VarietyPage />,
    <BookPage />,
    <MusicPage />,
    <LocalPage />,
  ];

  // 菜单居中滚动
  useEffect(() => {
    if (!menuRef.current || !itemLayouts || itemLayouts.length === 0) return;
    const layout = itemLayouts[selected];
    if (!layout) return;
    const scrollTo = Math.max(0, layout.x + layout.width / 2 - width / 2);
    menuRef.current.scrollTo({ x: scrollTo, animated: true });
  }, [selected, itemLayouts]);

  // Animated 样式
  const searchOpacity = scrollY.interpolate({
    inputRange: [0, SEARCH_HEIGHT],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const menuTranslateY = scrollY.interpolate({
    inputRange: [0, SEARCH_HEIGHT],
    outputRange: [SEARCH_HEIGHT, 0],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      {/* 主 ScrollView */}
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true } // ✅ 使用 transform
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* 搜索栏 */}
        <Animated.View style={[styles.searchWrap, { opacity: searchOpacity }]}>
          <TextInput
            placeholder="用一部电影来形容您的2025"
            placeholderTextColor="#999"
            style={styles.searchInput}
            returnKeyType="search"
          />
        </Animated.View>

        {/* 占位菜单栏 */}
        <View style={{ height: MENU_HEIGHT }} />

        {/* 页面内容 */}
        {pages.map((PageComponent, idx) => (
          <View key={idx} style={{ width, flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              {PageComponent}
            </ScrollView>
          </View>
        ))}
      </Animated.ScrollView>

      {/* 悬浮菜单栏 */}
      <Animated.View
        style={[
          styles.menuWrap,
          {
            position: 'absolute',
            zIndex: 999,
            width: '100%',
            transform: [{ translateY: menuTranslateY }], // ✅ 用 translateY 替代 top
          },
        ]}
      >
        <ScrollView
          ref={menuRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.menuScroll}
        >
          {menuItems.map((item, idx) => {
            const active = idx === selected;
            return (
              <TouchableOpacity
                key={item}
                style={[styles.menuItem, active && styles.menuItemActive]}
                onLayout={(e) => {
                  const layout = e.nativeEvent.layout;
                  setItemLayouts((prev) => {
                    const copy = [...prev];
                    copy[idx] = { x: layout.x, width: layout.width };
                    return copy;
                  });
                }}
                onPress={() => {
                  pagesRef.current?.scrollTo({ x: idx * width, animated: true });
                  setSelected(idx);
                }}
              >
                <Text style={[styles.menuText, active && styles.menuTextActive]}>{item}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  searchWrap: {
    paddingHorizontal: 12,
    paddingTop: Platform.OS === 'android' ? 12 : 20,
    paddingBottom: 8,
    backgroundColor: '#fff',
  },
  searchInput: {
    height: 40,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#e6e6e6',
  },
  menuWrap: {
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#fff',
    height: 48,
    justifyContent: 'center',
  },
  menuScroll: { paddingHorizontal: 8, alignItems: 'center' },
  menuItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 6,
    borderRadius: 18,
    backgroundColor: 'transparent',
  },
  menuItemActive: {
    backgroundColor: '#007AFF33',
  },
  menuText: { fontSize: 14, color: '#333' },
  menuTextActive: { color: '#007AFF', fontWeight: '600' },
});
