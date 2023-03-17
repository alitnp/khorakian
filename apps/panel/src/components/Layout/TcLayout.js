import TcContent from 'components/Layout/Content/Content';
import TcFooter from 'components/Layout/Footer/TcFooter';
import TcHeader from 'components/Layout/Header/Header';
import TcHorizentalSidebar from 'components/Layout/Sidebar/TcHorizentalSidebar';
import TcVerticalSidebar from 'components/Layout/Sidebar/TcVerticalSidebar';

const TcLayout = ({ children }) => {
  return (
    <div className='flex min-h-screen bg-t-body-bg'>
      <TcVerticalSidebar />
      <div className='flex flex-col justify-between flex-grow-0 flex-shrink w-full mx-auto' style={{ maxWidth: '1400px' }}>
        <TcHeader />
        <TcHorizentalSidebar />
        <TcContent>{children}</TcContent>
        <TcFooter />
      </div>
    </div>
  );
};

export default TcLayout;
