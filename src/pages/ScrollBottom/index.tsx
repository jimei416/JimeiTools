import { useEffect, useState } from 'react'
import styles from './index.module.scss'
import useScrollBottom from '../../packages/hooks/useScrollBottom'
const ScrollBottom = ()=>{
  const [item,setItem] = useState<Array<string>>([])
  const [refresh,setRefresh] = useState(true)
  const [target,page] = useScrollBottom(refresh,2)

  useEffect(()=>{
    console.log(page);
    if(page>=5) setRefresh(false)
    setItem(prev=>[...prev,page.toString()])
  },[page])
  
  return (
    <div className={styles.ScrollBottom} ref={target}>
    {item.map(item=>(
      <div className={styles.item}>{item}</div>
    ))}
  </div>
  )
}

export default ScrollBottom