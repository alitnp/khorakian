import routes from 'global/Constants/routes';
import React from 'react';

const Video = React.lazy(() => import('../pages/Video/Video'));
const VideoCreate = React.lazy(() => import('../pages/Video/VideoCreate'));
const VideoUpdate = React.lazy(() => import('../pages/Video/VideoUpdate'));

const videoRoutes = () => [
  {
    path: routes.videoEdit.path,
    component: VideoUpdate,
    type: 'private',
    accessRole: true,
  },
  {
    path: routes.videoCreate.path,
    component: VideoCreate,
    type: 'private',
    accessRole: true,
  },
  {
    path: routes.video.path,
    component: Video,
    type: 'private',
    accessRole: true,
  },
];

export default videoRoutes;
