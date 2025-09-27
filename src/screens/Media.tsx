import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Platform, ScrollView, TouchableOpacity, Dimensions, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import MoviePage from './MediaPages/Movie';
import TVPage from './MediaPages/TV';
import VarietyPage from './MediaPages/Variety';
import BookPage from './MediaPages/Book';
import MusicPage from './MediaPages/Music';
import LocalPage from './MediaPages/Local';

export default function Media() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const menuItems = ['电影', '电视', '综艺', '读书', '音乐', '同城'];
  const pagesRef = useRef<ScrollView | null>(null);
  const menuRef = useRef<ScrollView | null>(null);
  const [itemLayouts, setItemLayouts] = useState<{ x: number; width: number }[]>([]);
  const { width } = Dimensions.get('window');

  // when selected changes, center the menu item if possible
  useEffect(() => {
    if (!menuRef.current || !itemLayouts || itemLayouts.length === 0) return;
    const layout = itemLayouts[selected];
    if (!layout) return;
    const menuWidth = Dimensions.get('window').width;
    const scrollTo = Math.max(0, layout.x + layout.width / 2 - menuWidth / 2);
    menuRef.current.scrollTo({ x: scrollTo, animated: true });
  }, [selected, itemLayouts]);

  return (
    <View style={styles.container}>
      <View style={styles.searchWrap}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="用一部电影来形容您的2025"
          placeholderTextColor="#999"
          style={styles.searchInput}
          returnKeyType="search"
        />
      </View>

      <View style={styles.menuWrap}>
        <ScrollView ref={menuRef} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.menuScroll}>
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
                  // scroll pages to index and set selected
                  pagesRef.current?.scrollTo({ x: idx * width, animated: true });
                  setSelected(idx);
                }}
                accessibilityRole="button"
              >
                <Text style={[styles.menuText, active && styles.menuTextActive]}>{item}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView
        ref={pagesRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e: NativeSyntheticEvent<NativeScrollEvent>) => {
          const x = e.nativeEvent.contentOffset.x;
          const page = Math.round(x / width);
          setSelected(page);
        }}
        style={styles.pagesWrap}
      >
        <View style={[styles.page, { width }]}>
          <MoviePage />
        </View>
        <View style={[styles.page, { width }]}>
          <TVPage />
        </View>
        <View style={[styles.page, { width }]}>
          <VarietyPage />
        </View>
        <View style={[styles.page, { width }]}>
          <BookPage />
        </View>
        <View style={[styles.page, { width }]}>
          <MusicPage />
        </View>
        <View style={[styles.page, { width }]}>
          <LocalPage />
        </View>
      </ScrollView>
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
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 8 },
  body: { fontSize: 14, color: '#666' },
  pagesWrap: { flex: 1 },
  page: { flex: 1 },
});
