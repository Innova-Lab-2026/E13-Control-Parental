// app/tutor/add-device.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image, Platform, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';

// Componentes reutilizables del proyecto
import AppInput from '../../src/components/AppInput';
import AppButton from '../../src/components/AppButton';
import AppHeader from '../../src/components/AppHeader';
import BottomNavigation from '../../src/components/BottomNavigation';
import { requestLinkingPin } from '../../src/services/deviceServices';

export default function AddDeviceScreen() {
  const router = useRouter();
  const [deviceName, setDeviceName] = useState('');
  
  // Estados para la fecha y el calendario nativo
  const [date, setDate] = useState(new Date(2012, 0, 1));
  const [showPicker, setShowPicker] = useState(false);
  const [birthDateString, setBirthDateString] = useState('');

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState('dispositivos');

  // Manejadores compatibles con la API más reciente de DateTimePicker
  const handleValueChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setDate(selectedDate);
      const day = String(selectedDate.getDate()).padStart(2, '0');
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const year = selectedDate.getFullYear();
      setBirthDateString(`${day}/${month}/${year}`);
    }
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }
  };

  const handleDismiss = () => {
    setShowPicker(false);
  };

  // --- SECCIÓN DE FOTO DE PERFIL / AVATAR (MOCK & TODO BACKEND) ---
  const handlePickImage = () => {
    // MOCK: Interacción visual para el usuario actual
    Alert.alert(
      "Próximamente",
      "Pronto podrás subir o cambiar la foto de perfil del dispositivo.",
      [{ text: "Entendido" }]
    );

    /* 
      TODO BACKEND / NATIVO: 
      Estructura lista para implementar expo-image-picker y envío al servidor cuando se habilite el módulo:
      
      async function pickImageFromDevice() {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.8,
        });

        if (!result.canceled) {
          setProfileImage(result.assets[0].uri);
          // TODO BACKEND: Adjuntar la imagen en el FormData de registro del dispositivo
        }
      }
      pickImageFromDevice();
    */
  };

  const handleAgregar = async () => {
    if (!deviceName.trim()) return;

    setLoading(true);
    try {
      /*
        TODO BACKEND: Enviar datos completos del perfil (incluyendo imagen/avatar si aplica)
        const formData = new FormData();
        formData.append('deviceName', deviceName);
        formData.append('birthDate', birthDateString);
        if (profileImage) {
          formData.append('profileImage', { uri: profileImage, name: 'avatar.jpg', type: 'image/jpeg' } as any);
        }
      */

      const res = await requestLinkingPin(deviceName, 'Android');
      
      router.push({
        pathname: '/tutor/device-success',
        params: { pin: res.pin, name: deviceName },
      });
    } catch (error) {
      console.error('Error al generar el PIN:', error);
    } finally {
      setLoading(false);
    }
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
        {/* Cabecera reutilizable */}
        <AppHeader title="Agregar dispositivo" onBackPress={() => router.back()} />

        <Text style={styles.subtitle}>
          Creá el perfil del dispositivo protegido para gestionar su información y configuraciones desde tu app.
        </Text>

        {/* Foto de perfil / Avatar */}
        <Pressable style={styles.imagePickerContainer} onPress={handlePickImage}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarIcon}>👤+</Text>
            </View>
          )}
          <Text style={styles.imagePickerText}>Añadir foto de perfil</Text>
        </Pressable>

        {/* Input Nombre del dispositivo */}
        <AppInput
          label="Nombre"
          placeholder="¿Quién usa el dispositivo protegido?"
          value={deviceName}
          onChangeText={setDeviceName}
        />

        {/* Campo de fecha */}
        <Pressable onPress={() => setShowPicker(true)}>
          <View pointerEvents="none">
            <AppInput
              label="Fecha de nacimiento"
              placeholder="dd/mm/aaaa"
              value={birthDateString}
              onChangeText={() => {}}
            />
          </View>
        </Pressable>

        {/* Selector Nativo de Fecha */}
        {showPicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="spinner"
            maximumDate={new Date()}
            onValueChange={handleValueChange}
            onDismiss={handleDismiss}
          />
        )}

        {/* Botón principal */}
        <View style={styles.buttonContainer}>
          <AppButton
            title={loading ? "Generando PIN..." : "Agregar"}
            onPress={handleAgregar}
            disabled={loading || !deviceName.trim()}
          />
        </View>
      </ScrollView>

      {/* Navegación inferior fija */}
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
    paddingBottom: 30,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 24,
    lineHeight: 20,
  },
  imagePickerContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarPlaceholder: {
    width: 96,
    height: 96,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  profileImage: {
    width: 96,
    height: 96,
    borderRadius: 20,
    marginBottom: 8,
  },
  avatarIcon: {
    fontSize: 32,
  },
  imagePickerText: {
    fontSize: 13,
    color: '#374151',
    fontWeight: '500',
  },
  buttonContainer: {
    marginTop: 12,
  },
});