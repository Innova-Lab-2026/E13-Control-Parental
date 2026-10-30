// src/components/AppHeader.tsx
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

interface AppHeaderProps {
  title: string;
  onBackPress?: () => void;
}

export default function AppHeader({ title, onBackPress }: AppHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handleBack} style={styles.backButton}>
        <Text style={styles.backIcon}>←</Text>
      </Pressable>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    marginRight: 16,
    padding: 4,
  },
  backIcon: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
});