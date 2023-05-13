import routes from 'global/Constants/routes';
import React from 'react';

const History = React.lazy(() => import('components/pages/History/History'));
const HistoryUpdate = React.lazy(() => import('components/pages/History/HistoryUpdate'));
const HistoryCreate = React.lazy(() => import('components/pages/History/HistoryCreate'));

const historyRoutes = () => [
  {
    path: routes.historyCreate.path,
    component: HistoryCreate,
    type: 'private',
    accessRole: true,
  },
  {
    path: routes.historyEdit.path,
    component: HistoryUpdate,
    type: 'private',
    accessRole: true,
  },
  {
    path: routes.history.path,
    component: History,
    type: 'private',
    accessRole: true,
  },
];

export default historyRoutes;
