
import './App.css'
import {BrowserRouter, Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom'
function App() {

  return (
    <div>
      <BrowserRouter>
       
        <Routes>
          <Route path="/" element={<LayoutPage></LayoutPage>}>
           
            <Route
              path="/neet/class-11"
              element={<Class11Program></Class11Program>}
            ></Route>
            <Route
              path="/neet/class-12"
              element={<Class12Program></Class12Program>}
            ></Route>
            <Route path="/" element={<LandingPage></LandingPage>}></Route>
            <Route path="*" element={<ErrorPage></ErrorPage>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function LayoutPage() {
  return (
    <div>
      {" "}
      <Link to="/">Online</Link> | <Link to="/neet/class-11">Class 11</Link> |{" "}
      <Link to="/neet/class-12">CLass 12</Link>Layout<Outlet></Outlet>
    </div>
  );
}
function ErrorPage() {
  return <div>Sorry Page not found</div>;
}

function LandingPage(){
    return <div>Welcome to online coaching</div>;
}

function Class11Program()  {
  return <div>
    CLass 11
  </div>

}

function Class12Program() {

  const navigate = useNavigate();

  function goToHome(){
    navigate('/')
  }

  return <div>CLass 12
  <button onClick={goToHome}>Home</button>
  
  </div>;
}
export default App
