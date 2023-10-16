import { useEffect, useRef, useState } from "react";
import {getTargetElement} from '../utils/domTarget';

const useScrollBottom=(refresh:boolean)=>{
  const [page,setPage] = useState<number>(0)
  const target =useRef(null)
  const flag = useRef(false)

  useEffect(
    () => {
      const el = getTargetElement(target, document);
      if (!el) {
        return;
      }
      const updatePosition = () => {
        if(!refresh) return 
        flag.current = false
        let top:number;
        let height:number;
        if (el === document) {
          if (document.scrollingElement) {
            top = document.scrollingElement.scrollTop
            height = document.scrollingElement.scrollHeight - document.scrollingElement.clientHeight
            if(top===height) flag.current = true
          } else {
            top = Math.max(
              window.pageYOffset,
              document.documentElement.scrollTop,
              document.body.scrollTop,
            )
            height =Math.max(
              document.documentElement.scrollHeight - document.documentElement.clientHeight,
              document.body.scrollHeight - document.body.clientHeight,
              )            
            if(top===height) flag.current = true
          }
        } else {
          top = (el as unknown as Element).scrollTop
          height = (el as unknown as Element).scrollHeight - (el as unknown as Element).clientHeight 
          if(top===height) flag.current = true
        }
        if (height === 0 ) flag.current = false
        if(flag.current){
          setPage(prev=>prev+1)
        }
      }
      updatePosition();
      el.addEventListener('scroll', updatePosition);
      return () => {
        el.removeEventListener('scroll', updatePosition);
      };
    },
    [target,refresh]
  );

  return {target,page};
}

export default useScrollBottom