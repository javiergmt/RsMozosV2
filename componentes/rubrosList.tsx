import { rubrosSubType } from "@/Types/interfaces";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    FlatList,
    ListRenderItemInfo,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { COLORS } from "../constants/Colors";

type Props = {
  Rubros: rubrosSubType[];
  ultRubro: number | string | null;
  handlePlatos: (idRubro: number) => void;
  desplegar: boolean;
};

const RubrosList: React.FC<Props> = ({
  Rubros,
  ultRubro,
  handlePlatos,
  desplegar,
}) => {
  const renderItem = ({ item: s }: ListRenderItemInfo<rubrosSubType>) => {
    const selected = s.idRubro === ultRubro;

    return (
      <TouchableOpacity onPress={() => handlePlatos(Number(s.idRubro))}>
        <View style={selected ? styles.seleccionado : styles.noSeleccionado}>
          {s.Descripcion.toUpperCase() === "FAVORITOS" ? (
            <Ionicons name="heart-outline" size={24} color={COLORS.textdark} />
          ) : (
            <Text style={styles.text}>{s.Descripcion}</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      horizontal={!desplegar}
      data={Rubros}
      keyExtractor={(item) => String(item.idRubro)}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
      showsHorizontalScrollIndicator={false}
      scrollEnabled={true}
      extraData={ultRubro}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    alignItems: "center",
    backgroundColor: COLORS.background,
    gap: 5,
  },
  containerVert: {
    flexDirection: "column",
    flexGrow: 1,

    paddingHorizontal: 5,
    alignItems: "center",
    backgroundColor: COLORS.background,
    gap: 5,
  },
  seleccionado: {
    backgroundColor: COLORS.text6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 8,
  },
  noSeleccionado: {
    backgroundColor: COLORS.text2,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: COLORS.background2 ?? "#ccc",
  },
  text: {
    color: COLORS.textdark ?? "#000",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default RubrosList;
