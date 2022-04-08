import React, {useEffect, useState} from "react";
import {Button, Grid} from "@mantine/core";
import IssueCard from "../component/IssueCard";
import {abrirPasta, apagarBanco, getDataBases, getMantisInfo} from "../service/dashboard.service";
import Database from "../model/Database";
import QuestionModal from "../component/QuestionModal";
import {useDisclosure} from "@mantine/hooks";

const REGEX_NUMEROCASO = /(?<=.*)\d{5}$/g;
const Dashboard = () => {

  const [bancos, setBancos] = useState([] as Array<any>);
  const [infoMantis, setInfoMantis] = useState([] as Array<any>)
  const [deleteOpen, deleteOpenHandler] = useDisclosure(false);
  const [loadingData, loadingDataHandler] = useDisclosure(false);
  const [selectedDatabase, setSelectedDatabase] = useState({} as Database);

  useEffect(() => {
    getBancos();
  }, []);


  useEffect(() => {
    const numeroCasos = bancos.filter(it => it.dbname.match(REGEX_NUMEROCASO)).map(it => it.dbname.match(REGEX_NUMEROCASO))
    .filter(it => it.length > 0).map(it => it[0]);

    if (numeroCasos.length > 0) {
      getMantisInfo(numeroCasos).then(result => {
            setInfoMantis(result.data)
            loadingDataHandler.close();
          }
      ).catch(reason => {
        loadingDataHandler.close();
      });
    }
  }, [bancos]);

  const getBancos = async () => {
    loadingDataHandler.open();
    getDataBases().then(result => {
      setBancos(result.data);
    })
  }

  const getDadosCaso = (database: Database) => {
    const numeroCaso: any = getNumeroCaso(database);
    return numeroCaso && infoMantis[numeroCaso];
  }

  const griColTheme = (theme: any) => ({
    backgroundColor: theme.colors.gray[0],
    '&:hover': {
      backgroundColor: theme.colors.gray[1],
    },
  });

  function getNumeroCaso(item: Database) {
    const numeroCaso = item && item.dbname && REGEX_NUMEROCASO.test(item.dbname) && item.dbname.match(REGEX_NUMEROCASO);
    return numeroCaso ? numeroCaso[0] : null;
  }

  const callAbrirPasta = (item: Database) => {
    let numeroCaso = getNumeroCaso(item);
    if (numeroCaso) {
      abrirPasta(numeroCaso);
    }
  }

  const confirmDeleteDatabase = (item: Database) => {
    deleteOpenHandler.open();
    setSelectedDatabase(item);
  }

  const callApagarBanco = () => {
    deleteOpenHandler.close();
    apagarBanco(selectedDatabase.dbname).then(result => getBancos());
  }

  const buildIssueCard = () => {
    return bancos && bancos.map((banco, idx) => {
          return <Grid.Col sx={griColTheme} sm={12} md={6} xl={4}
                           children={<IssueCard key={idx} database={banco}
                                                openFolderAction={callAbrirPasta}
                                                dropDatabaseAction={confirmDeleteDatabase}
                                                informacaoMantis={getDadosCaso(banco)}/>}/>;
        }
    )
  }

  return (
      <Grid>
        <Grid.Col sx={griColTheme} sm={12}>
          <Button onClick={getBancos} disabled={loadingData}>Refresh</Button>
        </Grid.Col>
        {buildIssueCard()}
        <QuestionModal open={deleteOpen}
                       title="Confirmação"
                       question={`Deseja realmente apagar/excluir o Banco de Dados '${selectedDatabase.dbname}'?`}
                       onClose={deleteOpenHandler.toggle}
                       confirmAction={callApagarBanco}
                       cancelAction={deleteOpenHandler.close}/>
      </Grid>
  )
}

export default Dashboard;