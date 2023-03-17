import { FC, useEffect, useState, ReactNode } from 'react';
import style from './style.module.css';

interface Tabs {
  key: string;
  title: string;
  icon: ReactNode;
  content: ReactNode;
}

interface ITcTab {
  tabs: Tabs[];
  activeTab: string;
  onChange: (key: any) => void;
}

const TcTab: FC<ITcTab> = ({ tabs, activeTab, onChange }) => {
  //state
  const [selectedTab, setSelectedTab] = useState<string>(activeTab || tabs[0]?.key);

  //effects
  useEffect(() => {
    activeTab !== undefined && setSelectedTab(activeTab);
  }, [activeTab]);

  //functions
  const handleTabChange = (key: string) => {
    if (onChange) onChange(key);
    else setSelectedTab(key);
  };

  return (
    <div className='grid '>
      <div className='flex flex-col w-full p-0 mb-6 overflow-x-auto overflow-y-hidden border shadow-inner bg-t-layer-bg-color sm:flex-row print:hidden'>
        {tabs.map((item, index) => (
          <div
            key={item.key}
            onClick={() => handleTabChange(item.key)}
            className={`border-l text-center w-full sm:max-w-[200px] flex justify-center hover:shadow-none  ${index === 0 && 'border-r-none'} ${
              selectedTab === item.key && 'shadow-none   bg-gradient-to-b from-[var(--primary-color-hovered)]   to-t-primary-color  font-bold ' + style['selected']
            } ${
              selectedTab !== item.key && 'shadow-md hover:from-t-layer-bg-color hover:to-t-layer-bg-color-hovered bg-gradient-to-b  from-t-bg-color via-t-bg-color to-t-body-bg'
            }  m-0  py-2 px-6  cursor-pointer `}>
            <span className={`flex items-center whitespace-nowrap text-sm gap-x-2 ${selectedTab === item.key && style['selected-text']}`}>
              {item.icon && item.icon}
              {item.title && item.title}
            </span>
          </div>
        ))}
      </div>
      {tabs.find((item) => item.key === selectedTab)?.content}
    </div>
  );
};

export default TcTab;
