import { FC, memo, ReactElement } from 'react';

interface ITcMessageBubble {
  isActive: boolean;
  children: ReactElement;
}

const MessageBubble: FC<ITcMessageBubble> = ({ isActive = true, children }) => {
  return (
    <div
      className={`relative z-20 px-5 py-1 max-w-xl shadow-md rounded-2xl ${
        !isActive ? 'bg-gray-300/70 dark:bg-gray-600 mr-auto rounded-tl-none' : 'bg-green-700/20 rounded-tr-none'
      }`}>
      {children}
    </div>
  );
};

export default memo(MessageBubble);
