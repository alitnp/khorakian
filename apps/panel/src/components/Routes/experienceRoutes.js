import routes from 'global/Constants/routes';
import React from 'react';

const ExperienceEdit = React.lazy(() => import('../pages/Experience/ExperienceUpdate'));
const ExperienceCreate = React.lazy(() => import('../pages/Experience/ExperienceCreate'));
const Experience = React.lazy(() => import('../pages/Experience/Experience'));

const experienceRoutes = () => [
  {
    path: routes.experienceEdit.path,
    component: ExperienceEdit,
    type: 'private',
    accessRole: true,
  },
  {
    path: routes.experienceCreate.path,
    component: ExperienceCreate,
    type: 'private',
    accessRole: true,
  },
  {
    path: routes.experience.path,
    component: Experience,
    type: 'private',
    accessRole: true,
  },
];

export default experienceRoutes;
