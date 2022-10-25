import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, reset } from "./counterSlice";

const Counter = () => {
  const { count } = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  return (
    <div className="counter-container">
      <h1 className="title">Counter</h1>
      <span className="count">{count}</span>
      <div className="buttons">
        <button onClick={() => dispatch(decrement())}>-</button>
        <button onClick={() => dispatch(increment())}>+</button>
      </div>
      <button style={{marginTop: ".2rem"}} onClick={() => dispatch(reset())}>Reset</button>
    </div>
  );
};

export default Counter;
