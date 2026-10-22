import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import AppButton from "../src/components/AppButton";

const dashboardSections = [
  {
    title: "Dispositivos",
    description: "Aquí podrás consultar y administrar los dispositivos vinculados.",
  },
  {
    title: "Actividad reciente",
    description: "Aquí podrás revisar los eventos y alertas de protección.",
  },
  {
    title: "Lista de bloqueo",
    description: "Aquí podrás consultar los sitios bloqueados.",
  },
];

export default function DashboardScreen() {
  const router = useRouter();
  const { name } = useLocalSearchParams<{ name?: string | string[] }>();
  const userName = (Array.isArray(name) ? name[0] : name)?.trim();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>BA Protege+</Text>
        <Text style={styles.title}>
          {userName ? `¡Hola, ${userName}!` : "¡Te damos la bienvenida!"}
        </Text>
        <Text style={styles.subtitle}>
          Desde aquí podrás gestionar la protección de tu familia.
        </Text>
      </View>

      <View style={styles.sections}>
        {dashboardSections.map((section) => (
          <View key={section.title} style={styles.card}>
            <Text style={styles.cardTitle}>{section.title}</Text>
            <Text style={styles.cardDescription}>{section.description}</Text>
            <Text style={styles.comingSoon}>Disponible próximamente</Text>
          </View>
        ))}
      </View>

      <AppButton
        title="Cerrar sesión"
        variant="tertiary"
        onPress={() => router.replace("/login")}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: 64,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 28,
  },
  eyebrow: {
    color: "#777777",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 8,
  },
  title: {
    color: "#1C1C1C",
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 10,
  },
  subtitle: {
    color: "#777777",
    fontSize: 15,
    lineHeight: 22,
  },
  sections: {
    gap: 14,
    marginBottom: 24,
  },
  card: {
    backgroundColor: "#F7F7F2",
    borderRadius: 12,
    padding: 18,
  },
  cardTitle: {
    color: "#1C1C1C",
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 6,
  },
  cardDescription: {
    color: "#777777",
    fontSize: 14,
    lineHeight: 20,
  },
  comingSoon: {
    color: "#6B5B00",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 12,
  },
});
