import api from "../utils/AxiosTemplate";
import RestoreDatabaseForm from "../model/RestoreDatabaseForm";

export const getDataBases = () => {
  return api.get("/rodar-sql/bancos");
}

export const abrirPasta = (numero_caso: string) => {
  return api.post("/apagar-db/abrir-pasta", { numero_caso });
}

export const getMantisInfo = (numeroCasos: Array<string>) => {
  return api.post('/mantis', { issue_number: numeroCasos });
}

export const restaurarLink = (dados: RestoreDatabaseForm) => {
  return api.post('/restaurar-link', dados);
}

export const apagarBanco = (dbname: string) => {
  let dados = {nome_banco: {}} as any;
  dados.nome_banco[dbname] = true;
  return api.post('/apagar-db/apagar', dados);
}

export const findArquivoDownload = ()  => {
  return api.get('/limpar-pasta');
}

export const apagarArquivoDownload = ()  => {
  return api.post('/limpar-pasta');
}