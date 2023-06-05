import routes from 'global/Constants/routes';
import React from 'react';

const UserExperience = React.lazy(() => import('../pages/UserExperience/UserExperience'));
const UserExperienceDetail = React.lazy(() => import('../pages/UserExperience/UserExperienceDetail'));

const userExperienceRoutes = () => [
  {
    path: routes.userExperienceDetail.path,
    component: UserExperienceDetail,
    type: 'private',
    accessRole: true,
  },
  {
    path: routes.userExperience.path,
    component: UserExperience,
    type: 'private',
    accessRole: true,
  },
];

export default userExperienceRoutes;
