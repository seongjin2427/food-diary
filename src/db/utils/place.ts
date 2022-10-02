import models from '@/db/index';
import { SearchResultType } from '@/hooks/useSearchPlace';

export const findPlace = async (place_id: string) => {
  const findPlace = await models.Place.findOne({ where: { $place_id$: place_id } });
  console.log('place');
  console.log('createdPlace', findPlace);
  if (findPlace) return findPlace.pid;
  return false;
};

export const getPlaceIds = async (place: SearchResultType) => {
  const { id, ...rest } = place;
  const foundPid = await findPlace(id);

  if (!foundPid) {
    const createdPlace = await models.Place.create({ place_id: id, ...rest });
    return JSON.stringify(createdPlace.pid);
  } else {
    return JSON.stringify(foundPid);
  }
};
