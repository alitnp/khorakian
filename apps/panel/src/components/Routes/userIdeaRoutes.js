import routes from 'global/Constants/routes';
import React from 'react';

const UserIdea = React.lazy(() => import('../pages/UserIdea/UserIdea'));
const UserIdeaDetail = React.lazy(() => import('../pages/UserIdea/UserIdeaDetail'));

const userIdeaRoutes = () => [
  {
    path: routes.userIdeaDetail.path,
    component: UserIdeaDetail,
    type: 'private',
    accessRole: true,
  },
  {
    path: routes.userIdea.path,
    component: UserIdea,
    type: 'private',
    accessRole: true,
  },
];

export default userIdeaRoutes;
