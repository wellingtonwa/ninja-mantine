import React, {useState} from "react";
import {
    Button,
    Center,
    Checkbox,
    Container,
    Group,
    MantineTheme,
    Paper,
    Space,
    Tabs,
    Text,
    TextInput,
    Title,
    useMantineTheme
} from "@mantine/core";
import {useForm} from "@mantine/form";
import {restaurarArquivo, restaurarLink} from "../service/dashboard.service";
import {DeviceFloppy, Download, Icon, Photo, Trash, Upload, X} from "tabler-icons-react";
import {Dropzone, DropzoneStatus} from "@mantine/dropzone";

const RestoreDatabase = () => {
    const theme = useMantineTheme();
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

    const formArquivo = useForm({
                                    initialValues: {
                                        'nome-banco': undefined,
                                        arquivo: undefined as any,
                                        'informar_nome': true
                                    },
                                    validate: (values) => ({
                                        'nome-banco': !!!values['nome-banco'] && values['informar_nome'] ? "Informe o nome do banco" : null,
                                        arquivo: !!!values.arquivo ? "O arquivo" : null,
                                    })
                                });
    const [arquivo, setArquivo] = useState(undefined as any);

    function getIconColor(status: DropzoneStatus, theme: MantineTheme) {
        return status.accepted
               ? theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]
               : status.rejected
                 ? theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]
                 : theme.colorScheme === 'dark'
                   ? theme.colors.dark[0]
                   : theme.colors.gray[7];
    }

    function ImageUploadIcon({
                                 status,
                                 ...props
                             }: React.ComponentProps<Icon> & { status: DropzoneStatus }) {
        if (status.accepted) {
            return <Upload {...props} />;
        }

        if (status.rejected) {
            return <X {...props} />;
        }

        return <Photo {...props} />;
    }

    const dropzoneChildren = (status: DropzoneStatus, theme: MantineTheme) => (
        <Group position="center" spacing="xl" style={{minHeight: 220, pointerEvents: 'none'}}>
            <ImageUploadIcon status={status} style={{color: getIconColor(status, theme)}} size={80}/>
            <div>
                <Text size="xl" inline>
                    Drag images here or click to select files
                </Text>
                <Text size="sm" color="dimmed" inline mt={7}>
                    Attach as many files as you like, each file should not exceed 5mb
                </Text>
            </div>
        </Group>
    );

    const SelectedFile = () => (<>
        <Group direction="row">
            <Text>{arquivo.name}</Text>
            <Button leftIcon={<Trash/>} onClick={limparArquivo}>Limpar seleção</Button>
        </Group>
        <Space h="lg"/>
    </>);

    const limparArquivo = () => {
        setArquivo(undefined);
        formArquivo.setFieldValue('arquivo', undefined);
    }

    const handleSubmit = (values: any) => {
        restaurarLink(values);
    };

    const handleSubmitArquivo = (values: any) => {
        console.log(values);
        restaurarArquivo(values);
    }

    function gravarArquivo(files: File[]) {
        formArquivo.setFieldValue('arquivo', files[0]);
        setArquivo(files[0]);
    }

    return (
        <Tabs>
            <Tabs.Tab label="Via Link" icon={<Download size={14}/>}>
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
            </Tabs.Tab>
            <Tabs.Tab label="Via Arquivo" icon={<DeviceFloppy size={14}/>}>
                <Paper shadow="xl" p={10} style={{minHeight: 350}}>
                    <Container fluid={true}>
                        <Center>
                            <Title order={3}>
                                Restaurar Via Arquivo
                            </Title>
                        </Center>
                        <Space h="lg"/>
                        <form onSubmit={formArquivo.onSubmit(handleSubmitArquivo)}>
                            {!arquivo && <Dropzone
                                onDrop={(files) => gravarArquivo(files)}
                                onReject={(files) => console.log('rejected files', files)}
                                maxSize={50 * 1024 ** 2}
                            >
                                {(status) => dropzoneChildren(status, theme)}
                            </Dropzone>}
                            <Space h="lg"/>
                            {arquivo && <SelectedFile/>}
                            <Checkbox size="md" placeholder="nome-banco" label="Informar nome do banco"
                                      checked={formArquivo.values.informar_nome}
                                      {...formArquivo.getInputProps('informar_nome')}/>
                            <Space h="lg"/>
                            {formArquivo.values.informar_nome && <>
                                <TextInput size="md" placeholder="nome-banco"
                                           {...formArquivo.getInputProps('nome-banco')}/>
                                <Space h="lg"/>
                            </>}
                            <Button size="lg" type="submit">
                                Salvar
                            </Button>
                        </form>
                    </Container>
                </Paper>
            </Tabs.Tab>
        </Tabs>
    );
}

export default RestoreDatabase;