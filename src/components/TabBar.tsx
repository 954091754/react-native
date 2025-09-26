import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, GestureResponderEvent } from 'react-native';

export type TabKey = 'home' | 'media' | 'moments' | 'market' | 'profile';

export default function TabBar({
  active,
  onChange,
}: {
  active: TabKey;
  onChange: (k: TabKey) => void;
}) {
  const TabButton = ({ label, k, icon }: { label: string; k: TabKey; icon?: string }) => (
    <TouchableOpacity style={styles.tabButton} onPress={() => onChange(k)}>
      {icon ? (
        <Text style={[styles.tabIcon, active === k && styles.tabLabelActive]}>{icon}</Text>
      ) : null}
      <Text style={[styles.tabLabel, active === k && styles.tabLabelActive]}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.tabBar}>
      <TabButton label="首页" k="home" icon="⌂" />
  <TabButton label="书影音" k="media" icon="♪" />
  <TabButton label="小组" k="moments" icon="✿" />
      <TabButton label="市集" k="market" icon="✦" />
      <TabButton label="我" k="profile" icon="⚑" />
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: { height: 56, flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#eee' },
  tabButton: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  tabLabel: { fontSize: 12, color: '#666' },
  tabLabelActive: { color: '#1f9fff', fontWeight: '700' },
  tabIcon: { fontSize: 18, marginBottom: 2, color: '#666' },
});
