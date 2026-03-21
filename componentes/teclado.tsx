import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { COLORS } from "@/constants/Colors";

const Teclado = ({
  onChangeText = () => {},
  onSubmit,
}: {
  onChangeText?: (text: string) => void;
  onSubmit: (password: string) => void;
}) => {
  //const router = useRouter();
  const [password, setPassword] = useState("");

  const handlePress = (value: string) => {
    const next = value === "delete" ? password.slice(0, -1) : password + value;
    setPassword(next);
    onChangeText(next);
  };

  const handleSubmit = async () => {
    onSubmit(password);
    setPassword("");
    //router.push("/mesas");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.inner}>
        <Text style={styles.header}>Ingrese su clave</Text>

        {/* Mostrar la clave */}
        <Text style={styles.password}>{password}</Text>

        {/* Teclado numérico */}
        <View style={styles.keypad}>
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", "delete", "0"].map(
            (item) => (
              <TouchableOpacity
                key={item}
                style={styles.key}
                onPress={() => handlePress(item)}
              >
                <Text style={styles.keyText}>
                  {item === "delete" ? "⌫" : item}
                </Text>
              </TouchableOpacity>
            ),
          )}
        </View>

        {/* Botón para enviar */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Teclado;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: COLORS.background,
  },
  inner: { alignItems: "center", width: "100%" },
  header: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 12,
    color: COLORS.textdark1,
  },

  passwordBox: {
    backgroundColor: COLORS.background3,
    width: "70%",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
    // sombra
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 6,
  },
  password: {
    fontSize: 32,
    fontWeight: "800",
    letterSpacing: 8,
    color: COLORS.textdark1,
  },

  keypad: {
    width: "80%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  key: {
    backgroundColor: COLORS.text2,
    width: "30%",
    aspectRatio: 1, // tecla cuadrada
    marginVertical: 8,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    // sombra suave
    shadowColor: "#04532b",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  deleteKey: {
    backgroundColor: COLORS.background2, // sutil distinto para delete pero respetando paleta
  },
  keyText: { fontSize: 22, fontWeight: "700", color: COLORS.textdark1 },
  deleteText: { color: COLORS.textdark1, fontSize: 20 },

  keyPressed: { transform: [{ scale: 0.98 }] },

  submitButton: {
    backgroundColor: COLORS.textdark,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    // sombra clara
    shadowColor: COLORS.text6,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 6,
  },
  submitPressed: { opacity: 0.95 },
  submitButtonText: {
    color: COLORS.itemBackground,
    fontSize: 18,
    fontWeight: "800",
  },
});
