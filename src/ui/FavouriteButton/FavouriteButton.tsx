interface FavouriteButtonProps {
  name: string,
  isActive: boolean,
  onClick: () => void,
}

const FavouriteButton: React.FC<FavouriteButtonProps> = ({ name, isActive, onClick }) => {
  return (
    <button
      type="button"
      className="flex justify-start items-center gap-[12px] font-montserrat text-[16px] text-grey"
      onClick={onClick}
    >
      {name}
      <span
        className="flex justify-center items-center w-[16px] h-[16px] border-solid border-pink border-[1px] rounded-[50%]"
      >
        {isActive && (
          <span className="w-[10px] h-[10px] rounded-[50%] bg-pink" />
        )}
      </span>
    </button>
  )
};

export default FavouriteButton;