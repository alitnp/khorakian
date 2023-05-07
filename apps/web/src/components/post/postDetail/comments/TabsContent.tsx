import EachComment from '@/components/post/postDetail/comments/EachComment';
import { IPostCommentRead } from '@my/types';
import React, { FC } from 'react';

interface IProps {
  comments: IPostCommentRead;
}

const TabsContent: FC<IProps> = ({ comments }) => (
  <div className="p-5">
    <span className="text-sm ">
      لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از
      طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان
      که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با
      هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته
      حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها
      شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ
      پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و
      دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد
      نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای
      موجود طراحی اساسا مورد استفاده قرار گیرد.
    </span>
    <hr className="my-5" />

    <div className="my-4">
      <EachComment comments={comments} />
      {/* //reply */}
      <div className="mr-10 my-5">
        <EachComment comments={comments} />
      </div>
      <hr />
    </div>
  </div>
);

export default TabsContent;
