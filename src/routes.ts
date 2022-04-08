import Dashboard from "./pages/Dashboard";
import RestoreDatabase from "./pages/RestoreDatabase";
import LimparDownloads from "./pages/LimparDownloads";

export interface RouteProps {
  path: string;
  name: string;
  icon: string;
  component: React.ReactNode;
}

const routes: RouteProps[] = [
  {
    path: '/',
    name: 'Dashboard',
    icon: 'ni ni-tv-2 text-primary',
    component: Dashboard
  },
  {
    path: '/restore',
    name: 'Restaurar Banco',
    icon: 'ni ni-tv-2 text-primary',
    component: RestoreDatabase
  },
  {
    path: '/limpar-pasta',
    name: 'Limpar pasta download',
    icon: 'ni ni-tv-2 text-primary',
    component: LimparDownloads
  },
];

export default routes;
