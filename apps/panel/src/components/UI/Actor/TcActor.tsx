import { FC } from 'react';
import TcDevider from '../Devider/TcDevider';
import TcFormWrapper from '../FormWrapper/TcFormWrapper';
import TcShowInfo from '../ShowInfo/TcShowInfo';

interface ITcActors {
  data: any;
}

const TcActor: FC<ITcActors> = ({ data }) => {
  if (!data?.creator && !data?.creationDate && !data?.modificationDate && !data?.modificationTime && !data?.creationTime && !data?.modifier) return <></>;

  return (
    <>
      <TcDevider>اطلاعات ثبت و ویرایش</TcDevider>
      <TcFormWrapper>
        {data?.creator && <TcShowInfo right='فرد ثبت کننده' left={data?.creator} />}
        {data?.creationDate && <TcShowInfo right='زمان ثبت' left={`${data?.creationDate || ''}${data?.creationTime ? ' - ' + data?.creationTime : ''}`} />}
        {data?.modifier && <TcShowInfo right='فرد ویرایش کننده' left={data?.modifier} />}
        {data?.modificationDate && <TcShowInfo right='زمان آخرین ویرایش' left={`${data?.modificationDate || ''}${data?.modificationTime ? ' - ' + data?.modificationTime : ''}`} />}
      </TcFormWrapper>
    </>
  );
};

export default TcActor;
