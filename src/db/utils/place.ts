import Place from '@/db/models/place.model.';
import { SearchResultType } from '@/hooks/useSearchPlace';

export const findPlace = async (place_id: string) => {
  const findPlace = await Place.findOne({ where: { $place_id$: place_id } });
  if (findPlace) return findPlace.pid;
  return false;
};

export const getPlaceIds = async (place: SearchResultType) => {
  const { id, ...rest } = place;
  const foundPid = await findPlace(id);
  
  if (!foundPid) {
    const createdPlace = await Place.create({ place_id: id, ...rest });
    return JSON.stringify(createdPlace.pid);
  } else {
    return JSON.stringify(foundPid);
  }
};
