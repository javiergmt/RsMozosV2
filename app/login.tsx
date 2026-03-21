import { validarMozo } from "@/api/general";
import Teclado from "@/componentes/teclado";
import useLoginStore from "@/store/useStore";
import { useRouter } from "expo-router";
import { Alert, View } from "react-native";

const Login = () => {
  const router = useRouter();
  const { Mozo } = useLoginStore();
  const traerMozo = async (clave: string) => {
    const { data: mozo, isError, isPending } = await validarMozo(clave);
    return mozo;
  };

  const validarClave = async (clave: string) => {
    const mozo = await traerMozo(clave); // Ejemplo de clave válida
    if (mozo.length > 0) {
      useLoginStore.getState().setMozo(mozo);
    }
    return mozo.length > 0;
  };

  const handleSubmit = async (value: string) => {
    const esValida = await validarClave(value);
    if (esValida) {
      router.push("/mesas");
    } else {
      Alert.alert(
        "Clave incorrecta",
        "La clave ingresada no es válida. Intente nuevamente.",
      );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Teclado
        //onChangeText={(t) => console.log("onChange:", t)}
        onSubmit={handleSubmit}
      />
    </View>
  );
};

export default Login;
