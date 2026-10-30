// src/components/RestrictedSitesCard.tsx
//Recibe el título de la cabecera, el subtítulo y el listado de sitios dinámico (e incorpora el componente ListIndicator )
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SiteRow from './SiteRow';
import ListIndicator from './ListIndicator';

interface SiteItem {
  id: string;
  domain: string;
  statusText: string;
}

interface RestrictedSitesCardProps {
  headerTitle: string;
  subtitle: string;
  sites: SiteItem[];
}

export default function RestrictedSitesCard({
  headerTitle,
  subtitle,
  sites,
}: RestrictedSitesCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>{headerTitle}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      <View style={styles.listContainer}>
        {sites.map((site) => (
          <SiteRow
            key={site.id}
            domain={site.domain}
            statusText={site.statusText}
          />
        ))}
      </View>

      <ListIndicator />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#DC2626',
  },
  subtitle: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  listContainer: {
    marginBottom: 8,
  },
});