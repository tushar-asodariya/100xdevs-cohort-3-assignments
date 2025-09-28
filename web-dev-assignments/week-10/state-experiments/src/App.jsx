
import { useState, createContext } from "react";
import './App.css'
import { useContext } from 'react';
const BulbContext = createContext()

function BulbProvider({children}){
const [bulbState, setBulbState] = useState(true);

return (
  <BulbContext.Provider
    value={{ bulbState: bulbState, setBulbState: setBulbState }}
  >
  {children}
  </BulbContext.Provider>
);

}


function App() {

  return (
    <>
      <BulbProvider>
        <LightBulb />
      </BulbProvider>
    </>
  );
}


function LightBulb(){
return <div>
<Bulb ></Bulb>
<ToggleBulbState ></ToggleBulbState>
</div>


}


function Bulb(){
  const {bulbState} = useContext(BulbContext)
  return <div>
  {bulbState ? "Bulb On":"Bulb off"}
  </div>

}

function ToggleBulbState() {
  const { setBulbState } = useContext(BulbContext);

function toggleBulbState(){
setBulbState((currentState) => !currentState)

}
  return <div>
    <button onClick={toggleBulbState}>Toggle</button>
  </div>;
}

export default App
