import routes from 'global/Constants/routes';
import React from 'react';

const UserIdea = React.lazy(() => import('../pages/UserIdea/UserIdea'));

const userIdeaRoutes = () => [
  {
    path: routes.userIdea.path,
    component: UserIdea,
    type: 'private',
    accessRole: true,
  },
];

export default userIdeaRoutes;
