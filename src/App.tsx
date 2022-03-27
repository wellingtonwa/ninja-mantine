import React, {ReactNode} from 'react';
import './App.css';
import {
  ActionIcon,
  AppShell,
  Group,
  Header,
  MantineProvider,
  Navbar,
  Text
} from '@mantine/core'
import { DatabaseImport, Home, Sword } from 'tabler-icons-react';
import MenuItem from "./component/MenuItem";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import rotas from "./routes";
import menu from "./menu";


function App() {

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
        >
          <Routes>
            {getRoutes()}
          </Routes>
        </AppShell>
      </MantineProvider>
    </BrowserRouter>
  );
}

export default App;
