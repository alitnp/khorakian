import React, { FC } from 'react';

const TabsLabel: FC = () => (
  <div className="flex items-center p-3">
    <img
      className="rounded-full w-12 h-12 mx-2"
      src="https://avatars.githubusercontent.com/u/993399?v=4"
    />
    <div className="grid">
      <span className="font-bold text-base my-1">امیر خوراکیان</span>
      <span className="!text-xs text-neutral-700">شنبه 16 اردیبهشت 1402</span>
    </div>
  </div>
);

export default TabsLabel;
