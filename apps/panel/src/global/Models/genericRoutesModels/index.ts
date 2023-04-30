import ideaCategoryModel from 'global/Models/genericRoutesModels/ideaCategoryModel';
import postCategoryModel from 'global/Models/genericRoutesModels/postCategoryModel';
import experienceCategory from 'global/Models/genericRoutesModels/experienceCategoryModel';

import { routeModel } from 'global/Models/globalModels';

const genericModels: routeModel[] = [postCategoryModel, ideaCategoryModel, experienceCategory];

export default genericModels;
