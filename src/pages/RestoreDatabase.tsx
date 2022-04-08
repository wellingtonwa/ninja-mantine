import React from "react";
import {Button, Center, Container, Grid, Paper, Space, TextInput, Title} from "@mantine/core";
import {useForm} from "@mantine/form";
import {restaurarLink} from "../service/dashboard.service";

const RestoreDatabase = () => {

  const form = useForm({
    initialValues: {
      'nome-banco': undefined,
      link: undefined
    },
    validate: (values) => ({
      'nome-banco': !!!values['nome-banco'] ? "Informe o nome do banco" : null,
      link: !!!values.link ? "Informe o link" : null,
    })
  });

  const handleSubmit = (values: any) => {
    restaurarLink(values);
  };

  return (
      <Paper shadow="xl" p={10} style={{minHeight: 350}}>
        <Container fluid={true}>
          <Center>
            <Title order={3}>
              Restaurar Base de Dados
            </Title>
          </Center>
          <Space h="lg"/>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput size="md" placeholder="Nome do banco"
                       {...form.getInputProps('nome-banco')}/>
            <Space h="lg"/>
            <TextInput size="md" placeholder="Link para o backup"
                       {...form.getInputProps('link')}/>
            <Space h="lg"/>
            <Button size="lg" type="submit">
              Salvar
            </Button>
          </form>
        </Container>
      </Paper>
  );
}

export default RestoreDatabase;