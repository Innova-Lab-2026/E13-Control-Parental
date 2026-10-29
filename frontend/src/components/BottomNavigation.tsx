// src/components/BottomNavigation.tsx
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

interface BottomNavigationProps {
  activeTab: string;
  onTabPress: (tabId: string) => void;
}

export default function BottomNavigation({ activeTab, onTabPress }: BottomNavigationProps) {
  const tabs = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'dispositivos', label: 'Dispositivos', icon: '📱' },
    { id: 'historial', label: 'Historial', icon: '🕒' },
    { id: 'configuracion', label: 'Configuración', icon: '⚙️' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <Pressable
            key={tab.id}
            style={[styles.tab, isActive && styles.activeTabContainer]}
            onPress={() => onTabPress(tab.id)}
          >
            <Text style={styles.icon}>{tab.icon}</Text>
            <Text style={[styles.label, isActive && styles.activeLabel]}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingVertical: 8,
    paddingHorizontal: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  activeTabContainer: {
    backgroundColor: '#FEF08A', // Fondo amarillo destacado tal como se ve en las referencias visuales
  },
  icon: {
    fontSize: 20,
    marginBottom: 2,
  },
  label: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: '500',
  },
  activeLabel: {
    color: '#1F2937',
    fontWeight: '700',
  },
});