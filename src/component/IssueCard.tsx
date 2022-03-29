import React, {ReactNode} from "react";
import { Paper, Button, Title, Group } from "@mantine/core";
import Database from "../model/Database";
import InformacaoMantis from "../model/InformacaoMantis";
import DadosCaso from "./DadosCaso";

interface IssueCardProps {
  database: Database;
  informacaoMantis?: InformacaoMantis;
  openFolderAction: (database: Database) => void;
  children?: ReactNode;
}

const IssueCard = ( props: IssueCardProps ) => {

  const { database, informacaoMantis, openFolderAction } = props;

  return (
      <Paper shadow="xl" p="md">
        <Title order={3}>{database.dbname}</Title>

        <Group direction="row" position="apart" sx={(theme: any) =>({
          marginTop: 10,
        })}>
        {informacaoMantis && <DadosCaso dadosCaso={informacaoMantis}/>}
        {props.children}
          <Button color="red">Apagar</Button>
          <Button onClick={() => openFolderAction(database)}>Abrir Pasta</Button>
        </Group>
      </Paper>
  )

}

export default IssueCard;