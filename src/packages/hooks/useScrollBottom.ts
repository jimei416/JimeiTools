import { useEffect, useRef, useState } from 'react';
import { getTargetElement } from '../utils/domTarget';

const useScrollBottom = (
  refresh: boolean,
  num: number
): [
  React.MutableRefObject<null>,
  number,
  React.Dispatch<React.SetStateAction<number>>,
  {
    spinning: boolean;
    setSpinning: React.Dispatch<React.SetStateAction<boolean>>;
  }
] => {
  const [page, setPage] = useState<number>(num);
  const [spinning, setSpinning] = useState(refresh);
  const target = useRef(null);

  useEffect(() => {
    const el = getTargetElement(target, document);
    if (!el) {
      return undefined;
    }

    const updatePosition = () => {
      if (!refresh) return;
      let flag = false;
      let top: number;
      let height: number;
      if (el === document) {
        if (document.scrollingElement) {
          top = document.scrollingElement.scrollTop;
          height =
            document.scrollingElement.scrollHeight -
            document.scrollingElement.clientHeight;
          if (top === height) flag = true;
        } else {
          top = Math.max(
            window.pageYOffset,
            document.documentElement.scrollTop,
            document.body.scrollTop
          );
          height = Math.max(
            document.documentElement.scrollHeight -
              document.documentElement.clientHeight,
            document.body.scrollHeight - document.body.clientHeight
          );
          if (top === height) flag = true;
        }
      } else {
        top = (el as unknown as Element).scrollTop;
        height =
          (el as unknown as Element).scrollHeight -
          (el as unknown as Element).clientHeight;
        if (top === height) flag = true;
      }

      if (height === 0) flag = false;
      if (flag) {
        setPage((prev) => prev + 1);
      }
    };
    updatePosition();
    el.addEventListener('scroll', updatePosition);
    return () => {
      el.removeEventListener('scroll', updatePosition);
    };
  }, [refresh]);

  return [target, page, setPage,{spinning,setSpinning}];
};

export default useScrollBottom;
