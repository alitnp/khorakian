import Sidebar from 'components/Layout/Sidebar/Sidebar';
import { useState } from 'react';

const TcVerticalSidebar = () => {
  //states
  const [open, setOpen] = useState(true);

  return (
    <aside className='sticky top-0 z-40 flex-shrink-0 hidden h-screen sm:block'>
      <div
        className={`flex overflow-y-auto flex-col  mt-2 py-2  bg-t-bg-color rounded-md print:hidden border border-t-border-color-base shadow-lg ${
          open ? 'lg:min-w-[200px]' : 'pt-4'
        }`}
        style={{ height: 'calc(100% - 16px)' }}>
        <Sidebar open={open} setOpen={setOpen} />
      </div>
    </aside>
  );
};

export default TcVerticalSidebar;
