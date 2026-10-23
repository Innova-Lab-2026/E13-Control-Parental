// src/components/ListIndicator.tsx
import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface ListIndicatorProps {
  style?: ViewStyle;
}

export default function ListIndicator({ style }: ListIndicatorProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.indicatorBar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  indicatorBar: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#D1D5DB', // Color neutro según el UI Kit
  },
});