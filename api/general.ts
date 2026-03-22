import { mozoType, paramMozosType, rubrosSubType } from "@/Types/interfaces";

export default function general() {
  return null;
}
const apiUrl = process.env.EXPO_PUBLIC_API_URL;
//const api = process.env.EXPO_PUBLIC_API;
const api = "PHP";
const base = process.env.EXPO_PUBLIC_BASE || "RestobarW";
const host = "http://192.168.50.5:1234";

export const getParamMozos = async (): Promise<{
  data: paramMozosType[];
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
              service: "mozos",
              method: "paramMozos",
              params: {},
            }),
          })
        : await fetch(host + "/param_mozos", {
            method: "GET",
            headers: new Headers({
              bd: base,
            }),
          });

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

// Rubros y subrubros
export const getRubrosSub = async (): Promise<{
  data: rubrosSubType[];
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
              service: "rubros",
              method: "rubros",
              params: {
                Sucursal: -1,
                Favoritos: 0,
                Delivery: 0,
              },
            }),
          })
        : await fetch(host + "/rubros_Sub/-1/0/0", {
            method: "GET",
            headers: new Headers({
              bd: base,
            }),
          });

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

// Valida mozo segun clave ingresada
export const validarMozo = async (
  clave: string,
): Promise<{
  data: mozoType[];
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
              service: "mozos",
              method: "mozospass",
              params: {
                pass: parseInt(clave),
              },
            }),
          })
        : await fetch(host + `/mozos_pass/${clave}`, {
            method: "GET",
            headers: new Headers({
              bd: base,
            }),
          });

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
