import ideaCategoryModel from 'global/Models/genericRoutesModels/ideaCategoryModel';
import postCategoryModel from 'global/Models/genericRoutesModels/postCategoryModel';
import experienceCategory from 'global/Models/genericRoutesModels/experienceCategoryModel';

import { routeModel } from 'global/Models/globalModels';
import pageItemTypeModel from 'global/Models/genericRoutesModels/pageItemTypeModel';
import pageItemStyleModel from 'global/Models/genericRoutesModels/pageItemStyleModel';
import pageItemSortingModel from 'global/Models/genericRoutesModels/pageItemSortingModel';

const genericModels: routeModel[] = [postCategoryModel, ideaCategoryModel, experienceCategory, pageItemTypeModel, pageItemStyleModel, pageItemSortingModel];

export default genericModels;
