import routes from 'global/Constants/routes';
import React from 'react';

const UserExperience = React.lazy(() => import('../pages/UserExperience/UserExperience'));

const userExperienceRoutes = () => [
  {
    path: routes.userExperience.path,
    component: UserExperience,
    type: 'private',
    accessRole: true,
  },
];

export default userExperienceRoutes;
