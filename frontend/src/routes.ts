import { dAppName } from './src_egld/config';
import withPageTitle from './components/PageTitle';
import Dashboard from './src_egld/pages/Dashboard';
import DashboardHRC from './src_hrc/pages/Dashboard';
import Home from './pages/Home';
import Transaction from './src_egld/pages/Transaction';

export const routeNames = {
  home: '/',
  dashboard_egld: '/dashboard-egld',
  dashboard_hrc: '/dashboard-hrc',
  transaction_egld: '/transaction',
  unlock_egld: '/unlock',
  ledger_egld: '/ledger',
  walletconnect_egld: '/walletconnect'
};

const routes: Array<any> = [
  {
    path: routeNames.home,
    title: 'Home',
    component: Home
  },
  {
    path: routeNames.dashboard_egld,
    title: 'Dashboard',
    component: Dashboard,
    authenticatedRoute: true
  },
  {
    path: routeNames.transaction_egld,
    title: 'Transaction',
    component: Transaction,
    authenticatedRoute: true
  },
  {
    path: routeNames.dashboard_hrc,
    title: 'Dashboard HRC',
    component: DashboardHRC,
    authenticatedRoute: false
  },
];

const mappedRoutes = routes.map((route) => {
  const title = route.title
    ? `${route.title} • Bridge EGLD HRC`
    : `Elrond ${dAppName}`;

  const requiresAuth = Boolean(route.authenticatedRoute);
  const wrappedComponent = withPageTitle(title, route.component);

  return {
    path: route.path,
    component: wrappedComponent,
    authenticatedRoute: requiresAuth
  };
});

export default mappedRoutes;
