import { getParamMozos, getRubrosSub } from "@/api/general";
import { getSectores } from "@/api/mesas";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { COLORS } from "../constants/Colors";
import { useLoginStore } from "../store/useStore";

export default function Index() {
  const limMesas = process.env.EXPO_PUBLIC_LIM_MESAS || "100";
  const sucursal = process.env.EXPO_PUBLIC_SUCURSAL || "-1";

  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  // Traigo los parámetros de mozos para usarlos en la app
  const traerParam = async () => {
    const { data: param, isError, isPending } = await getParamMozos();
    setIsPending(isPending);
    setIsError(isError);
    return param;
  };

  // Traigo rubros y subrubros para usarlos en la app
  const traerRubros = async () => {
    const { data: rubros, isError, isPending } = await getRubrosSub();
    setIsPending(isPending);
    setIsError(isError);
    return rubros;
  };

  // Traigo los sectores para usarlos en la app
  const traerSectores = async () => {
    const {
      data: sectores,
      isError,
      isPending,
    } = await getSectores(limMesas, sucursal);
    setIsPending(isPending);
    setIsError(isError);
    return sectores;
  };

  useEffect(() => {
    const fetchParam = async () => {
      const param = await traerParam();
      useLoginStore.getState().setParam(param);
      console.log("PARAM: ", param);
    };
    const fetchRubros = async () => {
      const rubros = await traerRubros();
      useLoginStore.getState().setRubros(rubros);
      console.log("RUBROS: ", rubros);
    };
    const fetchSectores = async () => {
      const sectores = await traerSectores();
      useLoginStore.getState().setSectores(sectores);
      console.log("SECTORES: ", sectores);
    };
    fetchParam();
    fetchRubros();
    fetchSectores();
  }, []);

  return (
    <View style={styles.container}>
      {isPending ? (
        <ActivityIndicator size="large" color={COLORS.text} />
      ) : isError ? (
        <Text style={styles.errorText}>Error al cargar los datos</Text>
      ) : (
        <>
          <Button title="Clave" onPress={() => router.push("/login")} />
          <Text style={styles.title}>Página inicial</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.text,
  },
  errorText: {
    color: COLORS.textdark,
    fontSize: 16,
    marginTop: 10,
  },
});
