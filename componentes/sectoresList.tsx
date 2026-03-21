import { sectoresType } from "@/Types/interfaces";
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

type Sector = {
  idSector: number | string;
  Descripcion: string;
  // añadir otras propiedades si existen
};

type Props = {
  Sectores: sectoresType[];
  ultSector: number | string | null;
  handleMesas: (idSector: number) => void;
};

const SectoresList: React.FC<Props> = ({
  Sectores,
  ultSector,
  handleMesas,
}) => {
  const renderItem = ({ item: s }: ListRenderItemInfo<Sector>) => {
    const selected = s.idSector === ultSector;
    return (
      <TouchableOpacity onPress={() => handleMesas(Number(s.idSector))}>
        <View style={selected ? styles.sectorSel : styles.sectoSinSel}>
          <Text style={styles.text}>{s.Descripcion}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      horizontal
      data={Sectores}
      keyExtractor={(item) => String(item.idSector)}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
      showsHorizontalScrollIndicator={false}
      scrollEnabled={true}
      extraData={ultSector}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 2,
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
  sectorSel: {
    backgroundColor: COLORS.text3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 8,
  },
  sectoSinSel: {
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

export default SectoresList;
