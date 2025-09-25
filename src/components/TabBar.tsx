import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, GestureResponderEvent} from 'react-native';

export type TabKey = 'home' | 'contacts' | 'moments' | 'me';

export default function TabBar({
  active,
  onChange,
}: {
  active: TabKey;
  onChange: (k: TabKey) => void;
}) {
  const TabButton = ({label, k}: {label: string; k: TabKey}) => (
    <TouchableOpacity style={styles.tabButton} onPress={() => onChange(k)}>
      <Text style={[styles.tabLabel, active === k && styles.tabLabelActive]}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.tabBar}>
      <TabButton label="首页" k="home" />
      <TabButton label="通讯录" k="contacts" />
      <TabButton label="朋友圈" k="moments" />
      <TabButton label="我的" k="me" />
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {height: 56, flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#eee'},
  tabButton: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  tabLabel: {fontSize: 12, color: '#666'},
  tabLabelActive: {color: '#1f9fff', fontWeight: '700'},
});
