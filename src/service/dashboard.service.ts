import api from "../utils/AxiosTemplate";

export const getDataBases = () => {
  return api.get("/rodar-sql/bancos");
}

export const abrirPasta = (numero_caso: string) => {
  return api.post("/apagar-db/abrir-pasta", { numero_caso });
}

export const getMantisInfo = (numeroCasos: Array<string>) => {
  return api.post('/mantis', { issue_number: numeroCasos });
}