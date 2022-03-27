import Dashboard from "./pages/Dashboard";
import RestoreDatabase from "./pages/RestoreDatabase";

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
];

export default routes;
