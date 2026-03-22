import ComensalesScreen from "@/componentes/comensalesInput";
import useLoginStore from "@/store/useStore";
import { router } from "expo-router";
import React from "react";
import { View } from "react-native";

const onExit = (value: number) => {
  useLoginStore.getState().setComensales?.(value);
  router.push("/(tabs)/platos");
};

const Comensales = () => {
  const { setComensales } = useLoginStore();
  return (
    <View style={{ flex: 1 }}>
      <ComensalesScreen initial={1} onExit={(value) => onExit(value)} />
    </View>
  );
};

export default Comensales;
