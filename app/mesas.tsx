import { getMesas } from "@/api/mesas";
import MesasList from "@/componentes/mesasList";
import SectoresList from "@/componentes/sectoresList";
import { mesasType } from "@/Types/interfaces";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../constants/Colors";
import { useLoginStore } from "../store/useStore";

const Mesas = () => {
  const limMesas = process.env.EXPO_PUBLIC_LIM_MESAS || "100";
  const { Sectores, Mozo } = useLoginStore();
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [mesas, setMesas] = useState<mesasType[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [ultSector, setUlSector] = useState(2);
  const [mesasConDesc, setMesasConDesc] = useState(true);

  // Cargo las mesas del Sector
  const handleMesas = (idSector: number) => {
    const load = async () => {
      const { data, isError, isPending } = await getMesas(limMesas, idSector);
      if (!isError) {
        // contar las mesas con descripcion
        if (data.filter((mesa) => mesa.DescMesa !== "").length > 0) {
          setMesasConDesc(true);
        } else {
          setMesasConDesc(false);
        }
      }
      setIsPending(isPending);
      setMesas(data);
      setUlSector(idSector);
    };
    setRefreshing(true);
    load();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  useEffect(() => {
    handleMesas(ultSector);
    const interval = setInterval(() => {
      handleMesas(ultSector);
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View
      style={{ flex: 1, height: "100%", backgroundColor: COLORS.background }}
    >
      <Text style={styles.title}>Mesas</Text>
      <Button title="Volver al Login" onPress={() => router.push("/login")} />

      {/* Despliego los Sectores  */}
      <View style={{ backgroundColor: COLORS.text2 }}>
        <SectoresList
          Sectores={Sectores}
          ultSector={ultSector}
          handleMesas={(idSector: number) => handleMesas(idSector)}
        />
      </View>

      {/* Despliego las mesas del Sector */}
      <View style={{ flex: 1, backgroundColor: COLORS.background }}>
        <MesasList
          mesas={mesas}
          onPressMesa={(nroMesa) => console.log("Mesa seleccionada:", nroMesa)}
          mozo={{ idMozo: Mozo[0]?.idMozo, idTipoMozo: Mozo[0]?.idTipoMozo }}
          mesasConDesc={mesasConDesc}
          refreshing={refreshing}
          onRefresh={() => handleMesas(ultSector)}
        />
      </View>
    </View>
  );
};

export default Mesas;

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
  sectorSel: {
    backgroundColor: COLORS.textdark,
    padding: 10,
  },
  sectoSinSel: {
    backgroundColor: COLORS.text2,
    padding: 10,
  },
  cont_mesas: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  itemText: {
    fontSize: 18,
    color: COLORS.text,
    textAlign: "center",
    padding: 20,
  },
  cuadrado_red: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  itemTextDesc: {
    fontSize: 12,
    color: COLORS.text2,
    textAlign: "center",
    marginTop: 5,
  },
});
