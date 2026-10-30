// src/components/AppSwitch.tsx
import React from 'react';
import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';

interface AppSwitchProps {
  label?: string;
  value: boolean;
  onValueChange: (newValue: boolean) => void;
  disabled?: boolean;
}

export default function AppSwitch({
  label,
  value,
  onValueChange,
  disabled = false,
}: AppSwitchProps) {
  const toggleSwitch = () => {
    if (!disabled) {
      onValueChange(!value);
    }
  };

  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <Pressable
        onPress={toggleSwitch}
        disabled={disabled}
        style={[styles.switchCard, disabled && styles.disabledCard]}
        accessibilityRole="switch"
        accessibilityState={{ checked: value }}
      >
        {/* Track / Fondo del Switch */}
        <View style={[styles.track, value ? styles.trackActive : styles.trackInactive]}>
          {/* Thumb / Círculo que se mueve */}
          <View style={[styles.thumb, value ? styles.thumbActive : styles.thumbInactive]} />
        </View>

        {/* Texto "Sí" o "No" */}
        <Text style={[styles.statusText, value && styles.statusTextActive]}>
          {value ? 'Sí' : 'No'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1C1C',
    marginBottom: 6,
  },
  switchCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    alignSelf: 'flex-start',
    gap: 10,
  },
  disabledCard: {
    opacity: 0.5,
  },
  track: {
    width: 44,
    height: 24,
    borderRadius: 12,
    padding: 2,
    justifyContent: 'center',
  },
  trackInactive: {
    backgroundColor: '#E5E7EB',
  },
  trackActive: {
    backgroundColor: '#FFCC00', // Amarillo del UI Kit
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  thumbInactive: {
    alignSelf: 'flex-start',
  },
  thumbActive: {
    alignSelf: 'flex-end',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6B7280',
  },
  statusTextActive: {
    color: '#1C1C1C',
  },
});