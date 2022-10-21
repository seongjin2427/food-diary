import models from '@/db/index';
import Place from '@/db/models/place.model.';
import { SearchResultType } from '@/hooks/useSearchPlace';

export const findPlace = async (id: string): Promise<Place | null> => {
  const findPlace = await models.Place.findOne({ where: { id } });
  if (findPlace) return findPlace;
  return null;
};

export const createPlace = async (place: SearchResultType) => {
  const foundPlace = await findPlace(place.id);
  if (!foundPlace) await Place.create(place);
};
