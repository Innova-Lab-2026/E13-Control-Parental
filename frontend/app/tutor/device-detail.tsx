// app/tutor/device-detail.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

// Componentes reutilizables del proyecto
import AppHeader from '../../src/components/AppHeader';
import BottomNavigation from '../../src/components/BottomNavigation';
import RestrictionSummaryCard from '../../src/components/RestrictionSummaryCard';

// --- INTERFACES PARA EL BACKEND ---
interface ActivityLog {
  id: string;
  title: string;
  detail: string;
  time: string;
  icon: string;
}

interface DeviceDetailData {
  name: string;
  platform: string;
  age: number;
  weeklyBlockedWebs: number;
}

export default function DeviceDetailScreen() {
  const router = useRouter();
  const { deviceId, name } = useLocalSearchParams<{ deviceId?: string; name?: string }>();

  const displayName = name || 'Ramiro';
  const [currentTab, setCurrentTab] = useState('dispositivos');

  // --- DATOS SIMULADOS (MOCK) ---
  // TODO BACKEND: Obtener la información general y métricas del dispositivo usando `deviceId` desde la API
  const [deviceInfo, setDeviceInfo] = useState<DeviceDetailData>({
    name: displayName,
    platform: 'Android',
    age: 14,
    weeklyBlockedWebs: 23,
  });

  // TODO BACKEND: Obtener el historial detallado de actividad específica de este dispositivo
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([
    {
      id: '1',
      title: 'Sitio bloqueado',
      detail: 'apostando-sitio.com',
      time: 'Hace 5 min',
      icon: '🚫',
    },
    {
      id: '2',
      title: 'Configuración actualizada',
      detail: 'Nuevas restricciones',
      time: 'Hace 2 h',
      icon: '⚙️',
    },
    {
      id: '3',
      title: 'Protección activada',
      detail: 'Android',
      time: 'Hace 2 h',
      icon: '🛡️',
    },
    {
      id: '4',
      title: 'Sitio bloqueado',
      detail: 'apuestas-ejemplo.com',
      time: 'Ayer - 20:00',
      icon: '🚫',
    },
    {
      id: '5',
      title: 'Intento de modificación',
      detail: 'Configuración protegida',
      time: 'Ayer - 11:00',
      icon: '⚠️',
    },
  ]);

  /* 
    TODO BACKEND: Ejemplo de llamado HTTP para sincronizar los datos de la pantalla:
    useEffect(() => {
      async function fetchDeviceDetail() {
        try {
          const response = await fetch(`https://api.baprotege.gob.ar/v1/tutor/devices/${deviceId}`);
          const data = await response.json();
          // setDeviceInfo(data.deviceInfo);
          // setActivityLogs(data.activityLogs);
        } catch (error) {
          console.error("Error al cargar los detalles del dispositivo:", error);
        }
      }
      if (deviceId) fetchDeviceDetail();
    }, [deviceId]);
  */

  const handleTabPress = (tabId: string) => {
    setCurrentTab(tabId);
    if (tabId === 'home') router.push('/tutor/dashboard');
    if (tabId === 'dispositivos') router.push('/tutor/devices');
    if (tabId === 'historial') router.push('/tutor/history');
    if (tabId === 'configuracion') router.push('/tutor/settings');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Cabecera reutilizable con botón de retroceso */}
        <AppHeader title="" onBackPress={() => router.back()} />

        {/* Encabezado del perfil */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{displayName.charAt(0).toUpperCase()}</Text>
          </View>
          <Text style={styles.title}>Dispositivo de {displayName}</Text>
          <Text style={styles.platformText}>{deviceInfo.platform}</Text>
        </View>

        {/* Tarjeta de Estado y Métricas Principales reutilizando RestrictionSummaryCard */}
        <RestrictionSummaryCard
          statusText="Protección activa"
          isProtected={true}
          metrics={[
            {
              sublabel: 'Edad',
              value: deviceInfo.age,
              unit: 'años',
            },
            {
              sublabel: 'Esta semana',
              value: deviceInfo.weeklyBlockedWebs,
              label: 'Webs bloqueadas',
              isDanger: true,
            },
          ]}
        />

        {/* Sección de Actividad Reciente */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Actividad de {displayName}</Text>
          <Pressable onPress={() => router.push('/tutor/history')}>
            <Text style={styles.linkText}>Ver todo ›</Text>
          </Pressable>
        </View>

        {/* Tarjeta contenedora de la lista de actividades */}
        <View style={styles.activityCardContainer}>
          {activityLogs.map((log) => (
            <View key={log.id} style={styles.logRow}>
              <Text style={styles.logIcon}>{log.icon}</Text>
              <View style={styles.logTextContainer}>
                <Text style={styles.logTitle}>{log.title}</Text>
                <Text style={styles.logDetail}>{log.detail}</Text>
              </View>
              <View style={styles.logRightContainer}>
                <Text style={styles.logTime}>{log.time}</Text>
                <Text style={styles.arrow}>›</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Barra de navegación inferior fija */}
      <BottomNavigation
        activeTab={currentTab}
        onTabPress={handleTabPress}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 24,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: -8,
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatarText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#374151',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  platformText: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  linkText: {
    fontSize: 14,
    color: '#1C1C1C',
    fontWeight: '600',
  },
  activityCardContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  logRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    gap: 12,
  },
  logIcon: {
    fontSize: 20,
  },
  logTextContainer: {
    flex: 1,
  },
  logTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  logDetail: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  logRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logTime: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  arrow: {
    fontSize: 16,
    color: '#9CA3AF',
    fontWeight: 'bold',
  },
});