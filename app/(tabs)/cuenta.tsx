import { COLORS } from "@/constants/Colors";
import useLoginStore from "@/store/useStore";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const Cuenta = () => {
  const { comensales, ultMesa, Mesa } = useLoginStore();
  //console.log(Mesa);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity onPress={() => router.push("/login")}>
        <Text style={{ color: COLORS.text, fontSize: 18, marginBottom: 10 }}>
          Comensales: {comensales} - Mesa {ultMesa} - {Mesa[0]?.CantPersonas}
        </Text>
        <Ionicons name="exit-outline" size={24} color={COLORS.text} />
      </TouchableOpacity>
    </View>
  );
};

export default Cuenta;
