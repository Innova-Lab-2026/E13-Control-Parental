//Muestra el desglose completo del incidente
// app/tutor/alert-detail.tsx
import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

// Componentes reutilizables del proyecto
import AppHeader from "../../src/components/AppHeader";
import AppButton from "../../src/components/AppButton";
import BottomNavigation from "../../src/components/BottomNavigation";

export default function AlertDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [currentTab, setCurrentTab] = useState("inicio");

  // Parámetros recibidos (con valores por defecto mock basados en el diseño)
  const title = (params.title as string) || "Sitio bloqueado";
  const subtitle = (params.subtitle as string) || "Ramiro intentó acceder a un sitio restringido";
  const device = (params.device as string) || "Ramiro";
  const time = (params.time as string) || "14:25";

  const handleTabPress = (tabId: string) => {
    setCurrentTab(tabId);
    if (tabId === "inicio") router.push("/tutor/dashboard");
    if (tabId === "dispositivos") router.push("/tutor/devices");
    if (tabId === "historial") router.push("/tutor/history");
    if (tabId === "configuracion") router.push("/tutor/settings");
  };

  const handleViewHistory = () => {
    /*
      TODO BACKEND: Redirigir al historial filtrado por el dispositivo específico
      router.push({ pathname: "/tutor/history", params: { device } });
    */
    router.push("/tutor/history");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <AppHeader title="Detalle de alerta" onBackPress={() => router.back()} />

        {/* Cabecera del Incidente */}
        <View style={styles.incidentHeader}>
          <View style={styles.largeIconContainer}>
            <Text style={styles.largeIcon}>🚫</Text>
          </View>
          <View style={styles.incidentTextContainer}>
            <Text style={styles.incidentTitle}>{title}</Text>
            <Text style={styles.incidentSubtitle}>{subtitle}</Text>
          </View>
        </View>

        {/* Tarjeta de Información Detallada */}
        <View style={styles.detailCard}>
          <View style={styles.detailRow}>
            <Text style={styles.rowIcon}>👤</Text>
            <Text style={styles.rowLabel}>Dispositivo de <Text style={styles.boldText}>{device}</Text></Text>
          </View>

          <View style={styles.separator} />

          <View style={styles.detailRow}>
            <Text style={styles.rowIcon}>🔗</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.rowSubLabel}>Sitio web</Text>
              <Text style={styles.rowValue}>apostando-sitio.com</Text>
            </View>
          </View>

          <View style={styles.separator} />

          <View style={styles.detailRow}>
            <Text style={styles.rowIcon}>📅</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.rowSubLabel}>Fecha y hora</Text>
              <Text style={styles.rowValue}>Hoy - {time}</Text>
            </View>
          </View>

          <View style={styles.separator} />

          <View style={styles.detailRow}>
            <Text style={styles.rowIcon}>🛡️</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.rowSubLabel}>Estado</Text>
              <Text style={styles.statusBlockedText}>🚫 Acceso bloqueado</Text>
            </View>
          </View>
        </View>

        {/* Sección explicativa: ¿Qué significa esto? */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>¿QUÉ SIGNIFICA ESTO?</Text>
          <Text style={styles.infoDescription}>
            BA Protege+ bloqueó el acceso a este sitio porque forma parte de la lista de restricciones asignadas por LOTBA.
          </Text>
        </View>

        {/* Botón de Acción */}
        <View style={styles.buttonContainer}>
          <AppButton
            title={`Ver historial de ${device}`}
            onPress={handleViewHistory}
          />
        </View>
      </ScrollView>

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
    flexGrow: 1,
    padding: 20,
    paddingBottom: 30,
  },
  incidentHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 24,
    gap: 16,
  },
  largeIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#FEE2E2",
    justifyContent: "center",
    alignItems: "center",
  },
  largeIcon: {
    fontSize: 24,
  },
  incidentTextContainer: {
    flex: 1,
  },
  incidentTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#DC2626",
  },
  incidentSubtitle: {
    fontSize: 13,
    color: "#4B5563",
    marginTop: 4,
    lineHeight: 18,
  },
  detailCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    gap: 12,
  },
  rowIcon: {
    fontSize: 18,
    width: 24,
    textAlign: "center",
  },
  rowLabel: {
    fontSize: 14,
    color: "#1F2937",
  },
  boldText: {
    fontWeight: "bold",
  },
  rowSubLabel: {
    fontSize: 11,
    color: "#9CA3AF",
  },
  rowValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1F2937",
    marginTop: 2,
  },
  statusBlockedText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#DC2626",
    marginTop: 2,
  },
  separator: {
    height: 1,
    backgroundColor: "#F3F4F6",
    marginVertical: 4,
  },
  infoSection: {
    marginBottom: 24,
  },
  infoTitle: {
    fontSize: 12,
    fontWeight: "800",
    color: "#1F2937",
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  infoDescription: {
    fontSize: 13,
    color: "#4B5563",
    lineHeight: 20,
  },
  buttonContainer: {
    marginTop: 8,
  },
});