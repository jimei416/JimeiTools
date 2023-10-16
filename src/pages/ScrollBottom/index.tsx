import { useEffect, useState } from 'react'
import styles from './index.module.scss'
import useScrollBottom from '../../packages/hooks/useScrollBottom'
const ScrollBottom = ()=>{
  const [item,setItem] = useState<Array<number>>([])
  const [refresh,setRefresh] = useState(true)
  const {target,page} = useScrollBottom(refresh)
  useEffect(()=>{
    if(page>=5) setRefresh(false)
    setItem(prev=>[...prev,page])
  },[page])
  return (
    <div className={styles.ScrollBottom} ref={target}>
    {item.map(item=>(
      <div key={item} className={styles.item}>{item}</div>
    ))}
  </div>
  )
}

export default ScrollBottom