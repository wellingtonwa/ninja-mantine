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

  return (
      <Paper shadow="xl" p="md">
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