import routes from 'global/Constants/routes';
import React from 'react';

const AboutMe = React.lazy(() => import('../pages/AboutMe/AboutMe'));
const AboutMeCreate = React.lazy(() => import('../pages/AboutMe/AboutMeCreate'));
const AboutMeUpdate = React.lazy(() => import('../pages/AboutMe/AboutMeUpdate'));

const aboutMeRoutes = () => [
  {
    path: routes.aboutMeEdit.path,
    component: AboutMeUpdate,
    type: 'private',
    accessRole: true,
  },
  {
    path: routes.aboutMeCreate.path,
    component: AboutMeCreate,
    type: 'private',
    accessRole: true,
  },
  {
    path: routes.aboutMe.path,
    component: AboutMe,
    type: 'private',
    accessRole: true,
  },
];

export default aboutMeRoutes;
