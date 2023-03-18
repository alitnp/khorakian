import ideaCategoryModel from 'global/Models/genericRoutesModels/ideaCategoryModel';
import postCategoryModel from 'global/Models/genericRoutesModels/postCategoryModel';
import { routeModel } from 'global/Models/globalModels';

const genericModels: routeModel[] = [postCategoryModel, ideaCategoryModel];

export default genericModels;
