// app/tutor/devices.tsx
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

// Componentes reutilizables
import AppHeader from '../../src/components/AppHeader';
import DeviceItem, { DeviceStatus } from '../../src/components/DeviceItem';
import AddDeviceButton from '../../src/components/AddDeviceButton';
import BottomNavigation from '../../src/components/BottomNavigation';

interface Device {
  id: string;
  name: string;
  status: DeviceStatus;
}

export default function DevicesScreen() {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState('dispositivos');

  // --- DATOS SIMULADOS (MOCK) ---
  // TODO BACKEND: Reemplazar por endpoint GET /tutor/devices
  const [devices] = useState<Device[]>([
    { id: '1', name: 'Paula', status: 'active' },
    { id: '2', name: 'Ramiro', status: 'active' },
    { id: '3', name: 'Lorena', status: 'pending' },
  ]);

  const handleDevicePress = (deviceId: string, name: string) => {
    router.push({
      pathname: '/tutor/device-detail',
      params: { deviceId, name },
    });
  };

  const handleAddDevice = () => {
    router.push('/tutor/add-device');
  };

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
        {/* Cabecera unificada con botón volver */}
        <AppHeader title="Mis Dispositivos" onBackPress={() => router.back()} />

        <View style={styles.list}>
          {devices.map((device) => (
            <DeviceItem
              key={device.id}
              name={device.name}
              status={device.status}
              onPress={() => handleDevicePress(device.id, device.name)}
            />
          ))}

          {/* Botón para agregar nuevos dispositivos */}
          <AddDeviceButton onPress={handleAddDevice} />
        </View>
      </ScrollView>

      {/* Navegación inferior unificada */}
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
  list: {
    width: '100%',
    marginTop: 8,
  },
});