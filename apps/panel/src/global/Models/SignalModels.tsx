import TcInput from 'components/UI/Form/Inputs/TcInput';
import TcSelect from 'components/UI/Form/Inputs/TcSelect';
import TcSelectReduxSearch from 'components/UI/Form/Inputs/TcSelectReduxSearch';
import TcSelectSearch from 'components/UI/Form/Inputs/TcSelectSearch';
import TcTextarea from 'components/UI/Form/Inputs/TcTextarea';
import TcFormItem from 'components/UI/Form/TcFormItem';
import TcFormWrapper from 'components/UI/FormWrapper/TcFormWrapper';
import TcDeleteIcon from 'components/UI/TableIcons/TcDeletIcon';
import TcEditIcon from 'components/UI/TableIcons/TcEditIcon';
import endpointUrls from 'global/Constants/endpointUrls';
import routes from 'global/Constants/routes';
import { getAllSignalStatuses } from 'redux/reducer/signalStatuses/getAllSignalStatuses';
import { getAllSignalTypes } from 'redux/reducer/signalTypes/getAllSignalTypes';
import { getAllStrategies } from 'redux/reducer/strategies/getAllStrategies';
import { getAllTimeFrames } from 'redux/reducer/TimeFrames/getAllTimeFrames';
import { getAllTradingTypes } from 'redux/reducer/TradingTypes/getAllTradingTypes';
import { basicActors } from './globalModels';

export interface signal extends basicActors {
  id: number;
  expectedPips: number;
  investmentValuePercent: number;
  isPublic: boolean;
  signalType: string;
  symbolId: number;
  symbolName: string;
  signalStatusId: number;
  status: string;
  signalTypeId: number;
  isViewed: boolean;
  achievedPips: number;
  result: string;
}

export interface signalResult extends basicActors {
  id: number;
  isActive: boolean;
  creatorId: number;
  modifierId: number;
  creationDate: string;
  modificationDate: string;
  creationTime: string;
  modificationTime: string;
  creator: string;
  modifier: string;
  signalId: number;
  signalResultTypeId: number;
  signalResultType: string;
  description: string;
  finalPips: number;
}
export interface signalEffectivePoint extends basicActors {
  id: number;
  signalId: number;
  effectivePointTypeId: number;
  effectivePointType: string;
  point: number;
}
export interface createSignalEffectivePoint extends basicActors {
  id?: number;
  signalId?: number;
  typeId: number;
  title: string;
  point: string;
}

export interface signalImage extends basicActors {
  id: number;
  signalId: number;
  url: string;
  description: string;
}
export interface signalFullDetail extends basicActors {
  id: number;
  symbolId: number;
  symbolName: string;
  timeFrameId: number;
  timeFrameTitle: string;
  description: string;
  expectedPips: number;
  tradingTypeId: number;
  tradingType: string;
  entryPoint: number;
  investmentValuePercent: number;
  signalStatusId: number;
  status: string;
  signalTypeId: number;
  signalType: string;
  isViewed: boolean;
  achievedPips: number;
  isPublic: boolean;
  lotSize: number;
  signalEffectivePoints: signalEffectivePoint[];
  signalImages: signalImage[];
  signalResults: signalResult;
}

export const signalColumns = (handleDelete: (_id: number) => void, setSignalResultId: (_siganl: signal) => void) => [
  {
    title: 'نوع',
    key: 'signalType',
    dataIndex: 'signalType',
  },
  {
    title: 'نماد',
    key: 'symbolName',
    dataIndex: 'symbolName',
  },
  {
    title: 'وضعیت',
    key: 'status',
    dataIndex: 'status',
  },
  {
    title: 'درصد سرمایه گزاری',
    key: 'investmentValuePercent',
    dataIndex: 'investmentValuePercent',
  },
  {
    title: 'پیپ کسب شده',
    key: 'achievedPips',
    dataIndex: 'achievedPips',
  },
  {
    title: 'دیده شده',
    key: 'isViewed',
    dataIndex: 'isViewed',
    render: (_text: any, _record: any) => (_record.isViewed ? 'بله' : 'خیر'),
  },
  {
    title: 'عمومی',
    key: 'isPublic',
    dataIndex: 'isPublic',
    render: (_text: any, _record: any) => (_record.isPublic ? 'بله' : 'خیر'),
  },
  {
    title: 'فعال',
    key: 'isActive',
    dataIndex: 'isActive',
    render: (_text: any, _record: any) => (_record.isActive ? 'بله' : 'خیر'),
  },
  {
    title: 'عملیات',
    key: 'operation',
    render: (_text: any, record: any) => (
      <>
        <TcEditIcon to={routes.signalUpdate.path + '/' + record.id} />
        <TcDeleteIcon onConfirm={() => handleDelete(record.id)} />
      </>
    ),
  },
  {
    title: ' ',
    key: 'functions',
    render: (_text: any, record: any) => (
      <div className='flex items-center gap-x-2'>
        <span className='text-xs cursor-pointer text-t-secondary-color hover:underline' onClick={() => setSignalResultId(record)}>
          تعیین نتیجه
        </span>
      </div>
    ),
  },
];

export const signalInputs = (
  <TcFormWrapper>
    <TcFormItem label='نماد' name='symbolId' rules={[{ required: true, message: 'فیلد اجباری' }]}>
      <TcSelectSearch searchEndpoint={endpointUrls.symbolsGetList} />
    </TcFormItem>
    <TcFormItem name='entryPoint' label='نقطه ورود' rules={[{ required: true, message: 'فیلد اجباری' }]}>
      <TcInput placeholder='نقطه ورود' />
    </TcFormItem>
    <TcFormItem name='investmentValuePercent' label='درصد سرمایه گزاری'>
      <TcInput placeholder='درصد سرمایه گزاری' />
    </TcFormItem>
    <TcFormItem name='expectedPips' label='پیپ مورد انتظار'>
      <TcInput placeholder='پیپ مورد انتظار' />
    </TcFormItem>
    <TcFormItem name='achievedPips' label='پیپ کسب شده'>
      <TcInput placeholder='پیپ کسب شده' />
    </TcFormItem>
    <TcFormItem label='تایم فریم' name='timeFrameId' rules={[{ required: true, message: 'فیلد اجباری' }]}>
      <TcSelectReduxSearch reducerName='timeFrames' reducerListProperty='list' getlist={getAllTimeFrames} />
    </TcFormItem>
    <TcFormItem label='نوع معامله' name='tradingTypeId' rules={[{ required: true, message: 'فیلد اجباری' }]}>
      <TcSelectReduxSearch reducerName='tradingTypes' reducerListProperty='list' getlist={getAllTradingTypes} />
    </TcFormItem>
    <TcFormItem name='lotSize' label='حجم لات'>
      <TcInput placeholder='حجم لات' />
    </TcFormItem>
    <TcFormItem label='استراتژی' name='strategyId'>
      <TcSelectReduxSearch reducerName='strategies' reducerListProperty='list' getlist={getAllStrategies} />
    </TcFormItem>
    <TcFormItem label='وضعیت سیگنال' name='signalStatusId'>
      <TcSelectReduxSearch reducerName='signalStatuses' reducerListProperty='list' getlist={getAllSignalStatuses} />
    </TcFormItem>
    <TcFormItem label='نوع سیگنال' name='signalTypeId'>
      <TcSelectReduxSearch reducerName='signalTypes' reducerListProperty='list' getlist={getAllSignalTypes} />
    </TcFormItem>
    <TcFormItem name='isPublic' label='انتشار عمومی' initialValue={true}>
      <TcSelect
        options={[
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          { label: 'بله', value: true },
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          { label: 'خیر', value: false },
        ]}
      />
    </TcFormItem>
    <TcFormItem name='description' label='شرح' full>
      <TcTextarea />
    </TcFormItem>
  </TcFormWrapper>
);
