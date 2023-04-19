import routes from 'global/Constants/routes';
import React from 'react';

// const UserExperienceEdit = React.lazy(() => import('../pages/UserExperience/UserExperienceUpdate'));
// const UserExperienceCreate = React.lazy(() => import('../pages/UserExperience/UserExperienceCreate'));
const UserExperience = React.lazy(() => import('../pages/UserExperience/UserExperience'));

const userExperienceRoutes = () => [
  // {
  //   path: routes.userExperienceEdit.path,
  //   component: UserExperienceEdit,
  //   type: 'private',
  //   accessRole: true,
  // },
  // {
  //   path: routes.userExperienceCreate.path,
  //   component: UserExperienceCreate,
  //   type: 'private',
  //   accessRole: true,
  // },
  {
    path: routes.userExperience.path,
    component: UserExperience,
    type: 'private',
    accessRole: true,
  },
];

export default userExperienceRoutes;
