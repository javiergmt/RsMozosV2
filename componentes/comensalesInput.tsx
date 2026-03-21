import { COLORS } from "@/constants/Colors";
import React, { useRef, useState } from "react";
import {
  Animated,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

type ComensalesScreenProps = {
  initial?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  onExit?: (value: number) => void;
  style?: ViewStyle;
  testID?: string;
};

const DEFAULT_MIN = 1;
const DEFAULT_MAX = 20;

const ComensalesScreen: React.FC<ComensalesScreenProps> = ({
  initial = DEFAULT_MIN,
  min = DEFAULT_MIN,
  max = DEFAULT_MAX,
  onChange,
  onExit,
  style,
  testID,
}) => {
  const clamp = (v: number) => Math.max(min, Math.min(max, v));
  const [count, setCount] = useState<number>(clamp(initial));
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const animate = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.08,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const update = (next: number) => {
    const clamped = clamp(next);
    if (clamped === count) return;
    setCount(clamped);
    animate();
    onChange?.(clamped);
  };

  return (
    <View style={[styles.container, style]} testID={testID}>
      <Text style={styles.label}>Comensales</Text>

      <Animated.View
        style={[styles.pill, { transform: [{ scale: scaleAnim }] }]}
      >
        <TouchableOpacity
          accessible
          accessibilityLabel="Disminuir comensales"
          accessibilityRole="button"
          onPress={() => update(count - 1)}
          style={[styles.iconButton, count <= min && styles.iconDisabled]}
          activeOpacity={0.7}
          testID="minus-button"
        >
          <Text
            style={[styles.iconText, count <= min && styles.iconTextDisabled]}
          >
            −
          </Text>
        </TouchableOpacity>

        <View style={styles.countContainer}>
          <Text
            accessibilityRole="adjustable"
            accessibilityValue={{ min, max, now: count }}
            style={styles.countText}
            testID="count-text"
          >
            {count}
          </Text>
          <Text style={styles.hint}>personas</Text>
        </View>

        <TouchableOpacity
          accessible
          accessibilityLabel="Aumentar comensales"
          accessibilityRole="button"
          onPress={() => update(count + 1)}
          style={styles.iconButton}
          activeOpacity={0.7}
          testID="plus-button"
        >
          <Text style={styles.iconText}>+</Text>
        </TouchableOpacity>
      </Animated.View>

      <View style={styles.bottomRow}>
        <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={() => {
            setCount(min);
            onChange?.(min);
          }}
          activeOpacity={0.8}
          testID="reset-button"
        >
          <Text style={styles.secondaryText}>Reset</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => onExit?.(count)}
          activeOpacity={0.8}
          testID="confirm-button"
        >
          <Text style={styles.primaryText}>Confirmar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ComensalesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: COLORS.background,
    justifyContent: "center",
  },
  label: {
    fontSize: 24,
    alignContent: "center",
    textAlign: "center",
    color: COLORS.textdark,
    marginBottom: 12,
    fontWeight: "600",
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.background3,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 6,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 6,
  },
  iconButton: {
    width: 64,
    height: 64,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
    backgroundColor: COLORS.text3,
  },
  iconDisabled: {
    backgroundColor: COLORS.background2,
  },
  iconText: {
    fontSize: 32,
    color: COLORS.textdark1,
    fontWeight: Platform.OS === "ios" ? "600" : "800", // iOS tiene un peso de fuente diferente
  },
  iconTextDisabled: {
    color: COLORS.inactive,
  },
  countContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  countText: {
    fontSize: 40,
    color: COLORS.textnegro,
    fontWeight: "800",
  },
  hint: {
    fontSize: 12,
    color: COLORS.inactive,
    marginTop: 2,
    textTransform: "lowercase",
  },
  bottomRow: {
    marginTop: 28,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  primaryBtn: {
    backgroundColor: COLORS.textdark,
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 10,
    minWidth: 140,
    alignItems: "center",
  },
  primaryText: {
    color: COLORS.textblanco,
    fontWeight: "700",
    fontSize: 16,
  },
  secondaryBtn: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.background2,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
    minWidth: 100,
    alignItems: "center",
  },
  secondaryText: {
    color: COLORS.textdark1,
    fontWeight: "600",
  },
});
