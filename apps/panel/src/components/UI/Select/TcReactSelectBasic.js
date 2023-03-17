import { AsyncSelectCustomStyle } from 'global/Constants/globalConstants';
import Select from 'react-select';

const TcReactSelectBasic = ({ data, name, placeholder, onChange, defaultValue, type, ...props }) => {
  return (
    <Select
      {...props}
      classNamePrefix='react-select'
      styles={AsyncSelectCustomStyle}
      placeholder={placeholder}
      defaultValue={defaultValue}
      name={name}
      options={data?.map((item) => ({ label: item[type], value: item.id }))}
      onChange={(e) => onChange(e, name)}
    />
  );
};
export default TcReactSelectBasic;
