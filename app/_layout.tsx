import { COLORS } from "@/constants/Colors";
import { Stack } from "expo-router";

import { SQLiteProvider, type SQLiteDatabase } from "expo-sqlite";
import { useEffect } from "react";
import { StatusBar } from "react-native";

const loaded = true;
const InitialLayout = () => {
  useEffect(() => {
    if (loaded) {
      //Splah screen
      console.log("Loaded");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SQLiteProvider databaseName={"rsmozosv2.db"} onInit={migratedDbIfNeeded}>
      <StatusBar barStyle="light-content" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.background,
          },
          headerTintColor: COLORS.itemBackground,
        }}
      >
        <Stack.Screen
          name="index"
          options={{ headerShown: false, title: "Inicio" }}
        />
        <Stack.Screen
          name="config"
          options={{ headerShown: false, title: "Configuración" }}
        />
        <Stack.Screen
          name="login"
          options={{ headerShown: false, title: "Iniciar Sesión" }}
        />
        <Stack.Screen
          name="mesas"
          options={{ headerShown: false, title: "Mesas" }}
        />
        <Stack.Screen
          name="reservas"
          options={{ headerShown: false, title: "Reservas" }}
        />
      </Stack>
    </SQLiteProvider>
  );
};

async function migratedDbIfNeeded(db: SQLiteDatabase) {
  console.log("Checking if DB needs migration...");
}

export default function RootLayout() {
  return <InitialLayout />;
}
