// src/components/SiteRow.tsx
//Tarjeta Sitios restringidos.
//Recibe de forma dinámica el dominio y el texto de estado (por ejemplo, "Bloqueado", "Permitido", etc.)
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface SiteRowProps {
  domain: string;
  statusText: string;
}

export default function SiteRow({ domain, statusText }: SiteRowProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.domain}>{domain}</Text>
      <Text style={styles.status}>{statusText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  domain: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1C1C',
  },
  status: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
  },
});