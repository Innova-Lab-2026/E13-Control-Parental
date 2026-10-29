// app/tutor/add-device.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  Platform,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";

// Componentes reutilizables reales del proyecto
import AppHeader from "../../src/components/AppHeader";
import AppButton from "../../src/components/AppButton";
import BottomNavigation from "../../src/components/BottomNavigation";

export default function AddDeviceScreen() {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState("dispositivos");

  // Estados del formulario y control de errores/carga
  const [deviceName, setDeviceName] = useState("");
  const [deviceType, setDeviceType] = useState<"android" | "ios">("android");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Estado para la fecha de nacimiento (Selector de edad / perfil del menor)
  const [birthDate, setBirthDate] = useState(new Date(2012, 0, 1));
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Manejo del selector de fecha compatible con Web y Móvil
  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS !== "web") {
      setShowDatePicker(false);
    }
    if (selectedDate) {
      setBirthDate(selectedDate);
    }
  };

  // Aviso de "Próximamente" adaptado para Web y App nativa
  const handleAvatarPress = () => {
    const title = "Próximamente";
    const message =
      "La función para subir o cambiar la foto de perfil estará disponible muy pronto.";

    if (Platform.OS === "web") {
      alert(`${title}: ${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  // TODO BACKEND: Cuando te den la URL, solo reemplazás esta sección mock por tu fetch real.
  // const handleAddDevice = async () => {
  //   setErrorMessage(null);
  //   setIsLoading(true);

  //   try {
  //     // =================================================================
  //     // MOCK LOCAL (Simula la respuesta del servidor con datos locales)
  //     // =================================================================
  //     const mockBackendResponse = {
  //       success: true,
  //       pin: "4829",
  //       message: "Dispositivo registrado con éxito"
  //     };

  //     // Simulamos un error si el usuario escribe "Error" en el nombre para probar el catch
  //     if (deviceName.toLowerCase() === "error") {
  //       throw new Error("El servidor rechazó el registro del dispositivo.");
  //     }

  //     const data = mockBackendResponse;
  //     // =================================================================

  //     /*
  //       ================================================================
  //       CÓDIGO REAL DE BACKEND (Descomentamos cuando tengamos la URL de la API)
  //       ================================================================
  //       const response = await fetch('https://api.baprotege.gob.ar/v1/devices', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${userToken}`
  //         },
  //         body: JSON.stringify({
  //           name: deviceName,
  //           type: deviceType,
  //           birthDate: birthDate.toISOString(),
  //         })
  //       });

  //       const data = await response.json();

  //       if (!response.ok) {
  //         throw new Error(data.message || "Error al registrar el dispositivo");
  //       }
  //     */

  //     // Si todo sale bien, navega a la pantalla de éxito pasando el PIN y nombre
  //     router.push({
  //       pathname: "/tutor/device-success",
  //       params: {
  //         pin: data.pin,
  //         name: deviceName || "Dispositivo"
  //       }
  //     });

  //   } catch (error: any) {
  //     console.error("Error en el registro:", error);
  //     setErrorMessage(error.message || "¡Ups! Algo salió mal al generar el PIN. Intentá de nuevo.");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleAddDevice = async () => {
    setErrorMessage(null);

    // =================================================================
    // VALIDACIONES DE ENTRADA DEL FORMULARIO
    // =================================================================
    const trimmedName = deviceName.trim();

    // 1. Validar campo vacío
    if (!trimmedName) {
      setErrorMessage("Por favor, ingresá el nombre del menor o dispositivo.");
      return;
    }

    // 2. Validar mínimo de caracteres (al menos 2)
    if (trimmedName.length < 2) {
      setErrorMessage("El nombre debe tener al menos 2 caracteres.");
      return;
    }

    // 3. Validar caracteres especiales (solo letras con acentos/eñes y espacios)
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (!nameRegex.test(trimmedName)) {
      setErrorMessage("El nombre no debe contener números ni caracteres especiales.");
      return;
    }
    // =================================================================

    setIsLoading(true);

    try {
      // =================================================================
      // CÓDIGO REAL DE BACKEND (Conectado a tu API local de Node.js)
      // =================================================================

      // Nota: Si probás en dispositivo físico, reemplazá 'localhost' por la IP local de tu PC (ej: 'http://192.168.1.50:3000')
      // Asegurate de pasar el token JWT real del tutor logueado (podes guardarlo en AsyncStorage o pasarlo por contexto)
      const userToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImY3OGFjYTY0LWNmZmUtNDRhZC1iYWRhLWZiNDgzZDY3YTNlOSIsImVtYWlsIjoiYW5hbGlhQHRlc3QuY29tIiwiaWF0IjoxNzkzMjI5MzYyLCJleHAiOjE3OTM4MzQxNjJ9.QiCYgRQjWh1eB05MR8AlvAniK8QNNxwRjeM-ZzHAMY0";

      const response = await fetch(
        "http://192.168.0.131:3000/api/devices/generate-pin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify({
            deviceName: trimmedName,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al generar el PIN de vinculación");
      }

      // Si todo sale bien, el backend nos devuelve el pin real generado y navegamos a la pantalla de éxito
      router.push({
        pathname: "/tutor/device-success",
        params: {
          pin: data.pairingPin, // El PIN que generó el backend de Node.js
          name: trimmedName,
        },
      });
    } catch (error: any) {
      console.error("Error en el registro:", error);
      setErrorMessage(
        error.message ||
          "¡Ups! Algo salió mal al generar el PIN. Intentá de nuevo.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabPress = (tabId: string) => {
    setCurrentTab(tabId);
    if (tabId === "home") router.push("/tutor/dashboard");
    if (tabId === "dispositivos") router.push("/tutor/devices");
    if (tabId === "historial") router.push("/tutor/history");
    if (tabId === "configuracion") router.push("/tutor/settings");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <View style={styles.container}>
        <AppHeader
          title="Vincular dispositivo"
          onBackPress={() => router.back()}
        />

        <View style={styles.content}>
          {/* Avatar / Foto de perfil interactiva con aviso Próximamente */}
          <View style={styles.avatarContainer}>
            <Pressable style={styles.avatarCircle} onPress={handleAvatarPress}>
              <Text style={styles.avatarIcon}>👤+</Text>
            </Pressable>
            <Text style={styles.avatarHint}>
              Toca para agregar foto (Próximamente)
            </Text>
          </View>

          {/* Formulario de Registro - Campo de nombre del menor */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Nombre del menor o dispositivo</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Ej: Mateo o Celular Juan"
              placeholderTextColor="#9CA3AF"
              value={deviceName}
              onChangeText={(text) => {
                setDeviceName(text);
                if (errorMessage) setErrorMessage(null); // Limpia el error al escribir
              }}
            />
          </View>

          {/* Selector de Fecha de Nacimiento (Doble lógica Web / Nativo) */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Fecha de nacimiento</Text>

            {Platform.OS === "web" ? (
              <input
                type="date"
                value={birthDate.toISOString().split("T")[0]}
                onChange={(e) =>
                  handleDateChange(null, new Date(e.target.value))
                }
                style={{
                  padding: 12,
                  borderRadius: 8,
                  border: "1px solid #D1D5DB",
                  fontSize: 14,
                  width: "100%",
                  backgroundColor: "#F9FAFB",
                  color: "#1F2937",
                  outline: "none",
                }}
              />
            ) : (
              <View>
                <Pressable
                  style={styles.datePickerButton}
                  onPress={() => setShowDatePicker(true)}
                >
                  <Text style={styles.datePickerButtonText}>
                    {birthDate.toLocaleDateString()}
                  </Text>
                </Pressable>

                {showDatePicker && (
                  <DateTimePicker
                    value={birthDate}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                    maximumDate={new Date()}
                  />
                )}
              </View>
            )}
          </View>

          {/* Mensaje de error visual si algo sale mal o falla una validación */}
          {errorMessage && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
          )}

          {/* Botón de Confirmación que genera el PIN y redirige a device-success */}
          <View style={styles.buttonContainer}>
            <AppButton
              title={isLoading ? "Generando..." : "Generar PIN de vinculación"}
              onPress={handleAddDevice}
            />
          </View>
        </View>
      </View>

      <BottomNavigation activeTab={currentTab} onTabPress={handleTabPress} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  content: {
    flex: 1,
    marginTop: 10,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  avatarIcon: {
    fontSize: 28,
  },
  avatarHint: {
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 8,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    backgroundColor: "#F9FAFB",
    color: "#1F2937",
  },
  datePickerButton: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#F9FAFB",
  },
  datePickerButtonText: {
    fontSize: 14,
    color: "#1F2937",
  },
  errorContainer: {
    backgroundColor: "#FEE2E2",
    borderWidth: 1,
    borderColor: "#EF4444",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  errorText: {
    color: "#B91C1C",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "600",
  },
  buttonContainer: {
    marginTop: 20,
  },
});