import ExperienceCard from '@/components/experience/ExperienceCard';
import webConfig from '@/global/constants/webConfig';
import { Image } from 'antd';
import { FC } from 'react';

interface IExperience {}

const ExperienceTips: FC<IExperience> = ({}) => {
  return (
    <>
      <div className="h-[768px]" style={{ backgroundColor: 'black' }}>
        <div className="text-center py-16 mx-auto " style={{ width: '28%' }}>
          <span className="text-3xl  text-neutral-100 font-bold">
            ارائه ی مشاوره در زمینه ی فرهنگی و هنری و تحصیلی
          </span>
        </div>

        <div
          className=" grid grid-cols-1 gap-10 md:grid-cols-9 xl:grid-cols-12 items-center justify-center h-full "
          style={{ width: '80%', margin: 'auto' }}
        >
          <div className=" h-full md:col-span-full xl:col-span-3">
            <ExperienceCard />
          </div>
          <div className=" h-full md:col-span-full xl:col-span-3">
            <ExperienceCard />
          </div>{' '}
          <div className=" h-full md:col-span-full xl:col-span-3">
            <ExperienceCard />
          </div>{' '}
          <div className=" h-full md:col-span-full xl:col-span-3">
            <ExperienceCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default ExperienceTips;
