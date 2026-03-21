import { mesasType, mesaType, sectoresType } from "@/Types/interfaces";

export default function general() {
  return null;
}

const apiUrl = process.env.EXPO_PUBLIC_API_URL;
//const api = process.env.EXPO_PUBLIC_API;
const api = "PHP";
const base = process.env.EXPO_PUBLIC_BASE || "RestobarW";
const host = "http://192.168.1.48:1234";

// Sectores
export const getSectores = async (
  limMesas: string,
  sucursal: string,
): Promise<{
  data: sectoresType[];
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
              service: "mesas",
              method: "sectores",
              params: {
                count: parseInt(limMesas),
                sucursal: parseInt(sucursal),
                iddelivery: 1,
              },
            }),
          })
        : await fetch(host + `/sectores/${limMesas}/${sucursal}/1`, {
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

// Mesas
export const getMesas = async (
  limMesas: string,
  idSector: number,
): Promise<{
  data: mesasType[];
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
              service: "mesas",
              method: "mesas",
              params: {
                count: parseInt(limMesas),
                idSector: idSector,
              },
            }),
          })
        : await fetch(host + `/mesas/${limMesas}/${idSector}`, {
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

export const getMesa = async (
  NroMesa: string,
  sucursal: number,
): Promise<{
  data: mesaType[];
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
              service: "mesas",
              method: "mesa",
              params: {
                NroMesa: parseInt(NroMesa),
                Sucursal: sucursal,
              },
            }),
          })
        : await fetch(host + `/mesas/${NroMesa}/${sucursal}`, {
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
