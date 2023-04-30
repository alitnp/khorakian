import routes from 'global/Constants/routes';
import React from 'react';

const SocialMedia = React.lazy(() => import('../pages/SocialMedia/SocialMedia'));
const SocialMediaCreate = React.lazy(() => import('../pages/SocialMedia/SocialMediaCreate'));
const SocialMediaUpdate = React.lazy(() => import('../pages/SocialMedia/SocialMediaUpdate'));

const socialmediaRoutes = () => [
  {
    path: routes.socialMediaEdit.path,
    component: SocialMediaUpdate,
    type: 'private',
    accessRole: true,
  },
  {
    path: routes.socialMediaCreate.path,
    component: SocialMediaCreate,
    type: 'private',
    accessRole: true,
  },
  {
    path: routes.socialMedia.path,
    component: SocialMedia,
    type: 'private',
    accessRole: true,
  },
];

export default socialmediaRoutes;
