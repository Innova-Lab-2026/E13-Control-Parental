// app/menor/link.tsx
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

// Importamos nuestros componentes reutilizables del UI Kit
import AppHeader from "../../src/components/AppHeader";
import AppInput from "../../src/components/AppInput";
import AppButton from "../../src/components/AppButton";
import AppAlert from "../../src/components/AppAlert";

export default function LinkDeviceScreen() {
  const router = useRouter();
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Función que maneja la validación del PIN contra el Backend real
  const handleConfirmLink = async () => {
    if (!pin || pin.length < 4) {
      setErrorMessage("Por favor, ingresa un PIN válido de 4 dígitos.");
      return;
    }

    try {
      setLoading(true);
      setErrorMessage("");

      // [CONEXIÓN CON EL BACKEND] Llamamos al endpoint que armamos en Node.js
      // Nota: Si probás en dispositivo físico, reemplazá 'localhost' por la IP local de tu PC (ej: 'http://192.168.1.50:3000')
      const response = await fetch(
        "http://192.168.0.131:3000/api/devices/confirm-link",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ pin }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "PIN inválido o expirado.");
      }

      // ¡Vinculación exitosa! Redirigimos a la pantalla de modo protegido
      // En el futuro se activará el módulo nativo de Kotlin
      router.replace("/menor/protected");
    } catch (error: any) {
      setErrorMessage(
        error.message || "Ocurrió un error al conectar con el servidor.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.card}>
          {/* Encabezado reutilizable con botón de retroceso automático */}
          <AppHeader title="Vinculación de Dispositivo" />

          <Text style={styles.instructions}>
            Ingresá el PIN de 4 dígitos que generó el tutor desde su panel para
            proteger este dispositivo.
          </Text>

          {/* Componente de input reutilizable */}
          <AppInput
            label="PIN de Vinculación"
            placeholder="Ej: 4829"
            keyboardType="numeric"
            value={pin}
            onChangeText={(text) => {
              setPin(text);
              setErrorMessage("");
            }}
          />

          {/* Componente de alerta reutilizable para errores */}
          {errorMessage ? (
            <AppAlert message={errorMessage} variant="error" />
          ) : null}

          {/* Componente de botón reutilizable */}
          <AppButton
            title={loading ? "Vinculando..." : "Vincular Dispositivo"}
            variant="primary"
            onPress={handleConfirmLink}
            disabled={loading}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f6fa",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#ffffff",
    width: "100%",
    maxWidth: 400,
    padding: 24,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  instructions: {
    fontSize: 14,
    color: "#64748b",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 20,
  },
});