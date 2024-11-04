import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';

import useOnResize from '../../hooks/useOnResize';
import { Breed } from '../Page/Page';
import BreedCheckbox from '../BreedCheckbox/BreedCheckbox';

import ChevronIcon from './images/chevronUp.svg';
import SearchIcon from './images/search.svg';

interface BreedFilterSelectorProps {
  breedObjs: Breed[] | undefined,
  isPending: boolean,
  appliedBreeds: string[],
  setAppliedBreeds: React.Dispatch<React.SetStateAction<string[]>>,
}

const BreedFilterSelector: React.FC<BreedFilterSelectorProps> = (
  { breedObjs, isPending, appliedBreeds, setAppliedBreeds }
) => {
  const selectBtnRef = useRef<HTMLButtonElement | null>(null);
  const checkBoxesAndInputBlockRef = useRef<HTMLDivElement | null>(null);

  const [displayedBreeds, setDisplayedBreeds] = useState<Breed[] | null>(null);
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectBtnHeight, setSelectBtnHeight] = useState<number | null>(null);
  const [checkBoxesAndInputHeight, setCheckBoxesAndInputHeight] = useState<number | null>(null);

  const inferSelectBtnHeight = useCallback(() => {
    const selectBtn = selectBtnRef.current;

    if (!selectBtn) return;

    setSelectBtnHeight(selectBtn.offsetHeight);
  }, []);

  useLayoutEffect(inferSelectBtnHeight, [inferSelectBtnHeight]);
  useOnResize(inferSelectBtnHeight);

  const inferCheckboxesAndInputBlockHeight = useCallback(() => {
    const checkBoxesAndInputBlock = checkBoxesAndInputBlockRef.current;

    if (!checkBoxesAndInputBlock) return;

    setCheckBoxesAndInputHeight(checkBoxesAndInputBlock.offsetHeight);
  }, []);

  useLayoutEffect(inferCheckboxesAndInputBlockHeight, [inferCheckboxesAndInputBlockHeight]);
  useOnResize(inferCheckboxesAndInputBlockHeight);

  if (displayedBreeds === null && breedObjs) {
    setDisplayedBreeds(breedObjs);
  }

  useEffect(() => {
    if (!breedObjs || searchValue === null) return;

    const regExp = new RegExp(searchValue, 'i');

    setDisplayedBreeds(breedObjs.filter((b) => regExp.test(b.name)));
  }, [breedObjs, searchValue]);

  const checkBoxes = useMemo(() => {
    if (!displayedBreeds) return;

    return displayedBreeds.map((b) => {
      const isApplied = appliedBreeds.includes(b.id);

      return (
        <BreedCheckbox
          key={b.id}
          name={b.name}
          isApplied={isApplied}
          updateFn={() => {
            if (isApplied) {
              setAppliedBreeds(appliedBreeds.filter((aB) => aB !== b.id));
            } else {
              setAppliedBreeds([...appliedBreeds, b.id]);
            }
          }}
        />
      );
    });
  }, [appliedBreeds, displayedBreeds]);

  const selectHeight = (() => {
    if (selectBtnHeight === null || checkBoxesAndInputHeight === null) {
      return 'auto';
    } else if (isExpanded) {
      return `${selectBtnHeight + checkBoxesAndInputHeight}px`;
    }

    return `${selectBtnHeight}px`;
  })();

  const selectBtnText = isPending ? 'Loading ...' : appliedBreeds.length ? `Selected breeds: ${appliedBreeds.length}` : 'Select breeds';

  return (
    <div
      className="relative z-10 w-[240px]"
      style={{
        height: `${selectBtnHeight}px`,
      }}
    >
      <div
        className={classNames(
          'absolute w-full px-[10px] bg-white border-solid border-[1px] border-pink rounded-[15px] overflow-hidden transition-all',
          isPending && 'pointer-events-none opacity-70'
        )}
        style={{
          height: selectHeight,
        }}
      >
        <button
          ref={selectBtnRef}
          type="button"
          className="w-full flex justify-between items-center py-[5px] font-montserrat text-grey"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {selectBtnText}
          <ChevronIcon
            className={classNames(
              'w-[14px] fill-pink transition-all',
              isExpanded && 'rotate-[-180deg]'
            )}
          />
        </button>
        <div
          ref={checkBoxesAndInputBlockRef}
          className="w-full h-[400px] flex flex-col justify-start items-stretch"
        >
          <div
            className="relative w-full pb-[10px] mb-[10px] border-solid border-b-[1px] border-lightGrey"
          >
            <input
              type="text"
              name="breedsSearch"
              placeholder="Search breeds ..."
              value={searchValue !== null ? searchValue : ''}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full h-[25px] pr-[18%] mt-[10px] outline-none font-montserrat text-[14px] text-lightGrey"
            />
            <SearchIcon
              className="absolute top-[50%] translate-y-[-50%] right-[5%] fill-lightGrey"
            />
          </div>
          <div className="w-full py-[10px] pr-[10px] flex flex-col justify-start items-stretch gap-[4px] overflow-y-auto">
            {checkBoxes}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreedFilterSelector;
