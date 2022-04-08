import React, {ReactNode} from "react";
import {Clipboard} from 'tabler-icons-react'
import {Paper, Button, Title, Group, ActionIcon} from "@mantine/core";
import Database from "../model/Database";
import InformacaoMantis from "../model/InformacaoMantis";
import DadosCaso from "./DadosCaso";
import {useClipboard} from "@mantine/hooks";


interface IssueCardProps {
  database: Database;
  informacaoMantis?: InformacaoMantis;
  openFolderAction: (database: Database) => void;
  dropDatabaseAction: (database: Database) => void;
  children?: ReactNode;
}

const IssueCard = (props: IssueCardProps) => {

  const {database, informacaoMantis, openFolderAction, dropDatabaseAction} = props;
  const clipboard = useClipboard({timeout: 500});

  const paperStyle = (theme: any, estado: string | undefined) => ({
      backgroundColor: getIssueStateColor(estado)
  });

    const getIssueStateColor = (estado: string | undefined) => {
        switch (estado) {
            case 'resolvido':
            case 'fechado':
                return '#D4EFDF';
            case 'aguardando code review':
                return '#F2D7D5';
            case 'desenvolvimento':
                return '#F9E79F';
            case 'retorno':
                return '#E8DAEF';
            case 'aguardando teste':
                return '#7FB3D5';
            case 'atribuído':
                return '#D6EAF8';
            default:
                return '#EBF5FB';
        }
    }

  return (
      <Paper shadow="xl" p="md" sx={paperStyle(null, informacaoMantis?.estado)} >
        <Group spacing="xs">
          <Title order={3}>{database.dbname}</Title>
          <ActionIcon component={Clipboard} onClick={() => clipboard.copy(database.dbname)}/>
        </Group>

        <Group direction="row" position="apart" sx={(theme: any) => ({
          marginTop: 10,
        })}>
          {informacaoMantis && <DadosCaso dadosCaso={informacaoMantis}/>}
          {props.children}
          <Button color="red" onClick={() => dropDatabaseAction(database)}>Apagar</Button>
          <Button onClick={() => openFolderAction(database)}>Abrir Pasta</Button>
        </Group>
      </Paper>
  )

}

export default IssueCard;