import routes from 'global/Constants/routes';
import React from 'react';

const Signals = React.lazy(() => import('../pages/Signals/Signals'));
const CreateSignal = React.lazy(() => import('../pages/Signals/CreateSignal'));
const UpdateSignal = React.lazy(() => import('../pages/Signals/UpdateSignal'));

const signalRoutes = () => [
  {
    path: routes.signalCreate.path,
    component: CreateSignal,
    type: 'private',
    accessRole: true,
  },
  {
    path: routes.signalUpdate.path,
    component: UpdateSignal,
    type: 'private',
    accessRole: true,
  },
  {
    path: routes.signal.path,
    component: Signals,
    type: 'private',
    accessRole: true,
  },
];

export default signalRoutes;
