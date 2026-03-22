import { getPlatos } from "@/api/platos";
import PlatosList from "@/componentes/platosList";
import RubrosList from "@/componentes/rubrosList";
import { COLORS } from "@/constants/Colors";
import useLoginStore from "@/store/useStore";
import { platosType } from "@/Types/interfaces";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Platos = () => {
  const { Rubros } = useLoginStore();
  const [desplegar, setDesplegar] = useState(false);
  const [selRubro, setSelRubro] = useState(0);
  const [platos, setPlatos] = useState<platosType[]>([]);
  const [enProceso, setEnProceso] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const handlePlatos = async (idRubro: number) => {
    const platos = await getPlatos("R", "", idRubro, 0);
    setPlatos(platos.data);
    setSelRubro(idRubro);
  };

  const handlePlato = (id: number) => {
    console.log("Plato seleccionado: ", id);

    // si ya está en proceso, opcional: ignorar nuevos clicks
    if (enProceso) return;

    setEnProceso(true);

    // iniciar animación aquí (ej. Animated.timing(...).start())

    // programar fin en 10s (10000 ms)
    timeoutRef.current = window.setTimeout(() => {
      setEnProceso(false);
      timeoutRef.current = null;
    }, 1000);
  };

  useEffect(() => {
    const fetchPlatos = async () => {
      const platos = await getPlatos("R", "", 1, 0);
      setPlatos(platos.data);
    };
    fetchPlatos();
  }, []);

  return (
    <View
      style={{ flex: 1, height: "100%", backgroundColor: COLORS.background }}
    >
      {/* Despliego Barra Superior */}
      <View style={styles.container}>
        <Text style={styles.title}>Rubros</Text>
        <TouchableOpacity onPress={() => setDesplegar(!desplegar)}>
          <Ionicons
            name={desplegar ? "code-working" : "apps-sharp"}
            size={24}
            color={COLORS.text}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/mesas")}>
          <Ionicons name="exit-outline" size={24} color={COLORS.text} />
        </TouchableOpacity>
      </View>
      {/* Despliego los Rubros  */}
      <View
        style={{
          marginTop: 10,
          padding: 10,
          backgroundColor: COLORS.background,
        }}
      >
        <RubrosList
          Rubros={Rubros}
          ultRubro={selRubro}
          handlePlatos={handlePlatos}
          desplegar={desplegar}
        />
      </View>
      {/* Despliego los Platos  */}
      <View
        style={{ flex: 1, padding: 10, backgroundColor: COLORS.background3 }}
      >
        {enProceso ? (
          // Deshabilito la lista de platos y muestro animación
          <View
            style={{
              flex: 1,
              padding: 1,
              backgroundColor: COLORS.background3,
            }}
          >
            <Text
              style={{
                color: COLORS.text,
                fontSize: 38,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Cargando plato...
            </Text>
          </View>
        ) : (
          <PlatosList
            data={platos}
            onSelect={(id) => {
              handlePlato(id);
            }}
          />
        )}
      </View>
    </View>
  );
};

export default Platos;

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
});
function fakeApiCall() {
  throw new Error("Function not implemented.");
}
