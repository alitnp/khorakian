import routes from 'global/Constants/routes';
import React from 'react';

const SliderEdit = React.lazy(() => import('../pages/Slider/SliderUpdate'));
const SliderCreate = React.lazy(() => import('../pages/Slider/SliderCreate'));
const Slider = React.lazy(() => import('../pages/Slider/Slider'));

const sliderRoutes = () => [
  {
    path: routes.sliderEdit.path,
    component: SliderEdit,
    type: 'private',
    accessRole: true,
  },
  {
    path: routes.sliderCreate.path,
    component: SliderCreate,
    type: 'private',
    accessRole: true,
  },
  {
    path: routes.slider.path,
    component: Slider,
    type: 'private',
    accessRole: true,
  },
];

export default sliderRoutes;
