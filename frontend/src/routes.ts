import { dAppName } from './src_egld/config';
import withPageTitle from './components/PageTitle';
import Dashboard from './src_egld/pages/Dashboard';
import Home from './pages/Home';
import Transaction from './src_egld/pages/Transaction';

export const routeNames = {
  home: '/',
  dashboard: '/dashboard',
  transaction: '/transaction',
  unlock: '/unlock',
  ledger: '/ledger',
  walletconnect: '/walletconnect'
};

const routes: Array<any> = [
  {
    path: routeNames.home,
    title: 'Home',
    component: Home
  },
  {
    path: routeNames.dashboard,
    title: 'Dashboard',
    component: Dashboard,
    authenticatedRoute: true
  },
  {
    path: routeNames.transaction,
    title: 'Transaction',
    component: Transaction
  }
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
