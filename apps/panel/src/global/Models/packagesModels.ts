import { basicActors } from './globalModels';

export interface packages extends basicActors {
  id: number;
  isActive: boolean;
  creatorId: number;
  modifierId: number;
  creationDate: string;
  modificationDate: string;
  creator: string;
  modifier: string;
  creationTime: string;
  modificationTime: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  discount: number;
  finalPrice: number;
  totalPips: number;
}
