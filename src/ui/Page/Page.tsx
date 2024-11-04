import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import API_KEY from '../../API_KEY';

import BreedFilterSelector from '../BreedFilterSelector/BreedFilterSelector';
import FavouriteFilter from '../FavouriteFIlter/Favourite';
import Gallery from '../Gallery/Gallery';
import Pagination from '../Pagination/Pagination';

export interface ImgObj {
  breeds: { id: string, name: string }[],
  categories: any[],
  id: string,
  url: string,
  width: number,
  height: number,
}

export interface Breed {
  'weight': {
    'imperial': string,
    'metric': string
  },
  'id': string,
  'name': string,
  'cfa_url': string,
  'vetstreet_url': string,
  'vcahospitals_url': string,
  'temperament': string,
  'origin': string,
  'country_codes': string,
  'country_code': string,
  'description': string,
  'life_span': string,
  'indoor': number,
  'lap': number,
  'alt_names': string,
  'adaptability': number,
  'affection_level': number,
  'child_friendly': number,
  'dog_friendly': number,
  'energy_level': number,
  'grooming': number,
  'health_issues': number,
  'intelligence': number,
  'shedding_level': number,
  'social_needs': number,
  'stranger_friendly': number,
  'vocalisation': number,
  'experimental': number,
  'hairless': number,
  'natural': number,
  'rare': number,
  'rex': number,
  'suppressed_tail': number,
  'short_legs': number,
  'wikipedia_url': string,
  'hypoallergenic': number,
  'reference_image_id': string,
  'image': {
    'id': string,
    'width': number,
    'height': number,
    'url': string,
  }
}

export default function Page() {
  const IMG_PER_PAGE = 9;

  const [appliedBreeds, setAppliedBreeds] = useState<string[]>([]);
  const [showOnlyFavourite, setShowOnlyFavourite] = useState(false);
  const [imgObjs, setImgObjs] = useState<ImgObj[] | null>(null);
  const [allFavouriteImgs, setAllFavouriteImgs] = useState<ImgObj[]>(() => {
    return JSON.parse(localStorage.getItem('favourites')!) || [];
  })
  const [currentPage, setCurrentPage] = useState(1);
  const [pageAmount, setPageAmount] = useState(1);

  let fetchImgUrl = `https://api.thecatapi.com/v1/images/search?limit=${IMG_PER_PAGE}&order=ASC&page=${currentPage - 1}`;

  if (appliedBreeds.length) {
    fetchImgUrl = `${fetchImgUrl}&${appliedBreeds.map((aB) => `breed_ids=${aB}`).join('&')}`;
  }

  const { isPending: breedsIsPending, data: fetchedBreeds } = useQuery<Breed[]>({
    queryKey: ['breeds'],
    queryFn: () => fetch('https://api.thecatapi.com/v1/breeds', {
      headers: { 'x-api-key': API_KEY },
    }).then((res) => res.json()),
  });

  const { isPending: imgIsPending, data: fetchedImgsAndPagesAmount } = useQuery<{
    totalImgAmount: number,
    imgObjs: ImgObj[],
  }>({
    queryKey: ['images', fetchImgUrl],
    queryFn: () => fetch(fetchImgUrl, {
      headers: { 'x-api-key': API_KEY },
    }).then(async (res) => {
      const totalImgAmount = +(res.headers.get('Pagination-Count') || 0);

      const imgObjs = await res.json();

      return {
        totalImgAmount,
        imgObjs,
      }
    }),
  });

  let totalImgAmount = 0;
  let fetchedImgs;

  if (fetchedImgsAndPagesAmount) {
    totalImgAmount = fetchedImgsAndPagesAmount.totalImgAmount;
    fetchedImgs = fetchedImgsAndPagesAmount.imgObjs
  }

  let newPageAmount: number;

  if (showOnlyFavourite) {
    if (appliedBreeds.length) {
      newPageAmount = Math
        .ceil(allFavouriteImgs.filter((fI) => appliedBreeds.includes(fI?.breeds?.[0]?.id)).length / IMG_PER_PAGE);
    } else {
      newPageAmount = Math.ceil(allFavouriteImgs.length / IMG_PER_PAGE);
    }
  } else {
    newPageAmount = Math.ceil(totalImgAmount / IMG_PER_PAGE);
  }

  if (newPageAmount !== pageAmount && !imgIsPending) {
    setPageAmount(newPageAmount);
  }

  const currentFavouriteImgs = useMemo(() => {
    let newCurrentFavouriteImgs = [...allFavouriteImgs];

    if (appliedBreeds.length) {
      newCurrentFavouriteImgs = newCurrentFavouriteImgs.filter((fI) => appliedBreeds.includes(fI?.breeds?.[0]?.id));
    }

    return newCurrentFavouriteImgs.slice((currentPage - 1) * IMG_PER_PAGE, currentPage * IMG_PER_PAGE);
  }, [allFavouriteImgs, appliedBreeds, currentPage]);

  if (showOnlyFavourite) {
    if (imgObjs !== currentFavouriteImgs) {
      setImgObjs(currentFavouriteImgs);
    }
  } else {
    if (imgObjs === null && fetchedImgs) {
      setImgObjs(fetchedImgs);
    } else if (imgObjs !== null && fetchedImgs && fetchedImgs !== imgObjs) {
      setImgObjs(fetchedImgs);
    }
  }

  return (
    <div className="w-full min-h-screen flex flex-col justify-start items-stretch gap-[60px] sm:gap-[80px] xl:gap-[100px] 
      p-[60px_5%_100px] lg:p-[80px_8%_150px] xl:p-[100px_12%_200px] 2xl:p-[100px_20%_200px] bg-brightYellow">
      <div className="w-full flex flex-col md:flex-row justify-start items-center gap-[40px] lg:gap-[120px]">
        <BreedFilterSelector
          breedObjs={fetchedBreeds}
          isPending={breedsIsPending}
          appliedBreeds={appliedBreeds}
          setAppliedBreeds={setAppliedBreeds}
        />
        <FavouriteFilter
          isOnlyFavourite={showOnlyFavourite}
          setOnlyFavourite={setShowOnlyFavourite}
        />
      </div>
      <Gallery
        imgObjs={imgObjs}
        isPending={showOnlyFavourite ? false : imgIsPending}
        favouriteImgs={allFavouriteImgs}
        setFavouriteImgs={setAllFavouriteImgs}
      />
      {imgObjs && (
        <Pagination
          currentPageNum={currentPage}
          setCurrentPage={setCurrentPage}
          pageAmount={pageAmount}
          isPenging={imgIsPending}
        />
      )}
    </div>
  );
}
