import React, {useEffect, useState} from 'react';
import './App.css';
import {
  ActionIcon,
  AppShell, Button,
  Group,
  Header,
  MantineProvider,
  Navbar, Paper, Space,
  Text, Textarea
} from '@mantine/core';
import { Sword } from 'tabler-icons-react';
import MenuItem from "./component/MenuItem";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import rotas from "./routes";
import menu from "./menu";
import {io} from "socket.io-client";


function appShellTheme() {
  return (theme: any) => ({
    main: {backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[1]},
  });
}

function App() {

  const [socket, setSocket] = useState(undefined as any);
  const [texto, setTexto] = useState("");

  useEffect(() => {
    setSocket(io("http://localhost:5000"));
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("db restore", (msg: any) => {
        log(msg);
      });
    }
  }, [socket])

  const log = (txt: string) => {
    setTexto(prevState => txt + "\n" + prevState);
  }

  const limparMensagens = () => {
    setTexto("");
  }

  const doSomething = (component: any) => {
    //posting arg1 as an example of whatever you are wanting to do.
    return component();
  };

  const getRoutes = () => {
    return rotas.map((prop, key) => {
      return (<Route path={prop.path} element={doSomething(prop.component)} key={key}/>)
    });
  }

  const getMenus = () => {
    return menu.map((prop, key) => {
      return (
        <MenuItem label={prop.label} link={prop.path}>
          <ActionIcon component={prop.icon}/>
          <Text size="lg">{prop.label}</Text>
        </MenuItem>
      )
    });
  }

  return (
    <BrowserRouter>
      <MantineProvider
        theme={{
          fontFamily: 'Open Sans, sans serif',
          spacing: { xs: 15, sm: 20, md: 25, lg: 30, xl: 40 }
        }}>
        <AppShell
            padding="md"
            header={<Header height={60} p="xs">
              <Group>
                <ActionIcon variant="transparent"><Sword size={32}/></ActionIcon>
                <Text size="xl">Ninja</Text>
              </Group>
            </Header>}
            navbar={<Navbar width={{ base: 300 }} p="xs">
              {getMenus()}
            </Navbar>}
            styles={appShellTheme()}
        >
          <Routes>
            {getRoutes()}
          </Routes>
          <Space h="lg"/>
          <Paper p={10}>
            <Group direction={"column"} grow>
            <Textarea value={texto} label="Mensagens:" size="md" minRows={6} maxRows={6}/>
              <Button onClick={limparMensagens}>Limpar mensagens</Button>
            </Group>
          </Paper>
        </AppShell>
      </MantineProvider>
    </BrowserRouter>
  );
}

export default App;
