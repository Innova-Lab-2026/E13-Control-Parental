
import {
  Pressable,
  Text,
  StyleSheet,
} from "react-native";

type AppButtonProps = {
  title: string;
  onPress: () => void;
  variant?: "primary" |
           "secondary"|
           "tertiary";
           disabled?: boolean;
};

export default function AppButton({
  title,
  onPress,
  variant = "primary",
  disabled = false,
}: AppButtonProps) {
  return (
    <Pressable
      style={[
        styles.button,
        styles[variant],
        disabled && styles.disabled
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={[
          styles.text,
          variant === "primary"
            ? styles.primaryText
            : styles.secondaryText,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: "center",
  },
  primary: {
    backgroundColor: "#FACC15",
  },
  secondary: {
    backgroundColor: "#FEF08A",
  },
  tertiary: {
    backgroundColor: "#F3F4F6",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  primaryText: {
    color: "#1F2937",
  },
  secondaryText: {
    color: "#1F2937",
  },
  disabled: {
    backgroundColor: "#CCCCCC",
  },
});
