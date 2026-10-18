import { View, Text, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";
import { router } from "expo-router";
import AppButton from "../src/components/AppButton";

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Control Parental</Text>

      <Text style={styles.description}>Bienvenido a nuestra aplicación</Text>

      <AppButton title="Iniciar sesión" onPress={() => router.push("/login")} />

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 12,
  },
  description: {
    marginBottom: 24,
  },
  button: {
    backgroundColor: "#2563EB",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
