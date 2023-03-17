import effectivePointTypesModel from 'global/Models/genericRoutesModels/EffectivePointTypesModel';
import evidencesModel from 'global/Models/genericRoutesModels/EvidencesModel';
import paymentTypesModel from 'global/Models/genericRoutesModels/PaymentTypesModel';
import signalResultTypesModel from 'global/Models/genericRoutesModels/SignalResultTypesModel';
import signalStatusesModel from 'global/Models/genericRoutesModels/SignalStatusesModel';
import signalTypesModel from 'global/Models/genericRoutesModels/SignalTypesModel';
import strategiesModel from 'global/Models/genericRoutesModels/StrategiesModel';
import symbolsModel from 'global/Models/genericRoutesModels/SymbolsModel';
import timeFramesModel from 'global/Models/genericRoutesModels/TimeFramesModel';
import tradingTypesModel from 'global/Models/genericRoutesModels/TradingTypesModel';
import { routeModel } from 'global/Models/globalModels';

const genericModels: routeModel[] = [
  evidencesModel,
  paymentTypesModel,
  effectivePointTypesModel,
  signalStatusesModel,
  signalTypesModel,
  strategiesModel,
  symbolsModel,
  timeFramesModel,
  tradingTypesModel,
  signalResultTypesModel,
];

export default genericModels;
