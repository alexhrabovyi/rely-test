import {
  memo, useState, Fragment, useCallback, useLayoutEffect, useEffect, useRef,
  ReactNode,
} from 'react';
import classNames from 'classnames';
import ThreeDots from './images/threeDots.svg';
import useOnResize from '../../hooks/useOnResize';

interface PaginationProps {
  currentPageNum: number,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
  pageAmount: number,
  isPenging: boolean,
}

const Pagination = memo<PaginationProps>(({ currentPageNum, setCurrentPage, pageAmount, isPenging }) => {
  const [windowWidth, setWindowWidth] = useState<number>(0);

  const getWindowWidth = useCallback(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useLayoutEffect(() => {
    getWindowWidth();
  }, [getWindowWidth]);

  useOnResize(getWindowWidth);

  if (currentPageNum > pageAmount && !isPenging) {
    setCurrentPage(1);
  }

  let additionalBtnsAvailable: boolean;
  let additionalStartBtnNeeded: boolean;
  let additionalEndBtnNeeded: boolean;

  if (windowWidth > 576) {
    additionalBtnsAvailable = pageAmount > 9;
    additionalStartBtnNeeded = additionalBtnsAvailable && currentPageNum > 5;
    additionalEndBtnNeeded = additionalBtnsAvailable && currentPageNum <= pageAmount - 5;
  } else {
    additionalBtnsAvailable = pageAmount > 7;
    additionalStartBtnNeeded = additionalBtnsAvailable && currentPageNum > 4;
    additionalEndBtnNeeded = additionalBtnsAvailable && currentPageNum <= pageAmount - 4;
  }

  let firstMainButtonId: number;
  let lastMainButtonId: number;

  let additionalStartBtnId: number;
  let additionalEndBtnId: number;

  if (windowWidth > 576) {
    if (additionalBtnsAvailable && !additionalStartBtnNeeded) {
      firstMainButtonId = 1;
      lastMainButtonId = 7;
      additionalEndBtnId = 8;
    } else if (additionalBtnsAvailable && !additionalEndBtnNeeded) {
      firstMainButtonId = pageAmount - 6;
      lastMainButtonId = pageAmount;
      additionalStartBtnId = firstMainButtonId - 1;
    } else if (additionalStartBtnNeeded && additionalEndBtnNeeded) {
      firstMainButtonId = currentPageNum - 2;
      lastMainButtonId = currentPageNum + 2;
      additionalStartBtnId = currentPageNum - 3;
      additionalEndBtnId = currentPageNum + 3;
    } else if (!additionalBtnsAvailable) {
      firstMainButtonId = 1;
      lastMainButtonId = pageAmount;
    }
  } else if (windowWidth <= 576) {
    if (additionalBtnsAvailable && !additionalStartBtnNeeded) {
      firstMainButtonId = 1;
      lastMainButtonId = 5;
      additionalEndBtnId = 6;
    } else if (additionalBtnsAvailable && !additionalEndBtnNeeded) {
      firstMainButtonId = pageAmount - 4;
      lastMainButtonId = pageAmount;
      additionalStartBtnId = firstMainButtonId - 1;
    } else if (additionalStartBtnNeeded && additionalEndBtnNeeded) {
      firstMainButtonId = currentPageNum - 1;
      lastMainButtonId = currentPageNum + 1;
      additionalStartBtnId = currentPageNum - 2;
      additionalEndBtnId = currentPageNum + 2;
    } else if (!additionalBtnsAvailable) {
      firstMainButtonId = 1;
      lastMainButtonId = pageAmount;
    }
  }

  const buttons: ReactNode[] = [];

  for (let i = firstMainButtonId!; i <= lastMainButtonId!; i += 1) {
    buttons.push((
      <button
        key={i}
        type="submit"
        onClick={() => setCurrentPage(i)}
        className={classNames(
          'w-[36px] h-[36px] flex justify-center items-center font-montserrat text-white rounded-[4px]',
          i === currentPageNum ? 'bg-softPurple' : 'bg-pink',
        )}
      >
        {i}
      </button>
    ));
  }

  return (
    <div
      className="w-full flex justify-center items-center gap-[18px] sm:gap-[30px]"
    >
      {additionalStartBtnNeeded && (
        <div className='flex justify-center items-center gap-[6px]'>
          <button
            type="submit"
            id="1"
            className="w-[36px] h-[36px] flex justify-center items-center font-montserrat text-white bg-pink rounded-[4px]"
            onClick={() => setCurrentPage(1)}
          >
            {1}
          </button>
          <button
            type="submit"
            id={String(additionalStartBtnId!)}
            className="w-[36px] h-[36px] flex justify-center items-center bg-pink rounded-[4px]"
            onClick={() => setCurrentPage(additionalStartBtnId)}
          >
            <ThreeDots
              className="fill-white"
            />
          </button>
        </div>
      )}
      <div className="flex justify-center items-center gap-[6px]">
        {buttons}
      </div>
      {additionalEndBtnNeeded && (
        <div className='flex justify-center items-center gap-[12px]'>
          <button
            type="submit"
            className="w-[36px] h-[36px] flex justify-center items-center bg-pink rounded-[4px]"
            id={String(additionalEndBtnId!)}
            onClick={() => setCurrentPage(additionalEndBtnId)}
          >
            <ThreeDots
              className="fill-white"
            />
          </button>
          <button
            type="submit"
            id={String(pageAmount)}
            className="w-[36px] h-[36px] flex justify-center items-center font-montserrat text-white bg-pink rounded-[4px]"
            onClick={() => setCurrentPage(pageAmount)}
          >
            {pageAmount}
          </button>
        </div>
      )}
    </div>
  );
});

export default Pagination;