import routes from 'global/Constants/routes';
import React from 'react';

const Payment = React.lazy(() => import('../pages/Payment/Payment'));

const paymentRoutes = () => [
  {
    path: routes.payment.path,
    component: Payment,
    type: 'private',
    accessRole: true,
  },
];

export default paymentRoutes;
