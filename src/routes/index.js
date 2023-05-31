import { useRoutes } from 'react-router-dom';
import AuctionsPage from '../pages/AuctionsPage';
import Dashboard from '../pages/Dashboard';
import BidPlacements from '../pages/BidPlacements';
import MembersList from '../pages/membersList';

export default function Router() {
  return useRoutes([
    {
      path: '*',
      element: <Dashboard />
      // children: [{ path: 'members', element: <MembersList replace /> }]
    },
    { path: '/members', element: <MembersList /> },
    {
      path: '/auctions',
      element: <AuctionsPage />
    },
    {
      path: '/bidplacements',
      element: <BidPlacements />
    }
  ]);
}
// import { useRoutes, Navigate } from 'react-router-dom';
// import AuctionsPage from '../pages/AuctionsPage';
// import Dashboard from '../pages/Dashboard';
// import BidPlacements from '../pages/BidPlacements';
// import MembersList from '../pages/membersList';
// import { PATH_DASHBOARD } from './paths';
// export default function Router() {
//   return useRoutes([
//     { element: <Navigate to={PATH_DASHBOARD} replace />, index: true },
//     { path: '/dashboard', element: <Dashboard /> },
//     { path: 'dash/:uuid', element: <MembersList /> },
//     {
//       path: '/auctions',
//       element: <AuctionsPage />
//     },
//     {
//       path: '/bidplacements',
//       element: <BidPlacements />
//     }
//   ]);
// }
