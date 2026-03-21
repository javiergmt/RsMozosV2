import { getMesa, getMesas } from "@/api/mesas";
import MesasList from "@/componentes/mesasList";
import SectoresList from "@/componentes/sectoresList";
import { mesasType } from "@/Types/interfaces";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../constants/Colors";
import { useLoginStore } from "../store/useStore";

const Mesas = () => {
  const limMesas = process.env.EXPO_PUBLIC_LIM_MESAS || "100";
  const sucursal = process.env.EXPO_PUBLIC_SUCURSAL || "-1";
  const { Sectores, Mozo, Param, setUltSector, ultSector } = useLoginStore();
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [mesas, setMesas] = useState<mesasType[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [text, onChangeText] = useState("");
  const [mesasConDesc, setMesasConDesc] = useState(true);

  // Cargo las mesas del Sector
  const handleMesas = (idSector: number | 2) => {
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
      setUltSector?.(idSector);
    };
    setRefreshing(true);
    load();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handleBuscarMesa = () => {
    const nroMesa = parseInt(text);
    useLoginStore.getState().setUltMesa?.(nroMesa);
    onChangeText("");
    AbrirMesa(nroMesa);
  };

  const handleMesaPress = (nroMesa: any) => {
    useLoginStore.getState().setUltMesa?.(nroMesa);
    AbrirMesa(nroMesa);
  };

  const traerMesa = async (nroMesa: number) => {
    const {
      data: mesa,
      isError,
      isPending,
    } = await getMesa(nroMesa.toString(), Number(sucursal));
    setIsPending(isPending);
    setIsError(isError);
    return mesa;
  };
  const AbrirMesa = (nroMesa: any) => {
    const mesa = mesas.filter((m) => m.NroMesa === nroMesa)[0];
    console.log("Mesa seleccionada: ", mesa);
    // Analizar si Cerrada = 0, y si pertenece al mozo o es mozo somellier
    // Segun si esta ocupada o no , la inicializo o la voy a buscar a la BD
    // y luego la cargo en el store para usarla en toda la app
    if (mesa.Cerrada === 1) {
      Alert.alert("Mesa Cerrada");
      return;
    }
    if (
      Mozo[0]?.idTipoMozo === 1 &&
      mesa.idMozo !== Mozo[0]?.idMozo &&
      mesa.idMozo !== 0 &&
      mesa.idMozo !== null
    ) {
      Alert.alert("Mesa de otro mozo");
      return;
    }
    if (mesa.Ocupada === "S") {
      traerMesa(nroMesa).then((mesa) => {
        useLoginStore.getState().setMesa(mesa);
      });
      router.push(`/(tabs)/cuenta`);
    } else {
      traerMesa(nroMesa).then((mesa) => {
        if (mesa[0]?.Ocupada === "S") {
          Alert.alert("Mesa Ocupada", `La mesa ${nroMesa} ha sido ocupada`);
        } else {
          console.log(
            "Mesa no ocupada, inicializando nueva mesa con nro: ",
            mesa,
          );
          const init = {
            NroMesa: nroMesa,
            idSector: Number(ultSector),
            Ocupada: "S",
            idMozo: Mozo[0]?.idMozo ?? 0,
            Cerrada: 0,
            CantPersonas: 0,
            Activa: false,
            SoloOcupada: false,
            DescMesa: "",
          };
          useLoginStore.getState().setMesa([init]);
          if (Param[0].PedirCubiertos) {
            router.push("/comensales");
          }
        }
      });
    }
  };

  useEffect(() => {
    handleMesas(Number(ultSector) || 2);
    const interval = setInterval(() => {
      handleMesas(Number(ultSector) || 2);
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View
      style={{ flex: 1, height: "100%", backgroundColor: COLORS.background }}
    >
      {/* Despliego Barra Superior */}
      <View style={styles.container}>
        <Text style={styles.title}>Mesas</Text>
        <View style={styles.container_search}></View>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder="Mesa.."
          placeholderTextColor="grey"
          keyboardType="numeric"
        />
        {
          <TouchableOpacity onPress={() => handleBuscarMesa()}>
            <Ionicons name="search" size={24} color={COLORS.text} />
          </TouchableOpacity>
        }
        <View />
        <TouchableOpacity onPress={() => router.push("/login")}>
          <Ionicons name="exit-outline" size={24} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      {/* Despliego los Sectores  */}
      <View style={{ backgroundColor: COLORS.text2 }}>
        <SectoresList
          Sectores={Sectores}
          ultSector={Number(ultSector)}
          handleMesas={(idSector: number) => handleMesas(idSector)}
        />
      </View>

      {/* Despliego las mesas del Sector */}
      <View style={styles.cont_mesas}>
        <MesasList
          mesas={mesas}
          onPressMesa={(nroMesa) => handleMesaPress(nroMesa)}
          mozo={{ idMozo: Mozo[0]?.idMozo, idTipoMozo: Mozo[0]?.idTipoMozo }}
          mesasConDesc={mesasConDesc}
          refreshing={refreshing}
          onRefresh={() => handleMesas(Number(ultSector))}
        />
      </View>
    </View>
  );
};

export default Mesas;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.background2,
    padding: 10,
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 1,
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
  input: {
    fontSize: 14,
    fontWeight: "bold",
    height: 30,
    width: "20%",
    borderWidth: 1,
    borderColor: COLORS.textdark,
    padding: 5,
    color: COLORS.text4,
    //backgroundColor: Colors.backbotones,
    borderRadius: 8,
    //paddingBottom: 1,
  },
  container_search: {
    alignItems: "flex-start",
    backgroundColor: COLORS.background2,
    padding: 1,
  },
});
