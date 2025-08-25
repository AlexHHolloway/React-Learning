import { useSelector, useDispatch } from "react-redux";
import classes from "./Counter.module.css";

import { counterActions } from "../store/counter";

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter.counter);
  const isVisible = useSelector((state) => state.counter.isVisible);

  const incrementHandler = () => {
    dispatch(counterActions.increment());
  };
  const increaseHandler = () => {
    dispatch(counterActions.custom(5));
  };
  const decrementHandler = () => {
    dispatch(counterActions.decrement());
  };
  const decreaseHandler = () => {
    dispatch(counterActions.custom(-5));
  };

  const toggleCounterHandler = () => {
    dispatch(counterActions.toggle());
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {isVisible && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={decreaseHandler}>- 5</button>
        <button onClick={decrementHandler}>- 1</button>
        <button onClick={incrementHandler}>+ 1</button>
        <button onClick={increaseHandler}>+ 5</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter Visibility</button>
    </main>
  );
};

export default Counter;

// class based component set up. still needs to connect
// class Counter extends Component {
//   incrementHandler() {

//   }
//   decrementHandler() {

//   }
//   toggleCounterHandler() {

//   }
//   render() {
//     return (
//       <main className={classes.counter}>
//         <h1>Redux Counter</h1>
//         <div className={classes.value}>{counter}</div>
//         <div>
//           <button onClick={this.decrementHandler}>-</button>
//           <button onClick={this.incrementHandler}>+</button>
//         </div>
//         <button onClick={this.toggleCounterHandler}>Toggle Counter</button>
//       </main>
//     );
//   }
// }
