import './App.css';

// ! libraries imports
import {Routes,  Route} from 'react-router-dom';

// ! components imports
import Header from './components/Header';
import Home from './components/Home';
import Cart from './components/Cart';


function App() {
  return (
    <div className='body'>
      <Header className="appHeader" />
      <Routes>
        <Route path='/' element={<Home />}  />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
