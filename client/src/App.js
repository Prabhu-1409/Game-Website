import './App.css';
import Home from './Home';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import Singlegame from './Singlegame';


function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route path='games' element={<Home/>}></Route>
          <Route path='/games/:id' element={<Singlegame/>}></Route>
        </Route>
      </Routes>
      </BrowserRouter>
      </div>
  );
}

export default App;
