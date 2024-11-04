interface CheckboxProps {
  name: string,
  isApplied: boolean,
  updateFn: () => void,
}

const BreedCheckbox: React.FC<CheckboxProps> = ({ name, isApplied, updateFn }) => (
  <button
    type="button"
    className="flex justify-between items-center gap-[15px] font-montserrat text-[16px] text-left text-grey"
    onClick={updateFn}
  >
    {name}
    <span
      className="flex justify-center items-center w-[16px] h-[16px] border-solid border-pink border-[1px] rounded-[50%]"
    >
      {isApplied && (
        <span className="w-[10px] h-[10px] rounded-[50%] bg-pink" />
      )}
    </span>
  </button>
);

export default BreedCheckbox;
