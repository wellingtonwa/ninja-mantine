import React, {useEffect, useState} from "react";
import { Button, Grid, Group, Text } from "@mantine/core";
import IssueCard from "../component/IssueCard";
import {getDataBases, abrirPasta, getMantisInfo} from "../service/dashboard.service";

interface DatabaseProps {
  dbname: string;
}

interface InfoMantisProps {
  categoria: string;
  codigoCliente: string;
  complexidade: string;
  crReact: string;
  dataEnvio: string;
  descricao: string;
  estado: string;
  informacaoAdicional: string;
  numeroCaso: string;
  prioridade: string;
  projeto: string;
  resumo: string;
  ultimaAtualizacao: string;
  versao: string;
}

const Dashboard = () => {

  const [bancos, setBancos] = useState([] as Array<any>);
  const [infoMantis, setInfoMantis] = useState([] as Array<InfoMantisProps>)
  const REGEX_NUMEROCASO = /(?<=.*)[0-9]{5}$/g;

  useEffect(() => {
    getBancos();
  }, []);

  useEffect(() => {
    const numeroCasos = bancos.filter(it => REGEX_NUMEROCASO.test(it.dbname)).map(it => it.dbname.match(REGEX_NUMEROCASO)).filter(
        it => it.length > 0).map(it => it[0]);
    if (numeroCasos.length > 0) {
      console.log(numeroCasos);
      getMantisInfo(numeroCasos).then(result =>
          setInfoMantis(result.data)
      );
    }
  }, [bancos]);

  const getBancos = async () => {
    getDataBases().then(result => {
      setBancos(result.data);
    })
  }

  const griColTheme = (theme: any) => ({
    backgroundColor: theme.colors.gray[0],
    '&:hover': {
      backgroundColor: theme.colors.gray[1],
    },
  });

  const callAbrirPasta = (item: DatabaseProps, __: any) => {
    let numeroCaso = item && item.dbname && REGEX_NUMEROCASO.test(item.dbname) && item.dbname.match(REGEX_NUMEROCASO);
    if (numeroCaso) {
      abrirPasta(numeroCaso[0]);
    }
  }

  const buildIssueCard = () => {
    return bancos && bancos.map((banco, idx) => {
      return <Grid.Col span={4} sx={griColTheme} children={<IssueCard key={idx}>
            <Text weight={500} size="lg">{banco.dbname}</Text>
            <Group direction="row" position="apart" sx={(theme) =>({
              marginTop: 10,
            })}>
              <Button color="red">Apagar</Button>
              <Button onClick={callAbrirPasta.bind(null, banco)}>Abrir Pasta</Button>
            </Group>
          </IssueCard>}/>;
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