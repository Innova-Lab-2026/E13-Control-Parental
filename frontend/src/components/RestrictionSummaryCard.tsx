// src/components/RestrictionSummaryCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface MetricItem {
  label?: string;
  value: string | number;
  unit?: string;
  sublabel?: string;
  isDanger?: boolean;
}

interface RestrictionSummaryCardProps {
  statusText?: string;
  isProtected?: boolean;
  metrics: MetricItem[];
}

export default function RestrictionSummaryCard({
  statusText = 'Protección activa',
  isProtected = true,
  metrics,
}: RestrictionSummaryCardProps) {
  return (
    <View style={styles.card}>
      {/* Encabezado de estado */}
      {statusText ? (
        <View style={styles.statusHeaderRow}>
          <Text style={styles.checkIcon}>{isProtected ? '✅' : '⚠️'}</Text>
          <Text style={[styles.statusTitle, !isProtected && styles.dangerTitle]}>
            {statusText}
          </Text>
        </View>
      ) : null}

      {/* Fila de métricas dinámicas */}
      <View style={styles.metricsRow}>
        {metrics.map((metric, index) => (
          <React.Fragment key={index}>
            {index > 0 && <View style={styles.verticalDivider} />}
            <View style={styles.metricColumn}>
              {metric.sublabel ? (
                <Text style={styles.metricSublabel}>{metric.sublabel}</Text>
              ) : null}
              
              <Text style={[styles.metricValue, metric.isDanger && styles.metricValueDanger]}>
                {metric.value}
                {metric.unit ? <Text style={styles.metricUnit}> {metric.unit}</Text> : null}
              </Text>

              {metric.label ? (
                <Text style={styles.metricLabel}>{metric.label}</Text>
              ) : null}
            </View>
          </React.Fragment>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  statusHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  checkIcon: {
    fontSize: 16,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#16A34A',
  },
  dangerTitle: {
    color: '#DC2626',
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  metricColumn: {
    flex: 1,
    alignItems: 'center',
  },
  verticalDivider: {
    width: 1,
    height: 36,
    backgroundColor: '#E5E7EB',
  },
  metricSublabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  metricUnit: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#6B7280',
  },
  metricValueDanger: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#DC2626',
  },
  metricLabel: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
  },
});