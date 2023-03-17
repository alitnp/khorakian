import { useHistory } from 'react-router-dom';
import { Tabs, TabsProps } from 'antd';
import { FC, ReactNode } from 'react';
const { TabPane } = Tabs;

interface Tab {
  id: number;
  label: string;
  key: string;
  component: ReactNode;
}

interface ITcTabPanel extends TabsProps {
  mainRouter?: string;
  resetSearch?: () => void;
  tabs: Tab[];
}

const TcTabPanel: FC<ITcTabPanel> = ({ className, mainRouter, defaultActiveKey, id, resetSearch, tabs, ...otherProps }) => {
  const history = useHistory();

  return (
    <Tabs
      {...otherProps}
      defaultActiveKey={defaultActiveKey}
      onChange={(key) => {
        history.push({ pathname: id ? `${mainRouter}/${key}/${id}` : `${mainRouter}/${key}` });
        resetSearch && resetSearch();
      }}>
      {tabs.map((item) => (
        <TabPane tab={item.label} key={item.key} className={className}>
          {item.component}
        </TabPane>
      ))}
    </Tabs>
  );
};
export default TcTabPanel;
