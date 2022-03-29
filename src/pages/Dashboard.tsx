import React, {useEffect, useState} from "react";
import {Grid} from "@mantine/core";
import IssueCard from "../component/IssueCard";
import {abrirPasta, getDataBases, getMantisInfo} from "../service/dashboard.service";
import Database from "../model/Database";

const Dashboard = () => {

  const [bancos, setBancos] = useState([] as Array<any>);
  const [infoMantis, setInfoMantis] = useState([] as Array<any>)
  const REGEX_NUMEROCASO = /(?<=.*)[0-9]{5}$/g;

  useEffect(() => {
    getBancos();
  }, []);

  useEffect(() => {
    const numeroCasos = bancos.filter(it => REGEX_NUMEROCASO.test(it.dbname)).map(it => it.dbname.match(REGEX_NUMEROCASO)).filter(
        it => it.length > 0).map(it => it[0]);
    if (numeroCasos.length > 0) {
      getMantisInfo(numeroCasos).then(result => {
            console.log(result.data);
            setInfoMantis(result.data)
          }
      );
    }
  }, [bancos]);

  const getBancos = async () => {
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

  const buildIssueCard = () => {
    return bancos && bancos.map((banco, idx) => {
          return <Grid.Col sx={griColTheme} sm={12} md={6} xl={4}
                           children={<IssueCard key={idx} database={banco}
                                                openFolderAction={callAbrirPasta}
                                                informacaoMantis={getDadosCaso(banco)}/>}/>;
        }
    )
  }

  return (
      <Grid>
        {buildIssueCard()}
      </Grid>
  )
}

export default Dashboard;