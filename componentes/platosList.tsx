import { COLORS } from "@/constants/Colors";
import { platosType } from "@/Types/interfaces";
import React, { FC, useCallback } from "react";
import {
    FlatList,
    ListRenderItemInfo,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

type Props = {
  data: platosType[];
  selectedId?: number;
  onSelect: (idPlato: number) => void;
};

const PlatosList: FC<Props> = ({ data, selectedId, onSelect }) => {
  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<platosType>) => {
      const isSelected = selectedId === item.idPlato;
      return (
        <TouchableOpacity
          activeOpacity={0.3}
          style={[styles.item, isSelected && styles.itemSelected]}
          onPress={() => onSelect(item.idPlato)}
        >
          <View style={styles.left}>
            <View style={styles.placeholder}>
              <Text style={styles.placeholderText}>
                {item.Descripcion?.charAt(0)?.toUpperCase() || "P"}
              </Text>
            </View>
          </View>

          <View style={styles.center}>
            <View style={styles.row}>
              <Text numberOfLines={2} style={styles.title}>
                {item.DescCorta || item.Descripcion}
              </Text>
              <Text numberOfLines={2} style={styles.titleExtended}>
                {item.CantGustos > 0 && " Variantes"}
                {!item.TamanioUnico && " Modif"}
                {item.idTipoConsumo === "CB" && " Combo"}
              </Text>
            </View>
          </View>

          <View style={styles.right}>
            {item.Precio > 0 ? (
              <Text style={styles.price}>
                ${Number(item.Precio).toFixed(2)}
              </Text>
            ) : (
              <Text style={styles.priceFree}>-</Text>
            )}
          </View>
        </TouchableOpacity>
      );
    },
    [onSelect, selectedId],
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(i) => i.idPlato.toString()}
      renderItem={renderItem}
      contentContainerStyle={
        data.length === 0 ? styles.emptyContainer : styles.listContainer
      }
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      showsVerticalScrollIndicator={false}
      scrollEnabled={true}
    />
  );
};

export default PlatosList;

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: COLORS.background,
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: COLORS.background,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.itemBackground,
    padding: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  itemSelected: {
    borderWidth: 2,
    borderColor: COLORS.text6,
    backgroundColor: COLORS.background3,
  },
  left: {
    width: 60,
    height: 60,
    marginRight: 12,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    resizeMode: "cover",
  },
  placeholder: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: COLORS.text2,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: COLORS.textblanco,
    fontWeight: "700",
  },
  center: {
    flex: 1,
    justifyContent: "center",
  },
  right: {
    marginLeft: 8,
    alignItems: "flex-end",
    minWidth: 60,
  },
  title: {
    color: COLORS.textdark,
    fontSize: 16,
    fontWeight: "600",
  },
  titleExtended: {
    color: COLORS.text4,
    fontSize: 16,
    fontWeight: "600",
  },
  subtitle: {
    color: COLORS.textdark1,
    fontSize: 12,
    marginTop: 4,
  },
  price: {
    color: COLORS.text6,
    fontWeight: "700",
    fontSize: 16,
  },
  priceFree: {
    color: COLORS.inactive,
    fontSize: 13,
  },
  separator: {
    height: 8,
  },
  row: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  badge: {
    marginLeft: 8,
    backgroundColor: COLORS.mesaOcupada,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: {
    color: COLORS.textblanco,
    fontSize: 10,
    fontWeight: "700",
  },
  emptyText: {
    color: COLORS.inactive,
  },
});
