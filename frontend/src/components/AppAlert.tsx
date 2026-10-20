
import { View, Text, StyleSheet } from "react-native";

type AppAlertProps = {
  message: string;
  variant?: "success" | "warning" | "error" | "info";
};

const alertStyles = {
  success: {
    backgroundColor: "#DCFCE7",
    textColor: "#166534",
    borderColor: "#16A34A",
  },
  warning: {
    backgroundColor: "#FEF3C7",
    textColor: "#92400E",
    borderColor: "#F59E0B",
  },
  error: {
    backgroundColor: "#FEE2E2",
    textColor: "#991B1B",
    borderColor: "#DC2626",
  },
  info: {
    backgroundColor: "#DBEAFE",
    textColor: "#1E40AF",
    borderColor: "#2563EB",
  },
};

export default function AppAlert({
  message,
  variant = "info",
}: AppAlertProps) {
  const colors = alertStyles[variant];

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.backgroundColor,
          borderLeftColor: colors.borderColor,
        },
      ]}
    >
      <Text
        style={[
          styles.message,
          { color: colors.textColor },
        ]}
      >
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 14,
    borderRadius: 8,
    borderLeftWidth: 4,
    marginVertical: 8,
  },
  message: {
    fontSize: 14,
    fontWeight: "500",
  },
});
