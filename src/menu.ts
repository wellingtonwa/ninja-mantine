import { Home, DatabaseImport, ClearAll } from 'tabler-icons-react'

const menu = [
  {
    label: "Dashboard",
    path: '/',
    icon: Home
  },
  {
    label: "Restaurar Base",
    path: "/restore",
    icon: DatabaseImport
  },
  {
    label: 'Limpar pasta download',
    path: '/limpar-pasta',
    icon: ClearAll
  },
]

export default menu;