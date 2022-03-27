import React, {useEffect, useState} from "react";
import { Button, Grid, Group, Text } from "@mantine/core";
import IssueCard from "../component/IssueCard";
import {getDataBases} from "../service/dashboard.service";

const Dashboard = () => {

  const [bancos, setBancos] = useState([] as Array<any>);
  const REGEX_NUMEROCASO = /(?<=.*)[0-9]{5}$/g;

  useEffect(() => {
    getBancos();
  }, []);

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

  const callAbrirPasta = (item: any, __: any) => {
    console.log(item.replaceAll(//g), __);
  }

  const buildIssueCard = () => {
    return bancos && bancos.map((banco, idx) => {
      return <Grid.Col span={4} sx={griColTheme} children={<IssueCard key={idx}>
            <Text>{banco.dbname}</Text>
            <Group>
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