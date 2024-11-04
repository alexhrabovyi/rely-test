import FavouriteButton from '../FavouriteButton/FavouriteButton';

interface FavouriteFilterProps {
  isOnlyFavourite: boolean,
  setOnlyFavourite: React.Dispatch<React.SetStateAction<boolean>>,
}

const FavouriteFilter: React.FC<FavouriteFilterProps> = ({ isOnlyFavourite, setOnlyFavourite }) => {
  return (
    <div className="relative px-[40px] sm:px-[80px] pt-[30px] pb-[20px] flex justify-start items-center 
      gap-[40px] border-solid border-[2px] border-pink rounded-[24px]">
      <p className='absolute top-0 left-[10%] translate-y-[-50%] px-[20px] bg-brightYellow font-montserrat font-semibold text-[18px] text-pink'>
        Filter by
      </p>
      <FavouriteButton
        isActive={!isOnlyFavourite}
        name="All"
        onClick={() => setOnlyFavourite(false)}
      />
      <FavouriteButton
        isActive={isOnlyFavourite}
        name="Favourites"
        onClick={() => setOnlyFavourite(true)}
      />
    </div>
  )
};

export default FavouriteFilter;