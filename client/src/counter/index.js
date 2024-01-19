import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrementActionCreator, incrementActionCreator } from "../reducers/counterReducer";

const Counter = ()=>{
   // const [counter, setCounter] = useState(0);

    const [value, setValue] = useState(0);
    // get the value from the store


    // const incrementCounter = ()=>{
    //     setCounter(counter=>counter+1);
    // }
    // const decrementCounter = ()=>{
    //     setCounter(counter=>counter-1);
    // 

    const counter = useSelector(({count})=>count.counter);
    console.log(counter)
    const dispatch = useDispatch();
    return(
        <>
            <h1>count : {counter}</h1>
            <input type="number" min={1} max={10} placeholder="enter number" onChange={e=>setValue(+e.target.value)}/>
            <button onClick={()=>dispatch(incrementActionCreator(value))}>increment</button>
            <button onClick={()=>dispatch(decrementActionCreator(value))}>decrement</button>
        </>
    )
}

export default Counter;