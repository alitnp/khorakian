const SettingItem = ({ label, controller }) => {
  return (
    <div className='flex items-center justify-between mb-2 gap-x-4'>
      <label htmlFor='theme' className='whitespace-nowrap'>
        {label}
      </label>
      <div className='w-full h-0 border-t border-t-border-color-base border-dashed' />
      {controller}
    </div>
  );
};

export default SettingItem;
