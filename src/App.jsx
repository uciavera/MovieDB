import React from "react";
//import "./App.css";
import { Switch, Route } from "react-router-dom";
import Footer from './components/footer/footer';
import Navbar from './components/navbar/Navbar';
import Register from './components/register/Register';

import { Home } from "./components/home/Home";
import { MovieDetail } from "./components/moviedetail/MovieDetail";

export function App() {
  
  return (
    
    
    <main>
      <Navbar/>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route  path="/movie/:id" component={MovieDetail} />
        <Route path="/Register" component={Register} exact />
      </Switch>
      <Footer/>
                
    
    </main>
  );
}

export default App;
