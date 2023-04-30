import { FC } from 'react';
import endpointUrls from 'global/Constants/endpointUrls';
import routes from 'global/Constants/routes';
import TcListPageWrapper from 'components/UI/TcListPageWrapper/TcListPageWrapper';
import sliderModel from 'global/Models/sliderModel';

const Slider: FC = () => {
  return (
    <TcListPageWrapper
      columns={sliderModel.columns}
      createRoute={routes.sliderCreate.path}
      deleteEndpoint={endpointUrls.sliderDelete}
      filterItems={sliderModel.filterInputs}
      getListEndpoint={endpointUrls.sliderGetList}
      title={sliderModel.title}
    />
  );
};

export default Slider;
