import routes from 'global/Constants/routes';
import React from 'react';

const DefaultImageEdit = React.lazy(() => import('../pages/DefaultImage/DefaultImageUpdate'));
const DefaultImageCreate = React.lazy(() => import('../pages/DefaultImage/DefaultImageCreate'));
const DefaultImage = React.lazy(() => import('../pages/DefaultImage/DefaultImage'));

const defaultImageRoutes = () => [
  {
    path: routes.defaultImageEdit.path,
    component: DefaultImageEdit,
    type: 'private',
    accessRole: true,
  },
  {
    path: routes.defaultImageCreate.path,
    component: DefaultImageCreate,
    type: 'private',
    accessRole: true,
  },
  {
    path: routes.defaultImage.path,
    component: DefaultImage,
    type: 'private',
    accessRole: true,
  },
];

export default defaultImageRoutes;
