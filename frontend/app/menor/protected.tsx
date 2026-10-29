// app/menor/protected.tsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ProtectedScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>PROTEGIDO</Text>
        </View>
        <Text style={styles.title}>BA Protege+ Activo</Text>
        <Text style={styles.description}>
          Este dispositivo se encuentra vinculado y protegido correctamente. El acceso a sitios no autorizados está siendo filtrado en segundo plano.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Fondo limpio alineado con el UI Kit
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    maxWidth: 400,
    padding: 30,
    borderRadius: 20, // Bordes redondeados consistentes con las demás tarjetas
    borderWidth: 1,
    borderColor: '#E5E7EB', // Borde sutil del UI Kit
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  badge: {
    backgroundColor: '#dcfce7', //#dcfce7 Verde claro del UI Kit (éxito/activo)
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 16,
  },
  badgeText: {
    color: '#16a34a', // Texto verde oscuro institucional
    fontWeight: 'bold',
    fontSize: 12,
    letterSpacing: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937', // Tono gris oscuro oficial del UI Kit
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#6B7280', // Texto secundario gris estándar del UI Kit
    textAlign: 'center',
    lineHeight: 22,
  },
});