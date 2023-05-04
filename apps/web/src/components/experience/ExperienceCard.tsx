import webConfig from '@/global/constants/webConfig';
import { Image } from 'antd';
import { FC } from 'react';

interface IExperienceCard {}

const ExperienceCard: FC<IExperienceCard> = ({}) => {
  return (
    <div
      className="p-3"
      style={{
        boxShadow: '0 0 5px 0',
        backdropFilter: 'blur(10px)',
        backgroundColor: 'white',
        borderRadius: '12px',
        height: '7rem',
      }}
    >
      <h1 className="font-bold text-base">مشاوره در زمینه ی فرهنگی</h1>
      <span className="text-sm">
        مشاوره راهنمایی و استفاده از تجربیات دیگران وپیشگوستان درباره ی نحوه ی
        مواجه با مشکلات و مسائل
      </span>
    </div>
  );
};

export default ExperienceCard;
