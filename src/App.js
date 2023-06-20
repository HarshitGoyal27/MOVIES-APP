import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar.js';
import Banner from './Components/Banner.js';
import Movies from './Components/Movies.js';
import Favourites from './Components/Favourites';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={Ele}/>
        <Route path="/favourites" element={<Favourites/>}/>
      </Routes>
    </BrowserRouter>
  );
}
const Ele = (
  <div>
      <Navbar/>
      <Banner/> 
      <Movies/>
  </div>
);


export default App;
