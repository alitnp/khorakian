import { dateObjectFormatter } from 'global/helperFunctions/dateFormatter';
import { FC } from 'react';

interface ITcMessageOwner {
  isActive: boolean;
  repeatedSender: boolean;
  firstName: string;
  lastName: string;
  creationTime: number;
}

const TcMessageOwner: FC<ITcMessageOwner> = ({ isActive, repeatedSender, firstName, lastName, creationTime }) => {
  return (
    <div className={`flex justify-between align-baseline ${!isActive && 'flex-row-reverse'}`}>
      <div className={`flex gap-x-2 ${!isActive && 'flex-row-reverse'}`}>
        {/* short name */}
        {!repeatedSender && (
          <div
            className={`flex items-center justify-center w-10 h-10 text-xs font-bold rounded-full shadow-md text-t-opposite-text-color shrink-0  ${
              !isActive ? 'bg-gray-600 ' : 'bg-t-primary-color'
            }`}>
            {`${firstName?.charAt(0) ? firstName?.charAt(0) : ''}${firstName?.charAt(0) && lastName?.charAt(0) ? '.' : ''}${lastName?.charAt(0) ? lastName?.charAt(0) : ''}`}
          </div>
        )}

        <div>
          {/* name */}
          {!repeatedSender && <p className={`mb-1 ${!isActive && 'text-left'}`}>{firstName + ' ' + lastName}</p>}
          {/* time */}
          <p className='mb-0 text-xs text-gray-400 '>{dateObjectFormatter(creationTime, 'HH:mm dddd YYYY/MM/DD')}</p>
        </div>
      </div>
    </div>
  );
};

export default TcMessageOwner;
