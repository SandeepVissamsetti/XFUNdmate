import { useRoutes } from 'react-router-dom';
import AuctionsPage from '../pages/AuctionsPage';
import Dashboard from '../pages/Dashboard';

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Dashboard />
    },
    {
      path: '/auctions',
      element: <AuctionsPage />
    }
  ]);
}
