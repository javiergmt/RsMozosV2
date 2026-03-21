import { mesasType } from "@/Types/interfaces";
import { COLORS } from "@/constants/Colors";
import convColor from "@/funciones/convColor";
import useLoginStore from "@/store/useStore";
import React, { useMemo } from "react";

import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

type Props = {
  mesas: mesasType[];
  onPressMesa?: (nroMesa: number | string) => void;
  mozo?: { idMozo?: number; idTipoMozo?: number };
  minItemWidth?: number; // ancho mínimo deseado para cada celda
  gap?: number; // espacio entre celdas
  mesasConDesc?: boolean; // si true, muestra descripción en lugar de número
  refreshing?: boolean;
  onRefresh?: () => void;
};

const MesasList: React.FC<Props> = ({
  mesas,
  onPressMesa,
  mozo,
  minItemWidth = 80,
  gap = 6,
  mesasConDesc,
  refreshing,
  onRefresh,
}) => {
  const { width } = useWindowDimensions();

  // Calcular columnas según ancho disponible y minItemWidth
  const { numColumns, itemWidth } = useMemo(() => {
    const available = width - 16; // padding horizontal total (ajusta si usas otro padding)
    const cols = Math.max(
      1,
      Math.floor((available + gap) / (minItemWidth + gap)),
    );
    const computedWidth = Math.floor((available - gap * (cols - 1)) / cols);
    return { numColumns: cols, itemWidth: computedWidth };
  }, [width, minItemWidth, gap]);
  const { Param } = useLoginStore();
  const mesaColor = (
    ocupada: string,
    cerrada: number,
    conPostre: boolean,
    idMozo: number,
    idMozoSel: number,
    soloOcupada: boolean,
    idTipoMozo: number,
    activa: boolean,
  ) => {
    //console.log('mesaColor:',ocupada,cerrada,conPostre,idMozo,idMozoSel,soloOcupada,idTipoMozo)
    if (activa) {
      if (
        idMozoSel !== idMozo &&
        idTipoMozo !== 3 &&
        idTipoMozo !== 2 &&
        ocupada === "S" &&
        cerrada === 0
      ) {
        if (soloOcupada) {
          return "lightblue";
        } else {
          return "gray";
        }
      } else {
        if (conPostre) {
          return convColor(Param[0].ColorPostre) || COLORS.postre;
        } else {
          if (soloOcupada) {
            return "lightblue";
          } else {
            if (cerrada === 1) {
              return convColor(Param[0].ColorMesaCerrada) || COLORS.mesaCerrada;
            } else {
              if (ocupada === "N") {
                return convColor(Param[0].ColorMesaNormal) || COLORS.mesaNormal;
              } else {
                return (
                  convColor(Param[0].ColorMesaOcupada) || COLORS.mesaOcupada
                );
              }
            }
          }
        }
      }
    } else {
      return "lightgray";
    }
  };

  const renderItem = ({ item: m }: ListRenderItemInfo<mesasType>) => {
    //console.log("Renderizando mesa:", m?.NroMesa, "Cerrada:", m?.Cerrada);

    return (
      <TouchableOpacity
        onPress={() => {
          onPressMesa?.(m.NroMesa);
        }}
        activeOpacity={0.7}
      >
        <View
          style={[styles.mesaWrapper, { width: itemWidth, marginBottom: gap }]}
        >
          <View
            style={[
              styles.cuadro,
              {
                width: itemWidth,
                height: itemWidth,
                backgroundColor: mesaColor(
                  m?.Ocupada ?? "N",
                  m?.Cerrada ?? 0,
                  m?.ConPostre ?? false,
                  m?.idMozo ?? 1,
                  mozo?.idMozo ?? 0,
                  m?.SoloOcupada ?? false,
                  mozo?.idTipoMozo ?? 0,
                  m?.Activa ?? true,
                ),
              },
            ]}
          >
            <Text style={styles.itemText}>{String(m?.NroMesa ?? "?")}</Text>
            {mesasConDesc && (
              <Text style={[styles.itemText]}>{m.DescMesa}</Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={mesas ?? []}
      keyExtractor={(item, index) =>
        `${String(item?.idSector ?? "s")}-${String(item?.NroMesa ?? index)}`
      }
      renderItem={renderItem}
      extraData={mesas}
      contentContainerStyle={styles.listContainer}
      style={{ flex: 1 }}
      numColumns={numColumns}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: { padding: 1 },
  mesaWrapper: {
    flex: 1 / 3,
    padding: 6,
    alignItems: "center",
    marginRight: 10, // espacio horizontal entre items
    marginBottom: 10, // espacio vertical entre filas
    //flexBasis: "33%", // si usas numColumns={3} o calcula dinámicamente
  },
  cuadro: {
    width: 80,
    height: 80,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  itemText: {
    color: COLORS.textdark,
    fontSize: 25,
    fontWeight: "bold",
  },
});

export default MesasList;
