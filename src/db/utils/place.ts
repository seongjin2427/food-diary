import models from '@/db/index';
import Place from '@/db/models/place.model.';

export const findPlace = async (place_id: string): Promise<Place | null> => {
  const findPlace = await models.Place.findOne({ where: { $place_id$: place_id } });
  if (findPlace) return findPlace;
  return null;
};
