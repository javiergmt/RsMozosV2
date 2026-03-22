import { platosType } from "@/Types/interfaces";

export default function platos() {
  return null;
}
const apiUrl = process.env.EXPO_PUBLIC_API_URL;
//const api = process.env.EXPO_PUBLIC_API;
const api = "PHP";
const base = process.env.EXPO_PUBLIC_BASE || "RestobarW";
const host = "http://192.168.50.5:1234";
const sucursal = process.env.EXPO_PUBLIC_SUCURSAL || "-1";

export const getPlatos = async (
  oper: string,
  cadena: string,
  idRubro: number,
  idSubrubro: number,
): Promise<{
  data: platosType[];
  isError: boolean;
  isPending: boolean;
}> => {
  let isPending = true;
  let isError = false;
  let url = apiUrl + "/index.php";

  try {
    const response =
      api === "PHP"
        ? await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              service: "platos",
              method: "platos",
              params: {
                cOper: oper,
                cCadena: cadena,
                nRubro: idRubro,
                nSubRubro: idSubrubro,
                Sucursal: sucursal,
              },
            }),
          })
        : await fetch(
            host + `/platos/${oper}/${idRubro}/${idSubrubro}/${sucursal}`,
            {
              method: "GET",
              headers: new Headers({
                bd: base,
              }),
            },
          );

    const dataJson = await response.json();
    //console.log("DATA: ", dataJson);
    isPending = false;
    return {
      data: api === "PHP" ? dataJson.data : dataJson,
      isError,
      isPending,
    };
  } catch (error) {
    console.log("ERROR: ", error);
    isError = true;
  }
  isPending = false;
  return { data: [], isError, isPending };
};
