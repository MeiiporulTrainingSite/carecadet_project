import React from 'react'
import { useAppDispatch,useAppSelector } from '../Redux/Hook'
//import { increment,decrement,incrementByAmount,incrementByAmountClean } from '../Redux/LoginSlice'

type Props = {}

const Count = (props: Props) => {
    // const [store,setStore]=React.useState("")
    // const count=useAppSelector((state)=>state.counter)
    // const dispatch=useAppDispatch()
    // const onSubmit=(a:any )=>{
    //   if(a==="input"){
    //     dispatch(incrementByAmount(store))
    //   }
    //   if(a==="inputclean"){
    //     dispatch(incrementByAmountClean(""))
    //   }
    //   if(a==="plus"){
    //     dispatch(increment())
    //   }
    //   if(a==="sub"){
    //     dispatch(decrement())
    //   }
    // }
    // const onChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    //     let check=e.target.value
    // setStore(check)
    // }
  return (
    <div>
        {/* <p>{count.check}</p>
        <input onChange={onChange}/>
        <button onClick={()=>{onSubmit("input")}}>submit</button>
        <button onClick={()=>{onSubmit("inputclean")}}>submit</button>
        <div>{count.value}</div>
        <button onClick={()=>{onSubmit("plus")}}>+</button>
        <button onClick={()=>{onSubmit("sub")}}>-</button> */}
    </div>
  )
}

export default Count