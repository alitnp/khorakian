import React, { FC } from 'react';

const EachComment: FC = () => (
  <div className="grid m-3">
    <div className="flex items-center">
      <img
        className="rounded-full w-10 h-10 ml-2"
        src="https://th.bing.com/th/id/OIP.qCX28C2yauUFbPwdysXYgAAAAA?pid=ImgDet&w=474&h=474&rs=1"
      />
      <span className="font-bold text-base ">امیر خوراکیان</span>
      <span className="text-xs text-t-secondary-color mr-2">
        شنبه 16 اردیبهشت 1402
      </span>
    </div>
    <span className="text-sm my-2 ">
      لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از
      طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان
      که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با
      هدف بهبود ابزارهای کاربردی می باشد
    </span>
  </div>
);

export default EachComment;
