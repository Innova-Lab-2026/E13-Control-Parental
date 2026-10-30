// src/components/GreetingHeader.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface GreetingHeaderProps {
  name: string;
  subtitle?: string;
  showStatusDot?: boolean;
}

export default function GreetingHeader({
  name,
  subtitle = '¡Qué bueno tenerte de vuelta!',
  showStatusDot = false,
}: GreetingHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Hola, {name}</Text>
      
      <View style={styles.subtitleRow}>
        {showStatusDot && <View style={styles.greenDot} />}
        <Text style={[styles.subtitleText, showStatusDot && styles.statusText]}>
          {subtitle}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 2,
  },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  greenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#166534',
  },
  subtitleText: {
    fontSize: 14,
    color: '#6B7280',
  },
  statusText: {
    fontSize: 13,
    color: '#166534',
    fontWeight: '600',
  },
});