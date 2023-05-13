import routes from 'global/Constants/routes';
import React from 'react';

const DirectMessage = React.lazy(() => import('components/pages/DirectMessage/DirectMessage'));
const DirectMessageDetail = React.lazy(() => import('components/pages/DirectMessage/DirectMessageDetail'));
const DirectMessageCreate = React.lazy(() => import('components/pages/DirectMessage/DirectMessageCreate'));

const directMessageRoutes = () => [
  {
    path: routes.directMessageCreate.path,
    component: DirectMessageCreate,
    type: 'private',
    accessRole: true,
  },
  {
    path: routes.directMessageDetail.path,
    component: DirectMessageDetail,
    type: 'private',
    accessRole: true,
  },
  {
    path: routes.directMessage.path,
    component: DirectMessage,
    type: 'private',
    accessRole: true,
  },
];

export default directMessageRoutes;
