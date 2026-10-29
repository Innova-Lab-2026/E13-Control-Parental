// src/components/AddDeviceButton.tsx
//Este es el botón con lineaspunteadas de + Añadir dispositivo que aparece debajo de las tarjetas en la pantalla de Mis Dispositivos y también en el Dashboard.

import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

interface AddDeviceButtonProps {
  onPress: () => void;
}

export default function AddDeviceButton({ onPress }: AddDeviceButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Text style={styles.icon}>+</Text>
      <Text style={styles.text}>Añadir dispositivo</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed', // Borde punteado como en los diseños de Figma
    borderRadius: 12,
    paddingVertical: 14,
    backgroundColor: '#FAFAFA',
    marginTop: 4,
    marginBottom: 16,
    gap: 8,
  },
  pressed: {
    backgroundColor: '#F3F4F6',
  },
  icon: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  text: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
  },
});