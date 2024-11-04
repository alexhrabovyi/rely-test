import { useMemo } from "react";

import { ImgObj } from "../Page/Page";

import FavouriteIcon from './images/favorite.svg';
import SpinnerIcon from './images/spinner.svg';
import classNames from "classnames";

const bgColors = [
  'bg-softBlue',
  'bg-softRed',
  'bg-softGreen',
  'bg-softPink',
  'bg-softPurple',
  'bg-softOrange',
  'bg-softDarkPurple',
  'bg-softLime',
  'bg-softAlgal',
];

const fillColors = [
  'fill-fillSoftBlue',
  'fill-fillSoftRed',
  'fill-fillSoftGreen',
  'fill-fillSoftPink',
  'fill-fillSoftPurple',
  'fill-fillSoftOrange',
  'fill-fillSoftDarkPurple',
  'fill-fillSoftLime',
  'fill-fillSoftAlgal',
];

interface GalleryProps {
  imgObjs: ImgObj[] | null,
  isPending: boolean,
  favouriteImgs: ImgObj[],
  setFavouriteImgs: React.Dispatch<React.SetStateAction<ImgObj[]>>,
}

const Gallery: React.FC<GalleryProps> = ({ imgObjs, isPending, favouriteImgs, setFavouriteImgs }) => {
  const imgElems = useMemo(() => {
    if (!imgObjs || isPending) return;

    let colorIndex = 0;

    return imgObjs.map((iO) => {
      const breedName = iO.breeds[0]?.name;

      const currentColorIndex = colorIndex++;

      if (colorIndex === 9) colorIndex = 0;

      const isFavourite = favouriteImgs.find((fI) => fI.id == iO.id);

      return (
        <div
          key={iO.id}
          className={`relative w-full p-[8px] flex flex-col justify-start items-stretch gap-[20px] 
            ${bgColors[currentColorIndex]} rounded-tl-[16px] rounded-bl-[16px] rounded-br-[16px]`}
        >
          <span
            className={`absolute right-0 top-0 translate-y-[-100%] w-[80px] h-[27px] flex justify-center items-center ${bgColors[currentColorIndex]} rounded-t-[12px]`}
          >
            <button
              type="button"
              className="w-[22px]"
              onClick={() => {
                let newFavouritesImgs: ImgObj[];

                if (isFavourite) {
                  newFavouritesImgs = favouriteImgs.filter((fI) => fI.id !== iO.id);
                } else {
                  newFavouritesImgs = [...favouriteImgs, iO];
                }

                localStorage.setItem('favourites', JSON.stringify(newFavouritesImgs));
                setFavouriteImgs(newFavouritesImgs);
              }}
            >
              <FavouriteIcon
                className={classNames(
                  'w-full h-auto',
                  isFavourite ? 'fill-favourite' : fillColors[currentColorIndex],
                )}
              />
            </button>
          </span>
          <img
            className="h-full max-h-[300px] rounded-[16px]"
            src={iO.url}
            alt={`${breedName} breed cat picture` || 'Cat picture'}
          />
          <p className="font-montserrat font-medium text-[16px] text-white">
            {breedName || 'Unknown kitty'}
          </p>
        </div>
      )
    })
  }, [imgObjs, favouriteImgs]);

  if (isPending && !imgObjs) {
    return (
      <div className="w-full h-[200px] flex justify-center items-center">
        <SpinnerIcon
          className="w-[70px] h-[70px] fill-pink"
        />
      </div>
    )
  }

  return (
    <main className={classNames(
      'grid grid-cols-[1fr] sm:grid-cols-[repeat(2,1fr)] lg:grid-cols-[repeat(3,1fr)] gap-x-[30px] gap-y-[70px]',
      isPending && imgObjs && 'opacity-60 pointer-events-none',
    )}>
      {imgElems}
    </main>
  );
};

export default Gallery;