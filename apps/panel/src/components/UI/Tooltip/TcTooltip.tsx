import { Tooltip } from 'antd';
import { TooltipPropsWithTitle } from 'antd/es/tooltip';
import { CSSProperties, FC } from 'react';

interface ITcTooltip extends TooltipPropsWithTitle {
  overlayStyle?: CSSProperties;
}

const TcTooltip: FC<ITcTooltip> = ({ children, overlayStyle = {}, ...props }) => {
  return (
    <Tooltip {...props} overlayStyle={{ position: 'fixed', ...overlayStyle }}>
      {children}
    </Tooltip>
  );
};

export default TcTooltip;
