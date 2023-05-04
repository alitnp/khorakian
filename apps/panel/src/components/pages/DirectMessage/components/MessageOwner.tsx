import { dateObjectFormatter } from 'global/helperFunctions/dateFormatter';
import { FC, memo } from 'react';

interface ITcMessageOwner {
  isActive: boolean;
  repeatedSender: boolean;
  fullName: string;
  creationTime: number;
}

const MessageOwner: FC<ITcMessageOwner> = ({ isActive, repeatedSender, fullName, creationTime }) => {
  return (
    <div className={`flex justify-between align-baseline ${!isActive && 'flex-row-reverse'}`}>
      <div className={`flex gap-x-2 ${!isActive && 'flex-row-reverse'}`}>
        {/* short name */}
        {!repeatedSender && (
          <div
            className={`flex items-center justify-center w-10 h-10 text-xs font-bold rounded-full shadow-md text-t-opposite-text-color shrink-0  ${
              !isActive ? 'bg-gray-600 ' : 'bg-t-primary-color'
            }`}>
            {`${fullName?.charAt(0) ? fullName?.charAt(0) : ''}`}
          </div>
        )}

        <div>
          {/* name */}
          {!repeatedSender && <p className={`mb-1 ${!isActive && 'text-left'}`}>{fullName}</p>}
          {/* time */}
          <p className='mb-0 text-xs text-gray-400 '>{dateObjectFormatter(creationTime, 'HH:mm dddd YYYY/MM/DD')}</p>
        </div>
      </div>
    </div>
  );
};

export default memo(MessageOwner);
