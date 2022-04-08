import React, {useEffect, useState} from "react";
import {Button, Grid, Group, Paper, Title} from "@mantine/core";
import {apagarArquivoDownload, findArquivoDownload} from "../service/dashboard.service";
import EstadoPastaDownload from "../model/estadoPastaDownload";
import {Refresh, Trash} from "tabler-icons-react";
import {useDisclosure} from "@mantine/hooks";

const LimparDownloads = () => {

    const [arquivos, setArquivos] = useState({} as EstadoPastaDownload);
    const [loading, loadingHandler] = useDisclosure(true);

    useEffect(() => {
                  callListaArquivoDownload();
              },

              // eslint-disable-next-line react-hooks/exhaustive-deps
              []);

    useEffect(() => {
                  loadingHandler.close();
              },
              // eslint-disable-next-line react-hooks/exhaustive-deps
              [arquivos]);

    const callListaArquivoDownload = () => {
        loadingHandler.open();
        findArquivoDownload().then(response => {
            setArquivos(response.data);
        }).catch(reason => loadingHandler.close())
    }

    const callApagarArquivoDownload = () => {
        apagarArquivoDownload().then(it => callListaArquivoDownload()).catch(reason => loadingHandler.close())
    };

    return <Paper shadow="xl" p={10} style={{minHeight: 350}}>
        <Grid>
            <Grid.Col xs={12}>
                <Group>
                    <Button leftIcon={<Refresh/>}
                            color={"green"}
                            onClick={callListaArquivoDownload}
                            disabled={loading}>
                        Buscar Arquivos
                    </Button>
                    {arquivos.arquivos && arquivos.arquivos.length > 0 && <Button leftIcon={<Trash/>} color={"red"} disabled={loading}
                                                  onClick={callApagarArquivoDownload}>
                        Apagar Arquivos
                    </Button>}
                </Group>
            </Grid.Col>
            {arquivos.arquivos && arquivos.arquivos.length > 0
             ? arquivos.arquivos.map(it => <Grid.Col xs={12} sm={3} md={2}>{it}</Grid.Col>)
             : <Grid.Col xs={12}><Title order={3}>Nenhuma pasta encontrada</Title></Grid.Col>}
        </Grid>
    </Paper>

}

export default LimparDownloads;