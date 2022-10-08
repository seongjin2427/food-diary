import models from '@/db/index';
import Place from '@/db/models/place.model.';

export const findPlace = async (id: string): Promise<Place | null> => {
  const findPlace = await models.Place.findOne({ where: { id } });
  if (findPlace) return findPlace;
  return null;
};
