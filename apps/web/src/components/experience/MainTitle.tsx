import { FC } from 'react';

interface IMainTitle {
  //   data: IPageItemConents;
}

const MainTitle: FC<IMainTitle> = ({}) => {
  return (
    <>
      <div
        style={{ height: '25rem' }}
        className="relative grid mt-12 grid-cols-1 gap-4 md:grid-cols-9 xl:grid-cols-12 items-center justify-center w-full h-full "
      >
        <div className="relative h-full md:col-span-full xl:col-span-3">
          <div
            className="border border-red-800 absolute top-0 right-0 "
            style={{
              height: '10rem',
              width: '100%',
              borderRadius: '0 0  0 25px',
            }}
          ></div>
        </div>
        <div className="relative grid content-center justify-end items-center md:col-span-full h-full m-auto xl:col-span-6">
          <div className="text-center mx-auto mt-5" style={{ width: '60%' }}>
            <span className="text-3xl font-bold">
              ارائه ی مشاوره در زمینه ی فرهنگی و هنری و تحصیلی
            </span>
          </div>
          <div className="text-center mx-auto my-4" style={{ width: '95%' }}>
            <span className="text-base ">
              مشاوره راهنمایی و استفاده از تجربیات دیگران وپیشگوستان درباره ی
              نحوه ی مواجه با مشکلات و مسائل نوپدید.
            </span>
            <br />
            <br />
            <a
              href="#"
              className="mt-5 py-1 px-4 border border-red-800 rounded-2xl text-red-800"
            >
              ثبت موضوع جدید
            </a>
          </div>
        </div>
        <div className="relative md:col-span-full h-full xl:col-span-3">
          <div
            className="border border-red-800 absolute bottom-0 left-0 "
            style={{
              height: '12rem',
              width: '100%',
              borderRadius: '0 25px 0 0 ',
            }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default MainTitle;
