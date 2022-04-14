import api from "../utils/AxiosTemplate";
import RestoreDatabaseForm from "../model/restoreDatabaseForm";
import RestoreFileForm from "../model/restoreFileForm";

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

export const restaurarArquivo = (dados: RestoreFileForm) => {
  var formData = new FormData();
  dados.informar_nome && formData.append("informar_nome", Boolean(dados.informar_nome).toString());
  formData.append("nome-banco", dados['nome-banco']);
  if (dados.arquivo) {
    console.log("Setando arquivo");
    formData.append("arquivo", dados.arquivo, dados.arquivo.name);
  }
  return api.post('/restaurar', formData);
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