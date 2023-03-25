import routes from 'global/Constants/routes';
import React from 'react';

const Image = React.lazy(() => import('../pages/Image/Image'));
const ImageCreate = React.lazy(() => import('../pages/Image/ImageCreate'));
const ImageUpdate = React.lazy(() => import('../pages/Image/ImageUpdate'));

const imageRoutes = () => [
  {
    path: routes.imageUpdate.path,
    component: ImageUpdate,
    type: 'private',
    accessRole: true,
  },
  {
    path: routes.imageCreate.path,
    component: ImageCreate,
    type: 'private',
    accessRole: true,
  },
  {
    path: routes.image.path,
    component: Image,
    type: 'private',
    accessRole: true,
  },
];

export default imageRoutes;
