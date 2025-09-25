import { useState, useEffect } from "react";
import "./App.css";

function App() {
  let [counterVisible, setCounterVisible] = useState(true);
  const [count, setCount] = useState(0);

  function toggleCounterVisibility() {
    setCounterVisible(!counterVisible);
  }

   
 useEffect(function () {
   let clock = setInterval(function () {
     setCount((count) => count + 1);
     console.log("mounted interval");
   }, 1000);
   console.log("mounted");

   return () => {
     console.log("clearInterval");
     return clearInterval(clock);
   };
 }, []);
  return (
    <div>
      <b>Hello World</b>
      {counterVisible ? <Counter count={count}></Counter> : null}
      <button onClick={toggleCounterVisibility}>Toggle Counter</button>
    </div>
  );
}

function Counter(props) {

  useEffect(()=>{

      console.log('counter update')

  },[props.count])

  return (
    <div>
      <h1 id="text">{props.count} </h1>
      {/* <button onClick={increaseCount}>Increase Count</button>
      <button onClick={decreaseCount}>Decrease Count</button>
      <button onClick={reset}>Reset Count</button> */}
    </div>
  );
}

export default App;
